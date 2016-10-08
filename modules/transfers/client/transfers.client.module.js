(function (app) {
  // body...
  'use strict';

  app.registerModule('transfers', ['core']);
  app.registerModule('transfers.services');
  app.registerModule('transfers.admin', ['admin']);
  app.registerModule('transfers.routes', ['ui.router', 'core.routes', 'transfers.services']);
}(ApplicationConfiguration));
