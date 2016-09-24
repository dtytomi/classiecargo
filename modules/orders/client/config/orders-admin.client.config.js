(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('orders.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'orders', {
      title: 'Manage Orders',
      state: 'admin.orders.list',
      roles: ['admin']
    });
  }
}());
