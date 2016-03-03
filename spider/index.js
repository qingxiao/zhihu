/**
 * Created by kyle on 2016/3/3.
 */
var request = require('superagent');
var conf = require('./config.js');

request
    .get('https://www.zhihu.com/people/xiao-yan-jing-43')
    .end(function(err, res){
        // Do something
        console.log(res);
    });