var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var softDelete = require('../../')(mongoose);

var _ = require('lodash');
var hooks = require('hooks');

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

schema.plugin(softDelete);

module.exports = mongoose.model('test', schema);
