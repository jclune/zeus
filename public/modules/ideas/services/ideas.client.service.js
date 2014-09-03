'use strict';

//Ideas service used for communicating with the articles REST endpoints
angular.module('ideas').factory('Ideas', ['$resource',
	function($resource) {
		return $resource('ideas/:ideaId', {
			ideaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);