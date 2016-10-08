(function () {
  // body...
  'use strict';

  angular
    .module('transfers.services')
    .factory('TransfersServce', TransfersServce);

  TransfersServce.$inject = ['$resource'];

  function TransfersServce($resource) {
    // body...
    var Transfer = $resource('api/transfers/:transferId', {
      transferId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Transfer.prototype, {
      createOrUpdate: function () {
        // body...
        var transfer = this;
        return createOrUpdate(transfer);
      }
    });

    return Transfer;

    function createOrUpdate(transfer) {
      // body...
      if (transfer._id) {
        return transfer.$update(onSuccess, onError);
      } else {
        return transfer.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess (transfer) {
        // body...
      }

      // Handle error response
      function onError(errorResponse) {
        // body...
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }
    function handleError(error) {
      // body...
      console.log(error);
    }
  }

  angular
    .module('transfers.services')
    .factory('UserTransfersService', UserTransfersService);

  UserTransfersService.$inject = ['$resource'];

  function UserTransfersService($resource) {
    // body...
    return $resource('api/transfers/user/:username', {},
      {
        update: {
          method: 'PUT'
        }
      });
  }
}());
