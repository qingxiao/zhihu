var cheerio = require('cheerio');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');


function person(url){
    var personUrl =  '';
    if(url.indexOf(conf.domain)>=0){
        personUrl = url;
    }else{
        personUrl = conf.domain + url;
    }
    return new Promise(function (resolve, reject) {
        request.get(personUrl)
            .set(conf.requestHeader)
            .end(function (err, res) {
                if(err){
                    return reject(err);
                }
                var profile = getProfile(res.text, url);
                resolve(profile);
                console.log('user info:'+JSON.stringify(profile));

            });
    });
}

function getProfile(text, url){
    var $ = cheerio.load(text);
    var $main = $('.zm-profile-header');
    var $follow = $('.zm-profile-side-following').find('strong');
    var profile = {
        id:url.split('/').pop(),
        hash_id:$main.find('.zg-btn').attr('data-id'),
        name:$main.find('.name').text(),
        intro:$main.find('.bio').text(),
        location:$main.find('.location .topic-link').text(),
        business:$main.find('.business').text(),
        //关注别人数
        followees:$follow.eq(0).text(),
        //被别人关注数
        followers:$follow.eq(1).text(),
        avatar:(function(){
            var src = $main.find('.Avatar').attr('src');
            src = src.replace(/_.*(?=\.)/, '');
            return src;
        })(),
        //�Ա�
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