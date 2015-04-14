var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    url = require('url'),
    calculator = require('./calculator');


/*

http://localhost:9090/calculator?op=add&n1=100&n2=200
1. check if the request is for a static resource
2. if yes, serve the resource (handle non existence scenario)
3. else, if the request is for "/calculator"
4. if yes, parse the req url, extract the data, calculate and serve the response
5. else send 404 status code
*/
var staticResourceExtns = [".html", ".txt", ".js", ".jpg",".png",".ico",".css"]
function isStatic(resource){
    var resourceExtn = path.extname(resource);
    return staticResourceExtns.indexOf(resourceExtn) !== -1;
}

var server = http.createServer(function(req, res){
    var requestedUrl = url.parse(req.url, true);
    if (isStatic(requestedUrl.pathname)){
        var resource = path.join(__dirname , requestedUrl.pathname);
        if (fs.existsSync(resource)){
            fs.createReadStream(resource, {encoding : "utf8"}).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else {
        if (requestedUrl.pathname === "/calculator"){
            var data = {
                op : requestedUrl.query.op,
                n1 : parseInt(requestedUrl.query.n1,10),
                n2 : parseInt(requestedUrl.query.n2,10)
            };
            var result = calculator[data.op](data.n1, data.n2);
            res.write(result.toString());
            res.end();
        } else {
            res.statusCode = 404;
            res.end();
        }
    }
});
server.listen(9090);
console.log("Server listening on port 9090...");
