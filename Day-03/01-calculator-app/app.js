var middlewares = [];
function add(middleware){
    middlewares.push(middleware);
}
function run(req, res){
    for(var i=0; i<middlewares.length;i++){
        var middleware= middlewares[i];
        console.log(middleware);
        middleware(req, res);
    }
}

module.exports = {
    use : add,
    run: run
};
