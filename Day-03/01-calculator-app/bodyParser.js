var qs = require('querystring');
module.exports = function(req, res, next){
    if (req.method === "POST"){
        console.log('body parser');
        var reqBody = '';
        req.on('data', function(chunk){
            reqBody += chunk;
        });
        req.on('end', function(){
            console.log("req body = ", reqBody);
            req.body = qs.parse(reqBody);
            next();
        })
    } else {
        next();
    }
}
