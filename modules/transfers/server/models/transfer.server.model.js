'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Shipment Schema
 */
var TransferSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  destinationCity: {
    type: String,
    default: '',
    trim: true
  },
  destinationCountry: {
    type: [{
      type: String,
      enum: ['Ghana', 'Nigeria']
    }],
    default: ['Ghana'],
    required: 'Please fill the destination country'
  },
  destinationAddress: {
    type: String,
    default: '',
    trim: true
  },
  recipentName: {
    type: String,
    default: '',
    trim: true
  },
  amount: {
    type: String
  },
  bankTellerNumber: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Transfer', TransferSchema);
