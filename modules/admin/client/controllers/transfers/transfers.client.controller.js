(function () {
  // body...
  'use strict';

  angular
    .module('transfers')
    .controller('AdminTransferController', AdminTransferController);

  AdminTransferController.$inject = ['$scope', '$state', 'transferResolve', '$window', 'Authentication'];

  function AdminTransferController ($scope, $state, transfer, $window, Authentication) {
    // body...
    var vm = this;

    vm.transfer = transfer;
    vm.Authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.destCountries = [
      { destCountry: 'Nigeria' },
      { destCountry: 'Ghana' }
    ];

    vm.transfer.destinationCountry = vm.destCountries[0];

    // Remove existing Order
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.order.$remove($state.go('admin.transfers.list'));
      }
    }

    // Save Transfer
    function save(isValid) {
      alert('Ayo');
      // body...
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.transferForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.transfer._id) {
        vm.transfer.$update(successCallback, errorCallback);
      } else {
        vm.transfer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.transfers.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
