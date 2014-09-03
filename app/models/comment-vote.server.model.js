'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment vote Schema
 */
var CommentVoteSchema = new Schema({
	criteria: {
		type: Object,
		default: {'Good Comment': 1},
		required: 'Criteria is required'
	},
	values: {
		type: Array,
		default: [],
	},
	binary: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comment: {
		type: Schema.ObjectId,
		ref: 'Comment'
	},
	idea: {
		type: Schema.ObjectId,
		ref: 'Idea'		
	}
});

mongoose.model('CommentVote', CommentVoteSchema);