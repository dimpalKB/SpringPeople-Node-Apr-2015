var url = require('url');

module.exports = function(req, res){
    console.log('dataParser');
    req.url = url.parse(req.url, true);
};
