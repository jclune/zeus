'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ideas = require('../../app/controllers/ideas');
	var comments = require('../../app/controllers/comments');
	var commentVotes = require('../../app/controllers/comment-votes');

	// Comment votes Routes
	app.route('/idea/:ideaId/comments/:commentId/comment-votes')
		.get(commentVotes.list)
		.post(users.requiresLogin, commentVotes.create);

	app.route('/idea/:ideaId/comments/:commentId/comment-votes/:commentVoteId')
		.get(commentVotes.read)
		.put(users.requiresLogin, commentVotes.hasAuthorization, commentVotes.update)
		.delete(users.requiresLogin, commentVotes.hasAuthorization, commentVotes.delete);

	// Finish by binding the Comment vote middleware
	app.param('ideaId', ideas.ideaByID);
	app.param('commentId', comments.commentByID);
	app.param('commentVoteId', commentVotes.commentVoteByID);
};