'use strict'
const fs = require('fs'),
      mongoose = require('mongoose'),
      path = require('path'),
      // MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

// connect to database
var url = 'mongodb://localhost/dmo';
mongoose.connect(url);

// craete mongoose schema and model for ied docs
var schema = {
  'index': { type: String, require: true },
  'rev': { type: String, require: true },
  'status': { type: String, require: true },
  'index_short': { type: String, require: true },
  'project': { type: String, require: true },
  'channel': { type: String, require: true },
  'title': { type: String, require: true },
  'date': { type: String, require: true },
};
var Schema = mongoose.Schema;
var docSchema = new Schema(schema);
var Model = mongoose.model('ied', docSchema, 'ied');

// prepare data for documents
var content = fs.readFileSync('ied.json');
var docs = JSON.parse(content);
docs.forEach(function(doc) {
  var docModel = new Model(); 
  var keys = Object.keys(doc);
  keys.forEach(function(key) {
    var docKey = key;
    if ( key == '_id' ) {
      docKey = 'index';
    }
    docModel[docKey] = doc[key];
  });
  // docModel['index'] = doc['_id'];
  // docModel['rev'] = doc['rev'];
  // docModel['status'] = doc['status'];
  // docModel['index_short'] = doc['index_short'];
  // docModel['project'] = doc['project'];
  // docModel['channel'] = doc['channel'];
  // docModel['title'] = doc['title'];
  // docModel['date'] = doc['date'];

  // save the docs to mongodb
  docModel.save(function(err) {
    if (err) throw err;
    console.log('Documents saved successfully!')
  });
});
