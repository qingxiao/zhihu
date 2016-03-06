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
var store = require('./lib/store.js');
var Promise = require('es6-promise').Promise;

login()
    .then(entry)
    .then(function (url) {
        urls.emit('add', url);
        urls.emit('next');
    });

urls.on('exec', function (url) {
    try {
        person(url)
            .then(store)
            .then(function (profile) {
                urls.emit('next', profile);
            });
    } catch (err) {
        console.log(err)
    }
});

urls.on('execFollower', function (hash_id) {
    try {
        follower(hash_id)
            .then(function () {
                urls.emit('next');
            });
    } catch (err) {
        console.log(err)
    }
});

/*
 request
 .get('https://www.zhihu.com/people/xiao-yan-jing-43')
 .end(function(err, res){
 // Do something
 console.log(res);
 });*/
