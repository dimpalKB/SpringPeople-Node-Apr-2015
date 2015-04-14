var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    url = require('url');


/*
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
    var requestedUrl = url.parse(req.url)
    if (isStatic(requestedUrl.pathname)){
        var resource = path.join(__dirname , requestedUrl.pathname);
        console.log(resource);
        if (fs.existsSync(resource)){
            /*fs.readFile(resource, {encoding : "utf8"}, function(err, data){
                if (err){
                    res.statusCode = 404;
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            });*/
            var stream = fs.createReadStream(resource, {encoding : "utf8"});
           /* stream.on("data", function(data){
                res.write(data);
            });
            stream.on("end", function(){
                res.end();
            });
            stream.on("error", function(){
                res.statusCode = 404;
                res.end();
            });*/
            stream.pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else {
        res.write("The requested resource is not a static resource");
        res.end();
    }
});
server.listen(9090);
console.log("Server listening on port 9090...");
