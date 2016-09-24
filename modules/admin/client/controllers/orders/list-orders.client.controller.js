(function () {
  'use strict';

  angular
    .module('admin.orders')
    .controller('OrdersAdminListController', OrdersAdminListController);

  OrdersAdminListController.$inject = ['OrdersService'];

  function OrdersAdminListController(OrdersService) {
    var vm = this;

    vm.orders = OrdersService.query();
  }
}());
