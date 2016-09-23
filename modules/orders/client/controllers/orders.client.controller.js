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
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('orders.list'));
      }
    }

    // Save Article
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
        $state.go('orders.view', {
          orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
