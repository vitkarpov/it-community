'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: { type: String, unique: true, required: true },
  image: String,
  link: String,
  about: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Company', companySchema);