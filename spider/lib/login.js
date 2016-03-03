/**
 * Created by kyle on 2016/3/3.
 */

var request = require('superagent');
var conf = require('../config.js');

function login() {
    request.post(conf.domain + conf.loginUrl)
        .send(conf.loginData)
        .set(conf.requestHeader)
        .end(function (err, res) {
            console.log(res.res.body['msg']);
            if(res.res.body['r'] == 0){
                cookie = parseLoginCookie(res.headers['set-cookie']);
            }

        });
}
login();
function parseLoginCookie(cookies){
    var tmp = [];
    cookies.forEach(function(x){
        tmp.push(x.split(';').shift());
    });
    return tmp.join(';');
}
module.exports = login;