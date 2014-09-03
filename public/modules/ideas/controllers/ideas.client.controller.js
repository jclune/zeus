'use strict';

angular.module('ideas').controller('IdeasController', ['$scope', '$location', '$stateParams', 'Authentication', 'Ideas',
	function($scope, $location, $stateParams, Authentication, Ideas) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var idea = new Ideas({
        title: this.title,
        content_short: this.content_short
      });
      idea.$save(function(response) {
        $location.path('ideas/' + response._id);

        $scope.title = '';
        $scope.content_short = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
        $scope.ideaForm.$error.required.forEach(function(e) {
          e.$dirty = true;
        });
        console.log($scope.error);
      });
    };

    $scope.remove = function(idea) {
      if (idea) {
        idea.$remove();

        for (var i in $scope.ideas) {
          if ($scope.ideas[i] === idea) {
            $scope.ideas.splice(i, 1);
          }
        }
      } else {
        $scope.idea.$remove(function() {
          $location.path('ideas');
        });
      }
    };

    $scope.update = function() {
      var idea = $scope.idea;

      idea.$update(function() {
        $location.path('ideas/' + idea._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
        console.log($scope.error);
      });
    };

    $scope.find = function() {
      $scope.ideas = Ideas.query();
    };

    $scope.findOne = function() {
      $scope.idea = Ideas.get({
        ideaId: $stateParams.ideaId
      });
    };
	}
]);