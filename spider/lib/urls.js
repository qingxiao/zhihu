var EventEmitter = require('events');

var urlEmitter = new EventEmitter();

var urls = [];
urlEmitter.on('addPerson', function(porfile){
    var followeesIds = porfile.followeesIds;
});
urlEmitter.on('add', function(id){
    var id = url.split('/').pop();
    if(cache[id]){
        return;
    }
    cache[id] = 1;
    urls.push(url);
    console.log(urls.length)
});

urlEmitter.on('next', function(profile){
    if(urls.length){
        process.nextTick(function(){
            var url = urls.shift();
            console.log('start parse url:'+url);
            urlEmitter.emit('exec', userId);
        });
    }else{
        urlEmitter.emit('findPersonByHashId');
    }


});


module.exports = urlEmitter;