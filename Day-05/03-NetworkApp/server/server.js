var fs = require('fs'),
    net = require('net'),
    filename = process.argv[2];

if (!filename) throw Error('invalid filename');
filename = require('path').join(__dirname, filename);

var server = net.createServer(function(connection){
   console.log('a new connection is established');
   var watcher = fs.watchFile(filename, function(){
       connection.write('file changed at ' + new Date().toString());
   });
   connection.on('end', function(){
       fs.unwatchFile(filename, watcher);
   });    
});
server.listen(9090, function(){
    console.log('server listening on port 9090');
})