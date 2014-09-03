'use strict';

//Setting up route
angular.module('idea-votes').config(['$stateProvider',
	function($stateProvider) {
		// Idea votes state routing
		$stateProvider.
		state('listIdeaVotes', {
			url: '/idea-votes',
			templateUrl: 'modules/idea-votes/views/list-idea-votes.client.view.html'
		}).
		state('createIdeaVote', {
			url: '/idea-votes/create',
			templateUrl: 'modules/idea-votes/views/create-idea-vote.client.view.html'
		}).
		state('viewIdeaVote', {
			url: '/idea-votes/:ideaVoteId',
			templateUrl: 'modules/idea-votes/views/view-idea-vote.client.view.html'
		}).
		state('editIdeaVote', {
			url: '/idea-votes/:ideaVoteId/edit',
			templateUrl: 'modules/idea-votes/views/edit-idea-vote.client.view.html'
		});
	}
]);