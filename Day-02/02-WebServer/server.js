var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function(req, res){
    var resource = path.join(__dirname , req.url);
    console.log(resource);
    if (fs.existsSync(resource)){
        fs.readFile(resource, {encoding : "utf8"}, function(err, data){
            if (err){
                res.statusCode = 404;
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(9090);
console.log("Server listening on port 9090...");
