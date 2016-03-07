var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');
var urls = require('../lib/urls.js');

function follower(hash_id) {
    var fListUrl = conf.domain + '/node/ProfileFolloweesListV2';
    return new Promise(function (resolve, reject) {
        queryFollowerList(hash_id, 0, function(){
            resolve();
        });
    });
}

function queryFollowerList(hash_id, offset, finish) {
    var fListUrl = conf.domain + '/node/ProfileFolloweesListV2';
    var postData = {
        method: 'next',
        params: encodeURIComponent(JSON.stringify({
            "offset": offset,
            "order_by": "created",
            "hash_id": hash_id
        })),
        _xsrf: conf.cookie._xsrf
    };


    request.post(fListUrl)
        .set(conf.requestHeader)
        .send(formData(postData))
        .end(function (err, res) {
            if(err){
                  throw err;
            }
            var body = res.res.body;
            var item = body.msg;

            if (body.r == 0 && item && item.length) {
                parseFollower(item);
                setTimeout(function(){
                    queryFollowerList(hash_id, offset + item.length, finish);
                }, 1000);
            } else {
                finish();
            }
        });
}

function formData(data) {
    var arr = [];
    for (var k in data) {
        arr.push(k + '=' + data[k]);
    }
    return arr.join('&');
}

function parseFollower(items) {

    items.forEach(function (item) {
        var $ = cheerio.load(item);
        var followers = parseInt($('.details a').eq(0).text());
        if(followers>=conf.mixFollowers){
            var href = $('.zg-link').attr('href');
            urls.emit('add', href);
        }

    });
}
module.exports = follower;