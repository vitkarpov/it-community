'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: { type: String, required: true },
  shortInfo: { type: String, required: true },
  fullInfo: { type: String, required: true },
  image: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  //TODO add required
  date: Date
});

// Ensure virtual fields are serialised.
eventSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Event', eventSchema);