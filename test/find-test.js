var Test = require('./lib/model');
var should = require('should');

describe("find(); ", function() {

	it("should not return `removed` or `archived` documents by default", function(done) {

		Test.find(function(err, tests) {
			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(3);
			tests.forEach(function(test) {
				should.not.exist(test.removed);
				should.not.exist(test.archived);
			});
			done();
		});
	});

	it(" {} should not return `removed` or `archived` documents by default", function(done) {

		Test.find({}, function(err, tests) {
			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(3);
			tests.forEach(function(test) {
				should.not.exist(test.removed);
				should.not.exist(test.archived);
			});
			done();
		});
	});

	it("shoul only return `archived` documents when using flag `{archived: true}`", function(done) {

		Test.find({
			archived: true
		}, function(err, tests) {

			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(1);
			tests.forEach(function(test) {
				test.archived.should.be.true;
				should.not.exist(test.removed);
			});
			done();
		});
	});

	it("shoul return `archived` documents AND and documents that are neither `archived` nor `removed` when using the flag `{archived: null}`", function(done) {

		Test.find({
			archived: null
		}, function(err, docs) {
			should.not.exist(err);
			docs.should.be.instanceof(Array).and.have.lengthOf(4);
			// should contain one archived document
			docs.forEach(function(doc) {
				should.not.exist(doc.removed);
			});
			done();
		});
	});

	it("shoul only return `removed` documents when using flag `{removed: ture}`", function(done) {

		Test.find({
			removed: true
		}, function(err, tests) {

			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(1);
			tests.forEach(function(test) {
				test.removed.should.be.true;
				should.not.exist(test.archived);
			});
			done();
		});
	});
});
