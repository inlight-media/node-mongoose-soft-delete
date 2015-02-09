var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var softDelete = require('../../../../');

var schema = new Schema({
    name: String
});

schema.plugin(softDelete);

module.exports = schema;
