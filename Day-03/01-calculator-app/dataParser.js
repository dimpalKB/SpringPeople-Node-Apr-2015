var url = require('url');

module.exports = function(req, res, next){
    console.log('dataParser');
    req.url = url.parse(req.url, true);
    next();
};
