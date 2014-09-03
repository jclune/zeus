'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ideas = require('../../app/controllers/ideas');
	var ideaVotes = require('../../app/controllers/idea-votes');

	// Idea votes Routes
	app.route('/idea/:ideaId/idea-votes')
		.get(ideaVotes.list)
		.post(users.requiresLogin, ideaVotes.create);

	app.route('/idea/:ideaId/idea-votes/:ideaVoteId')
		.get(ideaVotes.read)
		.put(users.requiresLogin, ideaVotes.hasAuthorization, ideaVotes.update)
		.delete(users.requiresLogin, ideaVotes.hasAuthorization, ideaVotes.delete);

	// Finish by binding the Idea vote middleware
	app.param('ideaId', ideas.ideaByID);
	app.param('ideaVoteId', ideaVotes.ideaVoteByID);
};