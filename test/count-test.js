var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("count(); ", function() {

	it("Should not count soft deleted documents.", function(done) {
		Test.count(function(err, count) {
			should.not.exist(err);
			count.should.be.exactly(4).and.be.a.Number;

			done();
		});
	});
});
