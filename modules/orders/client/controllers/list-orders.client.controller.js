(function () {
  'use strict';

  angular
    .module('orders')
    .controller('UserOrdersListController', UserOrdersListController);

  UserOrdersListController.$inject = ['UserOrdersService', 'Authentication'];

  function UserOrdersListController(UserOrdersService, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    vm.orders = UserOrdersService.query({
      username: vm.authentication.user.username
    });
  }
}());
