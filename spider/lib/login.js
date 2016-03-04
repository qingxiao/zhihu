/**
 * Created by kyle on 2016/3/3.
 */

var fs = require('fs');
var path = require('path');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');

var cookieFile = path.join(__dirname, '../datas/cookie.txt');

function doLogin() {
    return new Promise(function (resolve, reject) {
        request.post(conf.domain + conf.loginUrl)
            .send(conf.loginData)
            .set(conf.requestHeader)
            .end(function (err, res) {
                console.log(res.res.body['msg']);
                if (res.res.body['r'] == 0) {
                    var cookie = parseLoginCookie(res.headers['set-cookie']);
                    resolve(cookie);
                } else {
                    reject(new Error(res.res.body['msg']));
                }


            });
    });
}
function parseLoginCookie(cookies) {
    var tmp = [];
    cookies.forEach(function (x) {
        tmp.push(x.split(';').shift());
    });
    return tmp.join(';');
}

function login(forceLogin) {
    //如果cookie失效需要重新登录

    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(cookieFile) || forceLogin) {
            doLogin()
                .then(function (cookie) {
                    fs.writeFileSync(cookieFile, cookie);
                    resolve(cookie);
                });
        } else {
            var context = fs.readFileSync(cookieFile, 'utf8');
            resolve(context);
        }
    });


}
module.exports = login;