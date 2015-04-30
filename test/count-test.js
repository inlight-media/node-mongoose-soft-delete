var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe(".count(); ", function() {

	it("should not count `removed` or `archived` documents", function(done) {
		Test.count(function(err, count) {
			should.not.exist(err);
			count.should.be.exactly(3).and.be.a.Number;

			done();
		});
	});
});
