'use strict';

//Idea votes service used to communicate Idea votes REST endpoints
angular.module('idea-votes').factory('IdeaVotes', ['$resource',
	function($resource) {
		return $resource('idea-votes/:ideaVoteId', { ideaVoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);