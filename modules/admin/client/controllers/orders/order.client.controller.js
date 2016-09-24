(function () {
  'use strict';

  angular
    .module('admin.orders')
    .controller('OrdersAdminController', OrdersAdminController);

  OrdersAdminController.$inject = ['$scope', '$state', '$window', 'orderResolve', 'Authentication'];

  function OrdersAdminController($scope, $state, $window, order, Authentication) {
    var vm = this;

    vm.order = order;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
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
    vm.order.destCountry = vm.destCountries[0];

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

    // Remove existing Order
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.order.$remove($state.go('admin.orders.list'));
      }
    }

    // Save Order
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
        return false;
      }

      // Create a new order, or update the current instance
      vm.order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.orders.list'); // should we send the User to the list or the updated Order's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
