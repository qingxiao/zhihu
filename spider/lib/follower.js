var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');
var urls = require('../lib/urls.js');

function follower(profile) {

    return new Promise(function (resolve, reject) {
        var followeesIds = [];
        queryFollowerList(profile, 0, followeesIds, function(){
            profile.followeesIds = followeesIds;
            resolve(profile);
        });
    });
}
//todo ��ȡ��ȫ���û����ٷ������飬����������url
function queryFollowerList(profile, offset, followeesIds, finish) {
    var hash_id = profile.hash_id;
   // var fListUrl = conf.domain + '/node/ProfileFolloweesListV2';
    var fListUrl = conf.domain + '/api/v4/members/'+profile.id+'/followers';
    var postData = {
        method: 'next',
        params: encodeURIComponent(JSON.stringify({
            "offset": offset,
            "order_by": "created",
            "hash_id": hash_id
        })),
        _xsrf: conf.cookie._xsrf
    };
    var query='include=data[*].gender%2Cfollower_count%2' +
        'Cis_followed%2Cis_following&offset='+offset+'&limit=20'

    var url = fListUrl+'?'+query;
    request.get(url)
        .set(conf.requestHeader)
        //.send(formData(postData))
        .end(function (err, res) {
            if(err){
                console.log('get followees error:', err);
                  return finish();
            }
            var body = res.body;
            var item = body.data;
            var paging  = body.paging;

            if (paging.is_end === false && item && item.length) {
                parseFollower(item, followeesIds);
                console.log('get followees length:', followeesIds.length)
                setTimeout(function(){
                    queryFollowerList(profile, offset + item.length, followeesIds, finish);
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

function parseFollower(items, followeesIds) {

    items.forEach(function (item) {
        if(item.follower_count>=conf.mixFollowers){
            followeesIds.push(item.name);
            //urls.emit('add', href);
        }

    });
}
module.exports = follower;