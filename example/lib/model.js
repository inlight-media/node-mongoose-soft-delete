var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var softDelete = require('../../');

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

// schema.plugin(softDelete);

module.exports = mongoose.model('test', schema);
