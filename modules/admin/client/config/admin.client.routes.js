(function () {
  'use strict';

  angular
    .module('admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/admin/client/views/users/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/admin/client/views/users/view-user.client.view.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/admin/client/views/users/edit-user.client.view.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      })
      .state('admin.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('admin.orders.list', {
        url: '',
        templateUrl: 'modules/admin/client/views/orders/list-orders.client.view.html',
        controller: 'OrdersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.orders.create', {
        url: '/create',
        templateUrl: 'modules/admin/client/views/orders/form-order.client.view.html',
        controller: 'OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          orderResolve: newOrder
        }
      })
      .state('admin.orders.edit', {
        url: '/:orderId/edit',
        templateUrl: 'modules/admin/client/views/orders/form-order.client.view.html',
        controller: 'OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          orderResolve: getOrder
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.query({
      orderId: $stateParams.orderId
    }).$promise;
  }

  newOrder.$inject = ['OrdersService'];

  function newOrder(OrdersService) {
    return new OrdersService();
  }

  getUser.$inject = ['$stateParams', 'AdminService'];

  function getUser($stateParams, AdminService) {
    return AdminService.get({
      userId: $stateParams.userId
    }).$promise;
  }
}());
