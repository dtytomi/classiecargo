(function () {
  // body...
  'use strict';

  angular
    .module('transfers.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig ($stateProvider) {
    // body...
    $stateProvider
      .state('transfers', {
        absract: true,
        url: '/transfers',
        template: '<ui-view>'
      })
      .state('transfers.create', {
        url: '/sendfund',
        templateUrl: 'modules/transfers/client/views/form-transfer.client.view.html',
        controller: 'transferController',
        controllerAs: 'vm',
        resolve: {
          transferResolve: newTransfer
        },
        data: {
          roles: ['user'],
          pageTitle: 'Transfer Fund'
        }
      })
      .state('transfers.edit', {
        url: '/:transferId/edit',
        templateUrl: 'modules/transfers/client/views/form-transfer.client.view.html',
        controller: 'transferController',
        controllerAs: 'vm',
        resolve: {
          transferResolve: getTransfer
        },
        data: {
          roles: ['user'],
          pageTitle: 'Update Fund Details'
        }
      })
      .state('transfers.list', {
        url: '',
        templateUrl: 'modules/transfers/client/views/list-transfer.client.view.html',
        controller: 'UserTransfersListController',
        controllerAs: 'vm',
        data: {
          roles: ['user'],
          pageTitle: 'Transfer Fund'
        }
      });
  }

  getTransfer.$inject = ['$stateParams', 'TransfersServce'];

  function getTransfer($stateParams, TransfersServce) {
    // body...
    return TransfersServce.get({
      transferId: $stateParams.transferId
    }).$promise;
  }

  newTransfer.$inject = ['TransfersServce'];

  function newTransfer(TransfersServce) {
    // body...
    return new TransfersServce();
  }

}());
