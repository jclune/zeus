'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Idea vote Schema
 */
var IdeaVoteSchema = new Schema({
	criteria: {
		type: Object,
		default: {'Value Proposition': 5},
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
	idea: {
		type: Schema.ObjectId,
		ref: 'Idea'
	}
});

mongoose.model('IdeaVote', IdeaVoteSchema);