var nodeJsWebSocket = require('nodejs-websocket');
var server = nodeJsWebSocket.createServer(function(connection){
    console.log('a new connection is established');
    var timer = null;
    connection.on('text', function(msg){
        console.log('msg = ', msg);
        switch (msg){
            case 'start' :
                timer = setInterval(function(){
                    connection.sendText(new Date().toString());
                },5000);
                break;
            case 'stop':
                clearInterval(timer);
                break;
        }
    });

});
server.listen(9090);
console.log('server listening on port 9090');
