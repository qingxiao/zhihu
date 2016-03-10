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
var db = require('./lib/db.js');
var Promise = require('es6-promise').Promise;

try {
    db.connection()
        .then(login)
        .then(entry)
        .then(function (userId) {
            parsePerson(userId, function (p) {
                findOneHashId()
            });
        });
} catch (err) {
    console.log(err)
}

function parsePerson(userId, cb) {
    var date = new Date;
    console.log([date.getHours(), date.getMinutes(), date.getSeconds()].join(':'));
    console.log('parsePerson:' + userId)
    var callback = function (p) {
        cb(p);
        callback = function () {
        };
    };
    db.isExist(userId)
        .then(function () {
            console.log(1)
            return person(userId);
        }, function (x) {
            console.log(2)
            callback(x)
        })
        .then(function (profile) {
            console.log(3)
            return db.save(profile);
        }, function (x) {
            console.log(4)
            callback(x)
        }).
        then(function (x) {
            console.log(5)
            callback(x)
        });
}

function parsePersons(userIds, callback) {
    var id = userIds.shift();
    if (!id) {
        return callback();
    }
    console.log('hold parse person num:', userIds.length);
    parsePerson(id, function () {
        parsePersons(userIds, callback);
    });
}

function parseFollower(profile) {
    console.log('get follower:' + profile.id)
    if (!profile || !profile.id) {
        findOneHashId();
        return;
    }
    follower(profile)
        .then(function (profile) {
            var ids = profile.followeesIds;
            parsePersons(ids, function () {
                db.updateGotFollowees(profile.hash_id);
                findOneHashId();
            })
        })

    ;
}

function findOneHashId() {
    console.log('find exist person for db...')
    db.findPersonByHashId()
        .then(function (profile) {
            console.log(profile)
            parseFollower(profile);
        });
}

/*
 request
 .get('https://www.zhihu.com/people/xiao-yan-jing-43')
 .end(function(err, res){
 // Do something
 console.log(res);
 });*/
