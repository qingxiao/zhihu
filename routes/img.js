var express = require('express');
var request = require('superagent');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var originUrl = req.query.url;
    console.log('-----------', originUrl);
    request.get(originUrl)
        .set({
            'Referer':'https://www.zhihu.com'
        })
        .pipe(res)


});

module.exports = router;
