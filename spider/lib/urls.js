var EventEmitter = require('events');

var urlEmitter = new EventEmitter();

var urls = [];
var hash_ids = [];
var isExec = false;
var cache = {};
urlEmitter.on('add', function(url){
    var id = url.split('/').pop();
    if(cache[id]){
        return;
    }
    cache[id] = 1;
    urls.push(url);
    console.log(urls.length)
});


var nextTime;
urlEmitter.on('next', function(profile){
    if(nextTime){
        clearTimeout(nextTime);
        nextTime = null;
    }
    if(profile){
        hash_ids.push(profile.hash_id);
    }
    console.log(urls.length, hash_ids.length)
    var url = urls.shift();
    if(url){
        process.nextTick(function(){
            console.log('start parse url:'+url);
            urlEmitter.emit('exec', url);
        });
    }else{
        nextTime = setTimeout(function(){
            console.log('no url, wait...');
            urlEmitter.emit('execFollower', hash_ids.shift());
        }, 1000);
    }


});


module.exports = urlEmitter;