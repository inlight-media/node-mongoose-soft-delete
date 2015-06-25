var Test = require('./model');
var should = require('should');

describe("Find: ", function() {

	it("should not return `removed` documents by default", function(done) {

		Test.find(function(err, tests) {
			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(3);
			tests.forEach(function(test) {
				should.not.exist(test.removed);
			});

			done();
		});
	});

	it("should not return `removed` documents with conditions `{}`", function(done) {

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
