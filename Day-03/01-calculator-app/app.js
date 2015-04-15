var middlewares = [];
function add(middleware){
    middlewares.push(middleware);
}
function run(req, res){
    function process(req, res, middlewares){
        var middleware = middlewares[0];
        var remaining = middlewares.slice(1);
        var next = function(){
            process(req, res, remaining);
        }
        if (middleware)
            middleware(req, res, next);
    }
    process(req, res, middlewares);
}

module.exports = {
    use : add,
    run: run
};
