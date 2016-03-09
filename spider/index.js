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
            parsePerson(userId)
                .then(function(p){
                    parseFollower(p);
                });
        });
} catch (err) {
    console.log(err)
}

function parsePerson(userId, callback) {
    callback = callback || function(){};
    return person(userId)
        .then(db.isExist, callback)
        .then(db.save, callback)
        .then(callback);
}

function parsePersons(userIds, callback){
    var id = userIds.shift();
    if(!id){
        return callback();
    }
    parsePerson(id, function(){
        parsePersons(userIds, callback)
    });
}

function parseFollower(profile) {
    follower(profile)
        .then(function (profile) {
            var ids = profile.followeesIds;
            parsePersons(ids, function(){
                db.updateGotFollowees(profile.hash_id);
                findOneHashId();
            })
        })

    ;
}

function findOneHashId(){
    db.findPersonByHashId()
        .then(function (profile) {
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
