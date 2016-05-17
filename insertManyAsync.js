const fs = require("fs"),
      assert = require("assert"),
      async = require("async"),
      path = require("path"),
      MongoClient = require("mongodb").MongoClient;

 // the existing dbs are follows:
 // dcs 
 // dcs_io: IO list database
 // util: working process management

MongoClient.connect("mongodb://localhost:27017/cabinets", function(err, db) {
  assert.equal(err, null);
  console.log("Connected to MongoDB successfully!");

  var files = findFile();

  async.each(

    // first argument
    // an array of json files which to be inserted into MongoDB
    files,

    // second argument
    // the handler of reading json file
    // then inserting the contents into MongoDB
    function(file, done) {
      fs.readFile(file, "utf8", function(err, content) {
        assert.equal(err, null);
        var docs = JSON.parse(content);
        console.log("Preparing to insert " + docs.length + " documents from " + file + "...");

        // insert docs
        db.collection("cabinets").insertMany(docs);
        console.log("Inserted: " + file);
        // verify results
          
        done(err);
      });
    },

    // terminate handler
    function(err) {
      console.log(err);
    }
  );
});

function findFile () {
  var files = [];
  var dumpDir = path.join( process.cwd(), "dump" );
  var list = fs.readdirSync(dumpDir);

  list.forEach(function(file) {
    // console.log("file is " + file);
    if  ( file.split(".").pop().toLowerCase() ==  "json" ) {
      files.push(path.join(dumpDir, file));
    }
  });

  // console.log(files);
  return files
}

//
// self-test
//
// (function selfTest () {
//   var obj = JSON.parse(fs.readFileSync("acronym.json", "utf8"));
//   console.log(obj.length);
// })();
