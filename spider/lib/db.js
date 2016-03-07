var mongoose = require('mongoose');

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

var u = new User({
    "id": "you-yy-3",
    "hash_id": "f7332ec54232b53bd2dfdf39a21c1ec0",
    "name": "看不清",
    "intro": "大部分“中庸”，选择性极端",
    "location": "",
    "business": "互联网",
    "followees": "43",
    "followers": "2",
    "avatar": "https://pic4.zhimg.com/0bde5fe107baf1091bf163cb2647aee3.jpg",
    "gender": "male"
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    u.save(function (err, u) {
        if (err) return console.error(err);
        console.log(u)
    });
});
module.exports = db;