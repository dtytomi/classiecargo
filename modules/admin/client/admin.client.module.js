(function (app) {
  'use strict';

  app.registerModule('admin');
  app.registerModule('admin.orders', ['orders.services']);
  app.registerModule('admin.routes', ['ui.router', 'admin.services']);
  app.registerModule('admin.services');
}(ApplicationConfiguration));
