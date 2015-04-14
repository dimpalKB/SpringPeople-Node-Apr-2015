var fs = require("fs");
fs.readFile("data.txt", {encoding : "utf8"}, function(err, data){
    console.log(data);
});

