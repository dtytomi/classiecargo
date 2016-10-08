'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Shipment Schema
 */
var OrderSchema = new Schema({
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
  shipCountry: {
    type: [{
      type: String,
      enum: ['Ghana', 'Nigeria']
    }],
    default: ['Nigeria'],
    required: 'Please fill the shipping country'
  },
  shipCity: {
    type: String,
    default: '',
    trim: true
  },
  shipAddress: {
    type: String,
    default: '',
    trim: true
  },
  packageDetails: [{
    modeOfTransportation: {
      type: [{
        type: String,
        enum: ['Bike', 'Truck']
      }],
      default: ['Bike'],
      required: 'Please provide at least one mode of transportation'
    },
    size: {
      type: [{
        type: String,
        enum: ['Light weight', 'Heavy duty']
      }],
      default: ['Light weight'],
      required: 'Please provide at least goods size'
    }
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Order', OrderSchema);
