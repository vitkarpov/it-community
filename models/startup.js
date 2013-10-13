'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var startupSchema = new Schema({
  name: String,
  image: String,
  link: String,
  about: String,
  owner: Schema.Types.ObjectId,
  stage: String,
  needs: String
});

module.exports = mongoose.model('Startup', startupSchema);