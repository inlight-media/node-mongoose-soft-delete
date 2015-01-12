var mongoose = require('mongoose');
var fixtures = require('mongoose-fixtures');

// Before each test, load the fixture data to ensure consistent tests.
var data = require('./lib/fixtures');
beforeEach(function beforeEachTest(done) {
    fixtures.load(data, done);
});

after(function(done) {
    mongoose.connection.db.dropCollection("testCollection", done);
});
