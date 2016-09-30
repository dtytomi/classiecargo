(function () {
  'use strict';

  angular
    .module('orders')
    .controller('UserOrdersListController', UserOrdersListController);

  UserOrdersListController.$inject = ['OrdersService', 'Authentication'];

  function UserOrdersListController(OrdersService, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    vm.orders = OrdersService.query({
      username: vm.authentication.user.username
    });
  }
}());
