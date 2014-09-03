'use strict';

//Setting up route
angular.module('comment-votes').config(['$stateProvider',
	function($stateProvider) {
		// Comment votes state routing
		$stateProvider.
		state('listCommentVotes', {
			url: '/comment-votes',
			templateUrl: 'modules/comment-votes/views/list-comment-votes.client.view.html'
		}).
		state('createCommentVote', {
			url: '/comment-votes/create',
			templateUrl: 'modules/comment-votes/views/create-comment-vote.client.view.html'
		}).
		state('viewCommentVote', {
			url: '/comment-votes/:commentVoteId',
			templateUrl: 'modules/comment-votes/views/view-comment-vote.client.view.html'
		}).
		state('editCommentVote', {
			url: '/comment-votes/:commentVoteId/edit',
			templateUrl: 'modules/comment-votes/views/edit-comment-vote.client.view.html'
		});
	}
]);