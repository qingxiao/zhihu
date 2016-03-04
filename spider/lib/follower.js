var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');

function follower(profile){
    var fListUrl = conf.domain + '/node/ProfileFolloweesListV2';
    return new Promise(function(resolve, reject){
        queryFollowerList(profile.hash_id);
        resolve();
    });
}

function queryFollowerList(hash_id){
    var fListUrl = conf.domain + '/node/ProfileFolloweesListV2';
    request.post(fListUrl)
        .send({
            _xsrf:conf.cookie._xsrf,
            method:'next',
            params:{"offset":0,"order_by":"created","hash_id":hash_id}
        })
        .end(function(err, res){
            console.log(res.res)
        });
}
module.exports = follower;