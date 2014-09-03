'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	IdeaVote = mongoose.model('IdeaVote'),
	_ = require('lodash');

/**
 * Create a Idea vote
 */
exports.create = function(req, res) {
	var ideaVote = new IdeaVote(req.body);
	ideaVote.user = req.user;

	ideaVote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ideaVote);
		}
	});
};

/**
 * Show the current Idea vote
 */
exports.read = function(req, res) {
	res.jsonp(req.ideaVote);
};

/**
 * Update a Idea vote
 */
exports.update = function(req, res) {
	var ideaVote = req.ideaVote ;

	ideaVote = _.extend(ideaVote , req.body);

	ideaVote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ideaVote);
		}
	});
};

/**
 * Delete an Idea vote
 */
exports.delete = function(req, res) {
	var ideaVote = req.ideaVote ;

	ideaVote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ideaVote);
		}
	});
};

/**
 * List of Idea votes
 */
exports.list = function(req, res) { IdeaVote.find().sort('-created').populate('user', 'displayName').exec(function(err, ideaVotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ideaVotes);
		}
	});
};

/**
 * Idea vote middleware
 */
exports.ideaVoteByID = function(req, res, next, id) { IdeaVote.findById(id).populate('user', 'displayName').exec(function(err, ideaVote) {
		if (err) return next(err);
		if (! ideaVote) return next(new Error('Failed to load Idea vote ' + id));
		req.ideaVote = ideaVote ;
		next();
	});
};

/**
 * Idea vote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ideaVote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};