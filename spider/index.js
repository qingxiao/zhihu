/**
 * Created by kyle on 2016/3/3.
 */
var request = require('superagent');
var conf = require('./config.js');
var login = require('./lib/login.js');
var entry = require('./lib/entry.js');
var person = require('./lib/person.js');
var follower = require('./lib/follower.js');
var urls = require('./lib/urls.js');

try {
    login()
        .then(entry)
        .then(function (url) {
            urls.emit('add', url);
            urls.emit('next');
        });

    urls.on('exec', function (url) {
        person(url)
            .then(follower)
            .then(function () {
                urls.emit('next');
            });
    });
} catch (e) {
    console.log(e)
}

/*
 request
 .get('https://www.zhihu.com/people/xiao-yan-jing-43')
 .end(function(err, res){
 // Do something
 console.log(res);
 });*/
