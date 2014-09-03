'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	content_short: {
		type: String,
		default: '',
		required: 'Comment is missing',
		trim: true
	},
	department: {
		type: String,
		default: 'Ameba'
	},
	project: {
		type: String,
		default: ''
	},
	view: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now,
	},
	criteria: {
		type: Object,
		default: {'Good Comment': 1}
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

CommentSchema.path('content_short').validate(function (v) {
  return v.length <= 400;
}, 'Comments have a 400 character limit.'); 

mongoose.model('Comment', CommentSchema);