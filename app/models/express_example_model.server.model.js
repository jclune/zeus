'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ExpressExampleModel Schema
 */
var ExpressExampleModelSchema = new Schema({
  // ExpressExampleModel model fields   
  // ...
});

mongoose.model('ExpressExampleModel', ExpressExampleModelSchema);