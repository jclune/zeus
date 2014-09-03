'use strict';

// Configuring the Ideas module
angular.module('ideas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ideas', 'ideas', 'dropdown', '/ideas(/create)?');
		Menus.addSubMenuItem('topbar', 'ideas', 'List Ideas', 'ideas');
		Menus.addSubMenuItem('topbar', 'ideas', 'New Idea ', 'ideas/create');
	}
]);