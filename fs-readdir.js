const
  fs = require('fs'),
  path = require('path');


  fileParser = function(file) {
    console.log(file);
    content = fs.readFileSync(file, 'utf-8');
    console.log(content);
    
  };

fs.readdir(__dirname + '/dump', function(err, files) {
  files.forEach(function(file) {
    fileParser(path.join(__dirname + '/dump', file))
  });
});
