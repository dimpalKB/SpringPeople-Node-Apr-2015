var path = require('path'),
    fs = require('fs');

var staticResourceExtns = [".html", ".txt", ".js", ".jpg",".png",".ico",".css"]
function isStatic(resource){
    var resourceExtn = path.extname(resource);
    return staticResourceExtns.indexOf(resourceExtn) !== -1;
}
module.exports = {
    isStatic : isStatic,
    process : function(req, res){
        if (isStatic(req.url.pathname)){
            console.log('serveStatic');
            var resource = path.join(__dirname , req.url.pathname);
            if (fs.existsSync(resource)){
                var stream = fs.createReadStream(resource, {encoding : "utf8"});
                stream.on('open', function(){
                    console.log("starting wrting the static resource");
                })
                stream.on('data', function(chunk){
                    res.write(chunk);
                });
                stream.on('end', function(){
                    res.end();
                    console.log("completing wrting the static resource");
                });
            } else {
                res.statusCode = 404;
                res.end();
            }
        }
    }
};
