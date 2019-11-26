let mongoose = require('mongoose');
let Promise = require('bluebird');
let bcrypt = require('bcryptjs');
let fs = require('fs');

let passportLocalMongoose = require('passport-local-mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let config = require('../config');
let enums = require('../enums');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username:       {type:String, required:true, lowercase:true, unique:true},
    email:          {type:String, lowercase:true, unique:true},
    password:       {type:String, required:true},
    role:           {type:Number, default:enums.userRoles.byName.LOOT_COUNCIL},
    active:         {type:Boolean, default: true},
    registered:     {type:Boolean, default: false}
});

userSchema.methods.isValidPw = function(pass, cb){
    let self = this;

    let action = function (done) {
        bcrypt.compare(pass, self.password, function (err, isMatch) {
            if(err){
                return done(err);
            }

            return done(null, isMatch);
        });
    };

    if(!cb){
        return new Promise(function (resolve, reject) {
            action(function (err, isMatch) {
                if(err){
                    return reject(err);
                }

                return resolve(isMatch);
            });
        });
    }

    action(cb);
};

userSchema.pre('save', function (next) {
    let user = this;

    if(!user.isModified('password')){
        next();
    }

    bcrypt.genSalt(config.authSettings.saltFactor, function (err, salt) {
        if(err){
            console.error("Error generating salt: ", err);
            return err;
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err){
                console.error("Error generating hash: ", err);
                return err;
            }

            user.password = hash;
            next();
        });//hash
    });//salt
});

exports.userModel = mongoose.model('User', userSchema);

let initAdmin = function() {

};
initAdmin();

let bossSchema = new Schema({
    npcId:      [{type: Number}],
    name:       {type: String, required:true},
    loot:       [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

bossSchema.methods.populateLoot = function(){
    let self = this;

    return mongoose.model('Item').find({_id:{$in:self.loot}})
    .then(function (items) {
        self.loot = items;
        return self;
    });
};

exports.bossModel = mongoose.model("Boss", bossSchema);

let instanceSchema = new Schema({
    name:           {type: String, required:true, unique:true},
    content_type:   {type: String, required:true},
    wowhead_url:    {type: String},
    bosses:         [{type: Schema.Types.ObjectId, ref: 'Boss'}]
});

exports.instanceModel = mongoose.model("Instance", instanceSchema);

let itemSchema = new Schema({
    itemId:     {type: Number, required:true, unique:true},
    gpBase:     {type: Number},
    iconUrl:    {type: String},
    iLvl:       {type: Number},
    name:       {type: String, required:true},
    quality:    {type: Number},
    slot:       {type: String},
    weapon:     {type: String},
    override:   {type: Boolean, default:false},
    priority:   {
        p6: [{type:Number}],
        p5: [{type:Number}],
        p4: [{type:Number}],
        p3: [{type:Number}],
        p2: [{type:Number}],
        up: [{type:Number}],
        no: [{type:Number}]
    }
});

exports.itemModel = mongoose.model("Item", itemSchema);

//method to populate item database from a source file based on the atlas loot data files
let initDb = function () {
    let content = fs.readFileSync(__dirname + "\\..\\ref\\WoWInstanceItems.json");
    let jsonContent = JSON.parse(content);

    return Promise.each(Object.keys(jsonContent), function (iName) {
        let newInstance = {
            bosses: []
        };
        newInstance.name = iName;
        newInstance.content_type = jsonContent[iName]["Content Type"];

        return Promise.each(Object.keys(jsonContent[iName]["Loot Tables"]), function (bossName) {
            let newBoss = {
                loot: []
            };
            newBoss.name = bossName;
            newBoss.npcId = jsonContent[iName]["Loot Tables"][bossName].npcId;

            return Promise.each(Object.keys(jsonContent[iName]["Loot Tables"][bossName]), function (iiD) {
                if(iiD !== "npcId"){
                    let newItem = {
                        itemId: iiD,
                        name: jsonContent[iName]["Loot Tables"][bossName][iiD].name
                    };

                    return mongoose.model('Item').create(newItem)
                    .then(function (item) {
                        newBoss.loot.push(item._id);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
                }
            })
            .then(function () {
                return mongoose.model('Boss').create(newBoss)
            })
            .then(function (boss) {
                newInstance.bosses.push(boss._id);
            })
            .catch(function (err) {
                console.error(err);
            });
        })
        .then(function () {
            return mongoose.model('Instance').create(newInstance);
        })
        .then(function (instance) {
            console.log("Finished building: ", instance)
        })
        .catch(function (err) {
            console.error(err);
        })
    });
};
//initDb().then(function () {console.warn("Finished building the database.")});
