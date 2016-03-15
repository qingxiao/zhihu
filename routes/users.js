var express = require('express');
var request = require('superagent');
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
/* 转发图片请求获取. */
router.get('/pic', function(req, res, next) {
  var originUrl = req.query.url;
  if(!originUrl){
    return res.send({
      status:1,
      msg:'no url'
    });
  }
  request.get(originUrl)
      .set({
        'Referer':'https://www.zhihu.com'
      })
      .pipe(res);
});

/*获取用户列表*/

router.get('/list', function(req, res, next) {
  var query = req.query;
  db.findUsers(query)
      .then(function(users){
        res.send(users);

      })
});
module.exports = router;
