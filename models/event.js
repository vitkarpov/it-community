'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: String,
  shortInfo: String,
  fullInfo: String,
  image: String,
  owner: Schema.Types.ObjectId,
  data: Date
});

module.exports = mongoose.model('Event', eventSchema);