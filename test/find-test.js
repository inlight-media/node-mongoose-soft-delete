var Test = require('./lib/model');
var should = require('should');

describe("find(); ", function() {

	it("should not return `removed` or `archived` documents by default", function(done) {

		Test.find(function(err, tests) {
			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(3);
			tests.forEach(function(test) {
				should.not.exist(test.deleted);
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
				should.not.exist(test.deleted);
				should.not.exist(test.archived);
			});
			done();
		});
	});

	it("shoul only return archived documents when using flag `{archived: true}`", function(done) {

		Test.find({
			archived: true
		}, function(err, tests) {

			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(1);
			tests.forEach(function(test) {
				test.archived.should.be.true;
				should.not.exist(test.deleted);
			});
			done();
		});
	});

	it("shoul return archived documents AND and documents that are neither `archived` nor `removed` when using the flag `{archived: null}`", function(done) {

		Test.find({
			archived: null
		}, function(err, docs) {
			should.not.exist(err);
			docs.should.be.instanceof(Array).and.have.lengthOf(4);
			// should contain one archived document
			docs.forEach(function(doc) {
				should.not.exist(doc.deleted);
			});
			done();
		});
	});

	it("shoul only return deleted documents when using flag `{deleted: ture}`", function(done) {

		Test.find({
			deleted: true
		}, function(err, tests) {

			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(1);
			tests.forEach(function(test) {
				test.deleted.should.be.true;
				should.not.exist(test.archived);
			});
			done();
		});
	});
});
