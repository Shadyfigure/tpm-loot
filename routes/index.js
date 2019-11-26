let mongoose = require('mongoose');
let express = require('express');
let fs = require('fs');
let router = express.Router();

let enums = require('../enums');
let version = require('../package').version;

router.get('/enums', function (req, res, next) {
  res.send(enums);
});

router.get('/role', function (req, res, next) {
  res.send(enums.userRoles.byName.ADMIN);
});

router.get('/settings', function (req, res, next) {
  fs.readFile(__dirname+"/../settings.json", "utf8", function (err, data) {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(200).send(JSON.parse(data));
    }
  });
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'TPM Guildloot', version: version });
});

module.exports = router;
