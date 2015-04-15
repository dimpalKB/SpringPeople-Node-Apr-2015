var http = require("http"),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    calculatorProcessor = require('./calculatorProcessor'),
    notFoundAction = require('./notFoundAction'),
    bodyParser = require('./bodyParser.js'),
    app = require('./app');

app.use(dataParser);
app.use(bodyParser);
serveStatic.addStaticResourceExtn(".json");
app.use(serveStatic.process);
app.use(calculatorProcessor);
app.use(notFoundAction);

http.createServer(app.run).listen(9090);
console.log("Server listening on port 9090...");
