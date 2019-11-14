var schema = require('./schema');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var config = require('../config').db;

mongoose.Promise = require('bluebird');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        const auth = (config.username || config.password) ? `${config.username}:${config.password}@` : "";
        const mongoUri = `mongodb+srv://${auth}${config.host}/${config.database}?retryWrites=true`;
        
        mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        mongoose.connection.once('open', function () {
            console.log("mongo connected");
            resolve(true);
        });

        mongoose.connection.on('error', function (err) {
            if(/failed to connect to server \[(.*)\] onfirst connect/.test(err.message)){
                console.log(err.message);
            }
            else{
                throw err;
            }
        });
    })
    .then(function (isConnected) {
        return isConnected;
    })
};
