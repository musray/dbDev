'use strict'
const fs = require('fs'),
      mongoose = require('mongoose'),
      path = require('path'),
      // MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

// connect to database
var url = 'mongodb://localhost/dmo';
mongoose.connect(url);

// craete mongoose schema and model for 流程、规范、操作指导
var schema = {
  'relationship': { type: Array, require: true },
  'platform': { type: String, require: true },
  'refer_to': { type: String, require: true },
  'rev': { type: String, require: true },
  'url': { type: String, require: true },
  'title': { type: String, require: true },
  'description': { type: String, require: true },
  'category': { type: String, require: true },
  'index': { type: String, require: true }
};

var Schema = mongoose.Schema;
var docSchema = new Schema(schema);
var Model = mongoose.model('guidance', docSchema, 'guidance');

// prepare data for documents
var content = fs.readFileSync('doc-list.json');
var docs = JSON.parse(content);

docs.forEach(function(doc) {

  var docModel = new Model(); 
  var keys = Object.keys(doc);
  console.log(keys);
  keys.forEach(function(key) {
    // var dockey = key;
    if (key == 'relationship') {
      docModel[key] = doc[key].split(',');
    } else {
      docModel[key] = doc[key];
    }
  });
  

  // save the docs to mongodb
  docModel.save(function(err) {
    if (err) throw err;
    console.log('Documents saved successfully!')
  });
});
