'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users');
var ideas = require('../../app/controllers/ideas');

module.exports = function(app) {
	// Ideas Routes
	app.route('/ideas')
		.get(ideas.list)
		.post(users.requiresLogin, ideas.create);

	app.route('/ideas/:ideaId')
		.get(ideas.read)
		.put(users.requiresLogin, ideas.hasAuthorization, ideas.update)
		.delete(users.requiresLogin, ideas.hasAuthorization, ideas.delete);

	// Finish by binding the Idea middleware
	app.param('ideaId', ideas.ideaByID);
};