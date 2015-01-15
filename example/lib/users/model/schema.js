var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var softDelete = require('../../../../')(mongoose);

var schema = new Schema({
    name: String
});

// schema.plugin(softDelete);

module.exports = schema;
