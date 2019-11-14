let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let enums = require('../enums');
let version = require('../package').version;

router.get('/enums', function (req, res, next) {
  res.send(enums);
});

router.get('/role', function (req, res, next) {
  res.send(enums.userRoles.byName.ADMIN);
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'TPM Guildloot', version: version });
});

module.exports = router;
