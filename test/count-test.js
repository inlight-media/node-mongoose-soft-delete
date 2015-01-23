var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("count(); ", function() {
	var test = fixtures.test.default;

	it("Should not count soft deleted documents.", function(done) {
		Test.count(function(err, count) {
			count.should.be.exactly(4).and.be.a.Number;
			should.not.exist(err);

			done();
		});
	});
});
