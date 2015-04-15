var calculator = require('./calculator');

module.exports = function(req, res){
    if (req.url.pathname === "/calculator"){
        var data = {
            op : req.url.query.op,
            n1 : parseInt(req.url.query.n1,10),
            n2 : parseInt(req.url.query.n2,10)
        };
        var result = calculator[data.op](data.n1, data.n2);
        res.write(result.toString());
        res.end();
        return true;
    } else {
        return false;
    }
}
