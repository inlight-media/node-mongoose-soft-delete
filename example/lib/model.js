var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

var softDelete = require('mongoose-soft-delete');

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

// schema.plugin(softDelete);

module.exports = mongoose.model('test', schema);
