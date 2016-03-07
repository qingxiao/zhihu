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
var db = require('./lib/db.js');
var Promise = require('es6-promise').Promise;

db.connection()
    .then(login)
    .then(entry)
    .then(function (url) {
        url = 'https://www.zhihu.com/people/shen-le-38-83';
        urls.emit('add', url);
        urls.emit('next');
    });

urls.on('exec', function (url) {
    var id = url.split('/').pop();
    try {
        person(url)
            //.then(store)
            .then(db.isExist)
            .then(db.save, function(){
                urls.emit('next');
            })
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
