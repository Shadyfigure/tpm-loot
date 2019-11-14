let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let Promise = require('bluebird');
let request = require('request-promise');

let enums = require('../enums');
let helpers = require('../helpers');

let Boss = mongoose.model("Boss");
let Instance = mongoose.model("Instance");
let Item = mongoose.model("Item");

let bossSearch = function(query){
    return Boss.find(query).exec()
    .then(function (bosses) {
        return bosses;
    })
    .catch(function (err) {
        throw new Error(err);
    })
};

let instanceSearch = function(query){
    return Instance.find(query).exec()
    .then(function (instances) {
        return instances;
    })
    .catch(function (err) {
        throw new Error(err);
    })
};

let itemSearch = function(query){
    return Item.find(query).exec()
    .then(function (items) {
        return items;
    })
    .catch(function (err) {
        throw new Error(err);
    });
};

router.post('/get-bosses', function (req, res, next) {
    let bossQuery = {};

    if(req.body.boss_id && req.body.boss_id.length > 0){
        bossQuery._id = {$in: req.body.boss_id};
    }

    bossSearch(bossQuery)
    .then(function (bosses) {
        return Promise.mapSeries(bosses, function (boss) {
            return boss.populateLoot();
        });
    })
    .then(function (bosses) {
        res.status(200).send(bosses);
    })
    .catch(function (err) {
        res.status(500).send(err);
    })
});

router.post('/get-instances', function(req, res, next){
    let instanceQuery = {};

    if(req.body.contentType && req.body.contentType.length > 0){
        instanceQuery.content_type = {$in: req.body.contentType};
    }

    instanceSearch(instanceQuery)
    .then(function (instances) {
        res.status(200).send(instances);
    })
    .catch(function (err) {
        res.status(500).send(err);
    })
});

router.post('/get-items', function (req, res, next) {
    let instanceQuery = {};
    let bossQuery = {};
    let itemQuery = {};

    if(req.body.instanceName && req.body.instanceName.length > 0){
        instanceQuery.name = {$in: req.body.instanceName}
    }
    if(req.body.contentType && req.body.contentType.length > 0){
        instanceQuery.content_type = {$in: req.body.contentType};
    }
    if(req.body.instance_id && req.body.instance_id.length > 0){
        instanceQuery._id = {$in: req.body.instance_id};
    }

    if(req.body.boss_id && req.body.boss_id.length > 0){
        bossQuery._id = {$in: req.body.boss_id};
    }

    if(req.body.itemId && req.body.itemId.length > 0) {
        itemQuery.itemId = {$in: req.body.itemId};
    }
    if(req.body.item_id && req.body.item_id.length > 0) {
        itemQuery._id = {$in: req.body.item_id};
    }
    if(req.body.slot && req.body.slot.length > 0){
        itemQuery.slot = {$in: req.body.slot};
    }
    
    instanceSearch(instanceQuery)
    .then(function (instances) {
        if(instances && instances.length > 0){
            bossQuery._id = {$in: []};
            for(let i = 0; i < instances.length; i++){
                bossQuery._id.$in = bossQuery._id.$in.concat(instances[i].bosses);
            }
            return bossSearch(bossQuery);
        }
    })
    .then(function (bosses) {
        if(bosses && bosses.length > 0){
            itemQuery._id = {$in: []};
            for(let i = 0; i < bosses.length; i++){
                itemQuery._id.$in = itemQuery._id.$in.concat(bosses[i].loot);
            }
            return itemSearch(itemQuery);
        }
    })
    .then(function (items) {
        res.status(200).send(items);
    })
    .catch(function (err) {
        res.status(500).send(err);
    });
});

router.post('/wowhead-request', function (req, res, next) {
    let url = "https://classic.wowhead.com/";

    let resSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    // res.header("Access-Control-Allow-Credentials", resSettings.AccessControlAllowCredentials);
    // res.header("Access-Control-Allow-Origin",  resSettings.AccessControlAllowOrigin);
    // res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    // res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : resSettings.AccessControlAllowMethods);

    if(req.body.itemId){
        let itemObj = {};

        url += "item=" + req.body.itemId;

        request(url)
        .then(function (html) {
            let iconUrl = html.substring(html.search("image_src")+17);
            iconUrl = iconUrl.substring(0,iconUrl.search("\">"));
            itemObj.iconUrl = iconUrl;

            let itemData = html.substring(html.search(".tooltip_enus")+".tooltip_enus = \"".length);
            itemData = itemData.substring(0,itemData.search("\";"));

            let iLvl = itemData.substring(itemData.search("<!--ilvl-->")+11);
            iLvl = iLvl.substring(0,iLvl.search("<"));
            iLvl = parseInt(iLvl);
            itemObj.iLvl = iLvl;

            let quality = itemData.substring(itemData.search("q")+1,itemData.search("q")+2);
            quality = parseInt(quality);
            itemObj.quality = quality;

            itemObj.gpBase = helpers.gpCalc(iLvl,quality);

            for(let i = 0; i < enums.itemSlots.array.length; i++){
                if(itemData.indexOf("<td>"+enums.itemSlots.array[i]) > -1){
                    itemObj.slot = enums.itemSlots.array[i];
                    break;
                }
                else{
                    itemObj.slot = "NONE";
                }
            }

            for(let i = 0; i < enums.weaponType.array.length; i++){
                if(itemData.indexOf(enums.weaponType.array[i]) > -1){
                    itemObj.weapon = enums.weaponType.array[i];
                    break;
                }
                else{
                    itemObj.weapon = "NO";
                }
            }

            console.log("WoWHead query on item: ", req.body.itemId);
            console.log(itemObj);
            return itemObj;
        })
        .then(function () {
            return Item.findOneAndUpdate({itemId:req.body.itemId},itemObj,{new:true}).exec();
        })
        .then(function (item) {
            res.status(200).send(item);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send(err);
        });
    }
    else if(req.body.npcId){
        url += "npc=" + req.body.npcId;
    }
});

module.exports = router;
