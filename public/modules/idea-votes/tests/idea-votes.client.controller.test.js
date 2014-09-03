'use strict';

(function() {
	// Idea votes Controller Spec
	describe('Idea votes Controller Tests', function() {
		// Initialize global variables
		var IdeaVotesController,
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

			// Initialize the Idea votes controller.
			IdeaVotesController = $controller('IdeaVotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Idea vote object fetched from XHR', inject(function(IdeaVotes) {
			// Create sample Idea vote using the Idea votes service
			var sampleIdeaVote = new IdeaVotes({
				name: 'New Idea vote'
			});

			// Create a sample Idea votes array that includes the new Idea vote
			var sampleIdeaVotes = [sampleIdeaVote];

			// Set GET response
			$httpBackend.expectGET('idea-votes').respond(sampleIdeaVotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ideaVotes).toEqualData(sampleIdeaVotes);
		}));

		it('$scope.findOne() should create an array with one Idea vote object fetched from XHR using a ideaVoteId URL parameter', inject(function(IdeaVotes) {
			// Define a sample Idea vote object
			var sampleIdeaVote = new IdeaVotes({
				name: 'New Idea vote'
			});

			// Set the URL parameter
			$stateParams.ideaVoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/idea-votes\/([0-9a-fA-F]{24})$/).respond(sampleIdeaVote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ideaVote).toEqualData(sampleIdeaVote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(IdeaVotes) {
			// Create a sample Idea vote object
			var sampleIdeaVotePostData = new IdeaVotes({
				name: 'New Idea vote'
			});

			// Create a sample Idea vote response
			var sampleIdeaVoteResponse = new IdeaVotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Idea vote'
			});

			// Fixture mock form input values
			scope.name = 'New Idea vote';

			// Set POST response
			$httpBackend.expectPOST('idea-votes', sampleIdeaVotePostData).respond(sampleIdeaVoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Idea vote was created
			expect($location.path()).toBe('/idea-votes/' + sampleIdeaVoteResponse._id);
		}));

		it('$scope.update() should update a valid Idea vote', inject(function(IdeaVotes) {
			// Define a sample Idea vote put data
			var sampleIdeaVotePutData = new IdeaVotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Idea vote'
			});

			// Mock Idea vote in scope
			scope.ideaVote = sampleIdeaVotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/idea-votes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/idea-votes/' + sampleIdeaVotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ideaVoteId and remove the Idea vote from the scope', inject(function(IdeaVotes) {
			// Create new Idea vote object
			var sampleIdeaVote = new IdeaVotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Idea votes array and include the Idea vote
			scope.ideaVotes = [sampleIdeaVote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/idea-votes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleIdeaVote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ideaVotes.length).toBe(0);
		}));
	});
}());