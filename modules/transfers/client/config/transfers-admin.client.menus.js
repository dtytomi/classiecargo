(function () {
  // body...
  'use strict';

  angular
    .module('transfers.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // body...
    Menus.addSubMenuItem('topbar', 'transfers', {
      title: 'Manage Transfers',
      state: 'admin.transfers.list',
      roles: ['admin']
    });
  }
}());
