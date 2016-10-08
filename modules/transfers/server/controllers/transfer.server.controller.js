'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Transfer = mongoose.model('Transfer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an transfer
 */
exports.create = function (req, res) {
  // body...
  var transfer = new Transfer(req.body);

  transfer.user = req.user;

  transfer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transfer);
    }
  });
};

/**
 * Show the current transfer
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var transfer = req.transfer ? req.transfer.toJSON() : {};

  // Add a custom field to the Transfer, for determine if the current User is the "owner".
  // Note: This field is NOT persisted to the database, since it doesn't exist in the Transfer model.
  transfer.isCurrentUserOwner = !!(req.user && transfer.user && transfer.user._id.toString() === req.user._id.toString());

  res.json(transfer);
};

/**
 * Update an transfer
 */
exports.update = function (req, res) {

  var transfer = req.transfer;

  transfer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transfer);
    }
  });
};

/**
 * Delete an transfer
 */
exports.delete = function (req, res) {
  var transfer = req.transfer;

  transfer.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transfer);
    }
  });
};

/**
 * List of Orders
 */
exports.list = function (req, res) {

  Transfer.find().sort('-created').populate('user', 'displayName').exec(function (err, transfers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(transfers);
    }
  });
};

/**
 * List of Users Orders by ID
 */
exports.userByList = function (req, res) {

  User.find({ username: req.params.username }, { _id: 1 }, function (err, docs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var ids = docs.map(function (doc) {
        return doc._id;
      });
      Transfer.find({ user: { $in: ids } }).sort('-created').populate('user', 'displayName').exec(function (err, transfers) {
        if (err) {
          return res.status(400, {
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(transfers);
        }
      });
    }
  });
};

/**
 * Transfer middleware
 */
exports.transferByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Transfer is invalid'
    });
  }

  Transfer.findById(id).populate('user', 'displayName').exec(function (err, transfer) {
    if (err) {
      return next(err);
    } else if (!transfer) {
      return res.status(404).send({
        message: 'No transfer with that identifier has been found'
      });
    }
    req.transfer = transfer;
    next();
  });
};
