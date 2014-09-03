'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	CommentVote = mongoose.model('CommentVote'),
	_ = require('lodash');

/**
 * Create a Comment vote
 */
exports.create = function(req, res) {
	var commentVote = new CommentVote(req.body);
	commentVote.user = req.user;

	commentVote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commentVote);
		}
	});
};

/**
 * Show the current Comment vote
 */
exports.read = function(req, res) {
	res.jsonp(req.commentVote);
};

/**
 * Update a Comment vote
 */
exports.update = function(req, res) {
	var commentVote = req.commentVote ;

	commentVote = _.extend(commentVote , req.body);

	commentVote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commentVote);
		}
	});
};

/**
 * Delete an Comment vote
 */
exports.delete = function(req, res) {
	var commentVote = req.commentVote ;

	commentVote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commentVote);
		}
	});
};

/**
 * List of Comment votes
 */
exports.list = function(req, res) { CommentVote.find().sort('-created').populate('user', 'displayName').exec(function(err, commentVotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commentVotes);
		}
	});
};

/**
 * Comment vote middleware
 */
exports.commentVoteByID = function(req, res, next, id) { CommentVote.findById(id).populate('user', 'displayName').exec(function(err, commentVote) {
		if (err) return next(err);
		if (! commentVote) return next(new Error('Failed to load Comment vote ' + id));
		req.commentVote = commentVote ;
		next();
	});
};

/**
 * Comment vote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.commentVote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};