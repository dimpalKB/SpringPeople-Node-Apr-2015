var nodeJsWebSocket = require('nodejs-websocket');
var server = nodeJsWebSocket.createServer(function(connection){
    console.log("A new connection is established");
    connection.on('text', function(msg){
        server.connections.forEach(function(cn){
            cn.sendText(msg);
        });
    });
});
server.listen(9090);
console.log("server listening on port 9090");
