'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  image: String,
  email: String,
  about: String,
  googleOpenID: String
});

userSchema.statics.findByGoogle = function(openID, cb) {
  this.find({
    googleOpenID: openID
  }, cb);
};

module.exports = mongoose.model('User', userSchema);