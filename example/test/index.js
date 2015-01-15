var mongoose = require('mongoose');
var fixtures = require('mongoose-fixtures');

var User = require('../lib/users/model');
var Post = require('../lib/posts/model');

// Before each test, load the fixture data to ensure consistent tests.
var data = require('./lib/fixtures');
beforeEach(function beforeEachTest(done) {
    fixtures.load(data, done);
});

function dropMongoDatabase(callback) {
	// Drop the database once connected (or immediately if connected).
	var CONNECTION_STATES = mongoose.Connection.STATES;
	var readyState = mongoose.connection.readyState;
	var connected = false;

	var drop = function() {
		mongoose.connection.db.dropDatabase(function(err) {
			if (err) {
				console.log(err);
				throw err;
			}
			callback();
		});
	};

	if (CONNECTION_STATES[readyState] === 'connected') {
		drop();
	}
	else {
		mongoose.connection.once('connected', drop);
	}
}

after(function(done) {
    dropMongoDatabase(done);
});
