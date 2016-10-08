(function () {
  // body...
  'use strict';

  angular
    .module('transfers')
    .controller('UserTransfersListController', UserTransfersListController);

  UserTransfersListController.$inject = ['UserTransfersService', 'Authentication'];

  function UserTransfersListController(UserTransfersService, Authentication) {
    // body...
    var vm = this;

    vm.authentication = Authentication;

    vm.transfers = UserTransfersService.query({
      username: vm.authentication.user.username
    });
    console.log(vm.transfers);
  }
}());
