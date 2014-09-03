'use strict';

(function() {
	// Comment votes Controller Spec
	describe('Comment votes Controller Tests', function() {
		// Initialize global variables
		var CommentVotesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Comment votes controller.
			CommentVotesController = $controller('CommentVotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Comment vote object fetched from XHR', inject(function(CommentVotes) {
			// Create sample Comment vote using the Comment votes service
			var sampleCommentVote = new CommentVotes({
				name: 'New Comment vote'
			});

			// Create a sample Comment votes array that includes the new Comment vote
			var sampleCommentVotes = [sampleCommentVote];

			// Set GET response
			$httpBackend.expectGET('comment-votes').respond(sampleCommentVotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.commentVotes).toEqualData(sampleCommentVotes);
		}));

		it('$scope.findOne() should create an array with one Comment vote object fetched from XHR using a commentVoteId URL parameter', inject(function(CommentVotes) {
			// Define a sample Comment vote object
			var sampleCommentVote = new CommentVotes({
				name: 'New Comment vote'
			});

			// Set the URL parameter
			$stateParams.commentVoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/comment-votes\/([0-9a-fA-F]{24})$/).respond(sampleCommentVote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.commentVote).toEqualData(sampleCommentVote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CommentVotes) {
			// Create a sample Comment vote object
			var sampleCommentVotePostData = new CommentVotes({
				name: 'New Comment vote'
			});

			// Create a sample Comment vote response
			var sampleCommentVoteResponse = new CommentVotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Comment vote'
			});

			// Fixture mock form input values
			scope.name = 'New Comment vote';

			// Set POST response
			$httpBackend.expectPOST('comment-votes', sampleCommentVotePostData).respond(sampleCommentVoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Comment vote was created
			expect($location.path()).toBe('/comment-votes/' + sampleCommentVoteResponse._id);
		}));

		it('$scope.update() should update a valid Comment vote', inject(function(CommentVotes) {
			// Define a sample Comment vote put data
			var sampleCommentVotePutData = new CommentVotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Comment vote'
			});

			// Mock Comment vote in scope
			scope.commentVote = sampleCommentVotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/comment-votes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/comment-votes/' + sampleCommentVotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid commentVoteId and remove the Comment vote from the scope', inject(function(CommentVotes) {
			// Create new Comment vote object
			var sampleCommentVote = new CommentVotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Comment votes array and include the Comment vote
			scope.commentVotes = [sampleCommentVote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/comment-votes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCommentVote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.commentVotes.length).toBe(0);
		}));
	});
}());