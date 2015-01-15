var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var softDelete = require('../../../../')(mongoose);

var schema = new Schema({
    title: String
}, {
    collection: 'testCollection'
});

// schema.plugin(softDelete);

module.exports = schema;
