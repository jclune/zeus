'use strict';

// Idea votes controller
angular.module('idea-votes').controller('IdeaVotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'IdeaVotes',
	function($scope, $stateParams, $location, Authentication, IdeaVotes ) {
		$scope.authentication = Authentication;

		// Create new Idea vote
		$scope.create = function() {
			// Create new Idea vote object
			var ideaVote = new IdeaVotes ({
				name: this.name
			});

			// Redirect after save
			ideaVote.$save(function(response) {
				$location.path('idea-votes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Idea vote
		$scope.remove = function( ideaVote ) {
			if ( ideaVote ) { ideaVote.$remove();

				for (var i in $scope.ideaVotes ) {
					if ($scope.ideaVotes [i] === ideaVote ) {
						$scope.ideaVotes.splice(i, 1);
					}
				}
			} else {
				$scope.ideaVote.$remove(function() {
					$location.path('idea-votes');
				});
			}
		};

		// Update existing Idea vote
		$scope.update = function() {
			var ideaVote = $scope.ideaVote ;

			ideaVote.$update(function() {
				$location.path('idea-votes/' + ideaVote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Idea votes
		$scope.find = function() {
			$scope.ideaVotes = IdeaVotes.query();
		};

		// Find existing Idea vote
		$scope.findOne = function() {
			$scope.ideaVote = IdeaVotes.get({ 
				ideaVoteId: $stateParams.ideaVoteId
			});
		};
	}
]);