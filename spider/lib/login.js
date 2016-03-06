/**
 * Created by kyle on 2016/3/3.
 */

var fs = require('fs');
var path = require('path');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var conf = require('../config.js');

var cookieFile = path.join(__dirname, '../datas/cookie.txt');

function doLogin(homePageCookie) {
    return new Promise(function (resolve, reject) {
        request.post(conf.domain + conf.loginUrl)
            .send(conf.loginData)
            .set(conf.requestHeader)
            .end(function (err, res) {
                console.log(res.res.body['msg']);
                if (res.res.body['r'] == 0) {
                    var cookie = parseLoginCookie(res.headers['set-cookie']);
                    resolve(homePageCookie+';'+cookie);
                } else {
                    reject(new Error(res.res.body['msg']));
                }
            });
    });
}
//��λhomepage ��ȡ����cookie��Ϣ
function homePage(){
    return new Promise(function (resolve, reject) {
        request.get(conf.domain)
            .end(function (err, res) {
                if (res.res) {
                    var cookie = parseLoginCookie(res.headers['set-cookie']);
                    resolve(cookie);
                } else {
                    reject(err);
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
    //���cookieʧЧ��Ҫ���µ�¼

    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(cookieFile) || forceLogin) {
            homePage()
                .then(doLogin)
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