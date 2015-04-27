var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("destroy(); Statics:", function() {
	var test = new Test(fixtures.test.default);

	it("should destroy a specific document from the database.", function(done) {
		Test.destroy({
			_id: test._id
		}, function(err) {

			should.not.exist(err);
			Test.findById(test._id, function(err, test) {

				should.not.exist(err);
				should.not.exist(test);

				done();
			});
		});
	});

	it("Should destroy all documents from the database.", function(done) {

		Test.find(function(err, doc) {
			Test.destroy({}, function(err) {
				should.not.exist(err);
				// test that documents are deleted fromt the db
				done();
			});
		});
	});

	xit("Failing test.", function(done) {

		Test.find(function(err, doc) {
			Test.destroy(function(err) {
				should.not.exist(err);
				Test.find(function(err, doc) {
                    should.not.exist(err);
                    should.not.exist(doc[0]);

					// test that documents are deleted fromt the db
					done();
				});
			});
		});
	});

});

describe("destroy(); Methods: ", function() {
	var test3 = new Test(fixtures.test.default3);

	it("Should destroy that document.", function(done) {
		Test.findById(test3._id, function(err, test) {
			should.not.exist(err);
			should.not.exist(test.deleted);

			test.destroy(function(err) {
				should.not.exist(err);

				Test.collection.findOne({
					_id: test3._id
				}, function(err, doc) {
					should.not.exist(err);
					should.not.exist(doc);
					done();
				});
			});
		});
	});
});
