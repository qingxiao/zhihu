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
    "gender": String,
    //是否获取过已关注列表
    "got_followees":{ type: Boolean, default: false}
});
var User = mongoose.model('User', UserSchema);


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
exports.findPersonByHashId = function(){
    return new Promise(function (resolve, reject) {
        User.findOne({got_followees:false}, function (err, profile) {
            //console.log(err, profile)
            if (err) return reject(err);
            resolve(profile);
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