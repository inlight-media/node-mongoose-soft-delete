var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("unarchive(); Method:", function() {

	it("Should unarchive all archived documents.");

	it("Should unarchive a archived document.", function(done) {

		Test.unarchive({
			name: 'archived'
		}, function(err, docs) {
			should.not.exist(err);
			// TODO test for returned unarchived document if we decide to implememt this feature
			Test.findOne({
				name: 'archived',
			}, function(err, doc) {
				should.not.exist(err);
				doc.name.should.be.exactly('archived');

				done();
			});
		});
	});
});

describe("unarchive(); Static:", function() {

	it("Should unarchive an archived document.", function(done) {

		Test.findOne({
			archived: true,
			name: 'archived'
		}, function(err, doc) {
			doc.archived.should.be.true;

			doc.unarchive(function(err, doc) {
				should.not.exist(err);
				Test.findOne({
					name: 'archived'
				}, function(err, doc) {
                    should.not.exist(err);
                    doc.should.have.properties({name: 'archived'});
                    should.not.exist(doc.archived);

					done();
				});
			});
		});
	});
});
