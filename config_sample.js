//config file, make sure to fill in the appropriate values and then rename this file to "config.js"
var enums = require('./enums');

var exports = {};

exports.port = {
    http: 8080,
    https: 8443
};

exports.db = {
    host: "host.mongodb.net",
    database: "db name",
    username: "username",
    password: "password"
};

exports.authSettings = {
    secret: "secret",
    saltFactor: 8
};

exports.adminDefaults = {
    username: "admin",
    password: "CH4NGEMEN0W",
    role: enums.userRoles.byName.ADMIN
};

module.exports = exports;
