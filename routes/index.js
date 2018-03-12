var express = require('express');
var db = require('../spider/lib/db.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = req.query;
    db.findUsers(query)
        .then(function(data){
            res.render('users', { title: 'Express', users:data.data.list, query:query });

        });
});

module.exports = router;
