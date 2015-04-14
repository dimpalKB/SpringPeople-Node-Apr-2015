var fs = require("fs");
/*fs.readFile("data.txt", {encoding : "utf8"}, function(err, data){
    console.log(data);
});*/

var stream = fs.createReadStream("data.txt", {encoding : "utf8"});
var readCount = 0;
var totalFileSize = 0;
stream.on("data", function(data){
    totalFileSize += data.length;
    ++readCount;
    console.log(data);
});
stream.on("end", function(){
    console.log("file size = ", totalFileSize);
    console.log("Read count = ", readCount);
});
console.log("reading file");

