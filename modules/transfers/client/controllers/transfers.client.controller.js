(function () {
  // body...
  'use strict';

  angular
    .module('transfers')
    .controller('transferController', transferController);

  transferController.$inject = ['$scope', '$state', 'transferResolve', '$window', 'Authentication'];

  function transferController ($scope, $state, transfer, $window, Authentication) {
    // body...
    var vm = this;

    vm.transfer = transfer;
    vm.Authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    vm.destCountries = [
      { destCountry: 'Nigeria' },
      { destCountry: 'Ghana' }
    ];

    vm.transfer.destinationCountry = vm.destCountries[0];

    // Save Transfer
    function save(isValid) {
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
        $state.go('transfers.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
