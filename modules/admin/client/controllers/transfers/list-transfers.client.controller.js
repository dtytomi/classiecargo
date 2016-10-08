(function () {
  // body...
  'use strict';

  angular
    .module('transfers')
    .controller('AdminTransfersListController', AdminTransfersListController);

  AdminTransfersListController.$inject = ['TransfersService', 'Authentication'];

  function AdminTransfersListController(TransfersService, Authentication) {
    // body...
    var vm = this;

    vm.transfers = TransfersService.query();
  }
}());
