var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

var mongooseSoftDelete = require('../../');

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

schema.plugin(mongooseSoftDelete);

module.exports = mongoose.model('test', schema);
