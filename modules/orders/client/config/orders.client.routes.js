(function () {
  'use strict';

  angular
    .module('orders.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('orders.create', {
        url: '/create',
        templateUrl: 'modules/orders/client/views/form-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: newOrder
        },
        data: {
          roles: ['user'],
          pageTitle: 'Orders Create'
        }
      })
      .state('orders.edit', {
        url: '/:orderId/edit',
        templateUrl: 'modules/orders/client/views/form-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          roles: ['user'],
          pageTitle: 'Edit Order {{ orderResolve.title }}'
        }
      })
      .state('orders.list', {
        url: '',
        templateUrl: 'modules/orders/client/views/list-orders.client.view.html',
        controller: 'UserOrdersListController',
        controllerAs: 'vm',
        data: {
          roles: ['user'],
          pageTitle: 'Order List'
        }
      })
      .state('orders.view', {
        url: '/:orderId',
        templateUrl: 'modules/orders/client/views/view-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          pageTitle: 'Order {{ orderResolve.title }}'
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }

  newOrder.$inject = ['OrdersService'];

  function newOrder(OrdersService) {
    return new OrdersService();
  }

}());
