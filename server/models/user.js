'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  surname: String,
  image: String,
  email: String,
  about: String
});

module.exports = mongoose.model('User', userSchema);