'use strict';

//Comment votes service used to communicate Comment votes REST endpoints
angular.module('comment-votes').factory('CommentVotes', ['$resource',
	function($resource) {
		return $resource('comment-votes/:commentVoteId', { commentVoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);