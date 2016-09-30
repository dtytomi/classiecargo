'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  ordersPolicy = require('../policies/orders.server.policy'),
  users = require(path.resolve('./modules/users/server/controllers/users.server.controller')),
  orders = require('../controllers/orders.server.controller');

module.exports = function (app) {
  // Orders collection routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:username').all(ordersPolicy.isAllowed)
    .get(orders.userByList);

  // Single article routes
  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  // Finish by binding the article middleware
  app.param('orderId', orders.orderByID);
  app.param('userId', users.userByID);
};
