(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', 'orderResolve', '$window', 'Authentication'];

  function OrdersController($scope, $state, order, $window, Authentication) {
    var vm = this;

    vm.order = order;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    vm.shipCountries = [
      { shipCountry: 'Nigeria' },
      { shipCountry: 'Ghana' }
    ];

    vm.destCountries = [
      { destCountry: 'Nigeria' },
      { destCountry: 'Ghana' }
    ];

    vm.order.shipCountry = vm.shipCountries[0];
    vm.order.destinationCountry = vm.destCountries[0];

    vm.transportation = [
      { modeOfTransportation: 'Bike' },
      { modeOfTransportation: 'Truck' }
    ];

    vm.order.myTransport = vm.transportation[0];

    vm.sizes = [
      { size: 'Light weight' },
      { size: 'Heavy duty' }
    ];

    vm.order.mySize = vm.sizes[0];

    $scope.alerts = [
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }
    ];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    // Save Order
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('orders.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
