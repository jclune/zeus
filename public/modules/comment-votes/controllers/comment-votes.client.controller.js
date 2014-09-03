'use strict';

// Comment votes controller
angular.module('comment-votes').controller('CommentVotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'CommentVotes',
	function($scope, $stateParams, $location, Authentication, CommentVotes ) {
		$scope.authentication = Authentication;

		// Create new Comment vote
		$scope.create = function() {
			// Create new Comment vote object
			var commentVote = new CommentVotes ({
				name: this.name
			});

			// Redirect after save
			commentVote.$save(function(response) {
				$location.path('comment-votes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Comment vote
		$scope.remove = function( commentVote ) {
			if ( commentVote ) { commentVote.$remove();

				for (var i in $scope.commentVotes ) {
					if ($scope.commentVotes [i] === commentVote ) {
						$scope.commentVotes.splice(i, 1);
					}
				}
			} else {
				$scope.commentVote.$remove(function() {
					$location.path('comment-votes');
				});
			}
		};

		// Update existing Comment vote
		$scope.update = function() {
			var commentVote = $scope.commentVote ;

			commentVote.$update(function() {
				$location.path('comment-votes/' + commentVote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comment votes
		$scope.find = function() {
			$scope.commentVotes = CommentVotes.query();
		};

		// Find existing Comment vote
		$scope.findOne = function() {
			$scope.commentVote = CommentVotes.get({ 
				commentVoteId: $stateParams.commentVoteId
			});
		};
	}
]);