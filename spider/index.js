/**
 * Created by kyle on 2016/3/3.
 */
var request = require('superagent');
var conf = require('./config.js');
var login = require('./lib/login.js');
var entry = require('./lib/entry.js');

login()
    .then(entry)
    .then(function(entryUrl){
        console.log(entryUrl)
    });


/*
request
    .get('https://www.zhihu.com/people/xiao-yan-jing-43')
    .end(function(err, res){
        // Do something
        console.log(res);
    });*/
