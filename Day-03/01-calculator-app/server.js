var http = require("http"),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    calculatorProcessor = require('./calculatorProcessor'),
    notFoundAction = require('./notFoundAction');



/*

http://localhost:9090/calculator?op=add&n1=100&n2=200
1. check if the request is for a static resource
2. if yes, serve the resource (handle non existence scenario)
3. else, if the request is for "/calculator"
4. if yes, parse the req url, extract the data, calculate and serve the response
5. else send 404 status code
*/


var server = http.createServer(function(req, res){
    dataParser(req, res);
    if (serveStatic.isStatic(req.url.pathname)){
        serveStatic.process(req, res);
    } else if (!calculatorProcessor(req, res)){
        notFoundAction(req, res);
    }
 });
server.listen(9090);
console.log("Server listening on port 9090...");
