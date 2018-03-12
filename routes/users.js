var express = require('express');
var request = require('superagent');
var db = require('../spider/lib/db.js');
var router = express.Router();


/* ת��ͼƬ�����ȡ. */
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

/*��ȡ�û��б�*/

router.get('/list', function(req, res, next) {
  var query = req.query;
  db.findUsers(query)
      .then(function(users){
        res.send(users);

      })
});
module.exports = router;
