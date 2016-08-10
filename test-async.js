const fs = require("fs"),
      async = require("async"),
      path = require("path"),
      MongoClient = require("mongodb").MongoClient,
      
      work = async.queue(function(file, done) {
        MongoClient.connect(uri, function(err, db) {
          if (err) {
            throw Error(err);
          }
          console.log('Connected to Mongodb successfully.');
          
          // get the file content and converts to JSON object
          var contents = fs.readFileSync(file, 'utf-8');
          var input = JSON.parse(contents);
          // insert docs
          db.collection("io").insertMany(input);
          console.log("Inserted: " + file);
          console.log('connection closed');
          done();
        });
      }, 10);

var uri = "mongodb://localhost:27017/bar";
var dumpdir = __dirname + '/dump';

console.log('beginning db insertion...');
fs.readdir(dumpdir, function(err,files) {
  files.forEach(function(file) {
    if ( file.split(".").pop().toLowerCase() ==  "json" ) {
      work.push(path.join(dumpdir, file));
    }
  });
});
