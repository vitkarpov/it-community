'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vacancySchema = new Schema({
  name: String,
  image: String,
  about: String,
  company: Schema.Types.ObjectId
});

module.exports = mongoose.model('Vacancy', vacancySchema);