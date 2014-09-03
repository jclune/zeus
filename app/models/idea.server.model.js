'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Idea Schema
 */
var IdeaSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Idea Title is required',
		trim: true
	},
	content_short: {
		type: String,
		default: '',
		required: 'Idea Description is required',
		trim: true
	},
	content_long: {
		type: String,
		default: '',
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
	started: {
		type: Date,
		default: Date.now
	},
	duration: {
		type: Number,
		default: 7*24*60*60
	},
	frozen: {
		type: Date,
		default: null
	},
	// states: open, closed, frozen
	state: {
		type: String,
		default: 'open'
	},
	criteria: {
		type: Object,
		default: {'Value Proposition': 5}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

IdeaSchema.path('content_short').validate(function (v) {
  return v.length <= 400;
}, 'Idea Description has a 400 character limit. Please put extra information in the Supporting Details.'); 

IdeaSchema.path('content_long').validate(function (v) {
  return v.length <= 4000;
}, 'Supporting Details has a 4000 character limit. Please note nobody will read an idea this long.'); 

mongoose.model('Idea', IdeaSchema);