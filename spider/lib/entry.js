var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');

//var $ = cheerio.load(conf.domain + conf.entryUrl);

function entry(cookie){
    conf.requestHeader.Cookie = cookie;
    conf.cookie = parseCookie(cookie);
    return new Promise(function (resolve, reject) {
        request.get(conf.domain + conf.entryUrl)
            .set(conf.requestHeader)
            .end(function (err, res) {
                if(err){
                    return reject(err);
                }
                var entryUrl = getEntryUrl(res.text);
                resolve(entryUrl);
                console.log('entryUrl:'+entryUrl);

            });
    });
}

function getEntryUrl(text){
    var $ = cheerio.load(text);
    var href = $('.tab-panel .author-link').eq(0).attr('href');
    return href;
}

function parseCookie(cookie){
    var arr = cookie.split(';');
    var oo = {};
    arr.forEach(function(item){
        var t = item.split('=');
        oo[t[0]] = t[1];
    });
    return oo;
}
module.exports = entry;