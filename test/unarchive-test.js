var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe(".unarchive(); Method:", function() {

    it("Should unarchive all archived documents.");

	it("Should unarchive a archived document.", function(done) {

		Test.archive({
			name: 'default'
		}, function(err, docs) {
			should.not.exist(err);

			Test.findOne({
				name: 'default'
			}, function(err, doc) {
				should.not.exist(err);
				should.not.exist(doc);

				done();
			});
		});
	});
});

describe(".unarchive(); Static:", function() {

	it("Should unarchive a archived document.", function(done) {
		var test4 = new Test(fixtures.test.default4);
		test4.archived.should.be.true;
		Test.unarchive({
			name: 'test4'
		}, function(err, doc) {
			Test.find({
				name: 'test4'
			}, function(err, test4) {
				should.not.exist(err);
				should.not.exist(test4[0].archived);

				done();
			});
		});

	});
});
