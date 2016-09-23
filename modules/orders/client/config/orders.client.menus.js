(function () {
  'use strict';

  angular
    .module('orders')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Orders',
      state: 'orders',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'List Orders',
      state: 'orders.list',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'Create Order',
      state: 'orders.create',
      roles: ['user']
    });
  }
}());
