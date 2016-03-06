var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;

var fileName = path.join(__dirname, '../datas/persons.txt');

module.exports = function(profile) {
    return new Promise(function (resolve, reject) {
        var data = JSON.stringify(profile)+'\n';
        if (!fs.existsSync(fileName)){
            fs.writeFileSync(fileName, data);
        }else{
            fs.appendFileSync(fileName, data);
        }
        resolve(profile);
    });
};

