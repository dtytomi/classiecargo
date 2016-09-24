(function (app) {
  // body...
  'use strict';

  app.registerModule('orders', ['core']);
  app.registerModule('orders.services');
  app.registerModule('orders.admin', ['admin']);
  app.registerModule('orders.routes', ['ui.router', 'core.routes', 'orders.services']);
}(ApplicationConfiguration));
