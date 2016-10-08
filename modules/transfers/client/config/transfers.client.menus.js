(function () {
  // body...

  angular
    .module('transfers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // body...
    menuService.addMenuItem('topbar', {
      title: 'Transfer Funds',
      state: 'transfers',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'transfers', {
      title: 'Send Fund',
      state: 'transfers.create',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'transfers', {
      title: 'Funds List',
      state: 'transfers.list',
      roles: ['user']
    });

  }
}());
