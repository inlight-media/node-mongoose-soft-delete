var mongoose = require('mongoose');
var fixtures = require('mongoose-fixtures');
var data = require('./lib/fixtures');

beforeEach(function beforeEachTest(done) {
    fixtures.load(data, done);
});

after(function(done) {
    mongoose.connection.db.dropCollection("testCollection", done);
});
