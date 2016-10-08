'use strict';

/**
 * Module dependencies
 */
var transferPolicy = require('../policies/transfer.server.policy'),
  transfers = require('../controllers/transfer.server.controller');

module.exports = function (app) {
  // Orders collection routes
  app.route('/api/transfers').all(transferPolicy.isAllowed)
    .get(transfers.list)
    .post(transfers.create);

  app.route('/api/transfers/user/:username').all(transferPolicy.isAllowed)
    .get(transfers.userByList);

  // Single article routes
  app.route('/api/transfers/:transferId').all(transferPolicy.isAllowed)
    .get(transfers.read)
    .put(transfers.update)
    .delete(transfers.delete);

  // Finish by binding the article middleware
  app.param('transferId', transfers.transferByID);
};
