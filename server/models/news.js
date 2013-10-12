'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newsSchema = new Schema({
  name: String,
  shortInfo: String,
  fullInfo: String,
  image: String,
  owner: Schema.Types.ObjectId
});

module.exports = mongoose.model('News', newsSchema);