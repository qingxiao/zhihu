var EventEmitter = require('events');

var urlEmitter = new EventEmitter();

var urls = [];
var isExec = false;
urlEmitter.on('add', function(url){
    urls.push(url);
});
urlEmitter.on('next', function(){
    //可以在这里控制时间间隔
    var url = urls.shift();

    if(url){
        process.nextTick(function(){
            console.log('start parse url:'+url);
            urlEmitter.emit('exec', url);
        });
    }else{
        setTimeout(function(){
            console.log('no url, wait...');
            urlEmitter.emit('next');
        }, 1000);
    }


});


module.exports = urlEmitter;