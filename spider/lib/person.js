var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');


function person(url){
    return new Promise(function (resolve, reject) {
        request.get(conf.domain + url)
            .set(conf.requestHeader)
            .end(function (err, res) {
                if(err){
                    return reject(err);
                }
                var profile = getProfile(res.text);
                resolve(profile);
                console.log('user info:'+JSON.stringify(profile));

            });
    });
}

function getProfile(text){
    var $ = cheerio.load(text);
    var $main = $('.zm-profile-header');
    var profile = {
        hash_id:$main.find('.zg-btn').attr('data-id'),
        name:$main.find('.name').text(),
        intro:$main.find('.bio').text(),
        location:$main.find('.location .topic-link').text(),
        business:$main.find('.business').text(),
        avatar:(function(){
            var src = $main.find('.Avatar').attr('src');
            src = src.replace(/_.*(?=\.)/, '');
            return src;
        })(),
        //ÐÔ±ð
        gender:(function(){
            var $icon = $main.find('.icon');
            if($icon.hasClass('icon-profile-male')){
                return 'male';
            }
            return 'female'
        })()
    };
    return profile;
}

function storeProfile(profile){

}
module.exports = person;