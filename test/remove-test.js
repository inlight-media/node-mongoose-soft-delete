// var should = require('should');
// var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');

var Test = require('./lib/model');
var should = require('should');

describe("remove(); Statics: ", function() {

	it("Should `remove` all documents.", function(done) {

		Test.remove(function(err) {
			should.not.exist(err);
			Test.find(function(err, tests) {

				should.not.exist(err);
				tests.should.be.instanceof(Array);
				tests.should.be.instanceof(Array).and.have.lengthOf(0);

				done();
			});
		});
	});

	it("Should set deleted to true.", function(done) {

		Test.remove({
			name: 'test2'
		}, function(err, doc) {
			should.not.exist(err);

			Test.collection.findOne({
				name: 'test2'
			}, function(err, doc) {

                doc.deleted.should.be.true;
                should.exist(doc.deletedAt);
				done();
			});
		});
	});
});

describe("remove(); Methods: ", function() {

	it("Should set deleted document to true.", function(done) {
		Test.findOne({
			name: 'default'
		}, function(err, doc) {

			should.not.exist(err);
			should.not.exist(doc.deleted);
			should.not.exist(doc.archived);

			doc.remove(function(err) {

				should.not.exist(err);
				Test.collection.findOne({
					name: 'default'
				}, function(err, doc) {

					doc.deleted.should.be.true;
					should.exist(doc.deletedAt);
					done();
				});
			});
		});
	});
});
