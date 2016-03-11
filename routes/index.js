var express = require('express');
var db = require('../spider/lib/db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findUsers()
      .then(function(docs){
        res.render('index', { title: 'Express', users:docs });

      });
});

module.exports = router;
