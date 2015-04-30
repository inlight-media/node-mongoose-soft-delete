var Test = require('./lib/model');
var should = require('should');
var fixtures = require('./lib/fixtures');

describe("archive(); Static: ", function() {

	it("Should archive document.", function(done) {

		Test.archive({
			name: 'default'
		}, function(err) {
			should.not.exist(err);

			Test.collection.findOne({
				name: 'default'
			}, function(err, doc) {

				doc.archived.should.be.true;
				should.exist(doc.archivedAt);
				done();
			});
		});
	});

});

describe("archive(); Method: ", function() {

	it("Should archive document.", function(done) {
		Test.findOne({
			name: 'default'
		}, function(err, doc) {

			should.not.exist(err);
			should.not.exist(doc.archived);

			doc.archive(function(err) {
				should.not.exist(err);

				Test.collection.findOne({
					name: 'default'
				}, function(err, doc) {

					doc.archived.should.be.true;
					should.exist(doc.archivedAt);
					done();
				});
			});
		});
	});
});
