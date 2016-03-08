var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise;


console.log('connect mongodb...');
mongoose.connect('mongodb://xiaoqing:xiaoqing@ds023448.mlab.com:23448/spider_zhihu');
var UserSchema = mongoose.Schema({
    "id": String,
    "hash_id": String,
    "name": String,
    "intro": String,
    "location": String,
    "business": String,
    "followees": Number,
    "followers": Number,
    "avatar": String,
    "gender": String
});
var User = mongoose.model('User', UserSchema);

var userAggregate = new User.aggregate;

var db;
//链接db
exports.connection = function(){
    return new Promise(function (resolve, reject) {
        db = mongoose.connection;
        db.on('error', function(err){
            reject(err);
        });
        db.once('open', function () {
            console.log('connect mongodb success...');
            resolve();
        });
    });
};
//保存数据
exports.save = function(profile){
     var u = new User(profile);
     // we're connected!
    return new Promise(function (resolve, reject) {
        u.save(function (err, u) {
            if (err) return reject(err);
            resolve(u);
        });
    });
};

//检查是否已经储存
exports.isExist = function(profile){

    // we're connected!
    return new Promise(function (resolve, reject) {
        User.findOne({id:profile.id},'id', function (err, u) {
            if (err) return reject(err);
            if(u){
                console.log('this user is exist:', u);
                return reject(u);
            }
            resolve(profile);
        });
    });
};

//检查是否已经存在hashId
exports.checkHashId = function(hash_id){
    if(!hash_id){
        //获取一个hashId
       var a = userAggregate.sample(1, function(e, item){
           console.log(e, item)
       });
        console.log(a)
        return;
    }
    // we're connected!
    return new Promise(function (resolve, reject) {
        User.findOne({id:profile.id},'id', function (err, u) {
            if (err) return reject(err);
            if(u){
                console.log('this user is exist:', u);
                return reject(u);
            }
            resolve(profile);
        });
    });
};