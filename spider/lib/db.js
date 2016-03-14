var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise;


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
    "gender": String,
    //是否获取过已关注列表
    "got_followees":{ type: Boolean, default: false}
});
var User = mongoose.model('User', UserSchema);


var db;
//链接db
exports.connection = function(){
    console.log('connect mongodb...');
    return new Promise(function (resolve, reject) {
        if(db){
            console.log('connect mongodb success...it exist');
            return resolve();
        }
        db = mongoose.connection;
        db.on('error', function(err){
            reject(err);
        });
        db.once('open', function () {
            console.log('connect mongodb success...');
            console.log(db)
            console.log(db.db.stats())
            resolve();
        });
    });
};
//保存数据
exports.save = function(profile){
    console.log('save profile:', profile);

     // we're connected!
    return new Promise(function (resolve, reject) {
        if(!profile || !profile.id){
            return reject('empty profile');
        }
        var u = new User(profile);
        u.save(function (err, u) {
            if (err) return reject(err);
            resolve(u);
        });
    });
};

//检查是否已经储存
exports.isExist = function(id){
    // we're connected!
    return new Promise(function (resolve, reject) {
        User.findOne({id:id}, function (err, u) {
            if (err) return reject(err);
            if(u){
                console.log('this user is exist:', u);
                return reject(u);
            }
            resolve(id);
        });
    });
};



//查询没有获取过关注者列表的item
exports.findPersonByHashId = function findPersonByHashId2(){
    return new Promise(function (resolve, reject) {
        User.findOne({got_followees:false}, function (err, profile) {
            //console.log(err, profile)
            if (err) return reject(err);

            if(!profile.id){
                User.remove(profile,function(err,docs){
                    if (err) return reject(err);
                    console.log('remove error profile:', profile);
                    resolve(profile);
                });
            }else{
                resolve(profile);
            }
        });
    });
};

//获取玩列表后需要将got_followees 设置为true
exports.updateGotFollowees = function(hash_id){
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({hash_id:hash_id}, {got_followees:true}, function (err, profile) {
            if (err) return reject(err);
            resolve(profile);
        });
    });
};

//查询数据
exports.findUsers = function(query){
    //console.log(db)
    return new Promise(function (resolve, reject) {
        var num = Math.round(Math.random()*10000);
        User.find({gender:"female"})
            .skip(num)
            .limit(10)
            .exec(function(err, docs){
                if(err) return reject(err);
                resolve(docs)
            });
    });
};