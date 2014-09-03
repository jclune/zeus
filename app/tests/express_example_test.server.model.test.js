'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ExpressExampleModel = mongoose.model('ExpressExampleModel');

/**
 * Globals
 */
var user, expressExampleModel;

/**
 * Unit tests
 */
describe('Express Example Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			expressExampleModel = new ExpressExampleModel({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return expressExampleModel.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ExpressExampleModel.remove().exec();
		User.remove().exec();

		done();
	});
});