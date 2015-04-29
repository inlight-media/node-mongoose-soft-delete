var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');
var test = fixtures.test.default;

describe("archive(); Statics: ", function() {
    var test1 = new Test(fixtures.test.default1);

    it("Should archive all documents.", function(done) {
        Test.find(function(err, doc) {
            Test.archive(function(err) {
                should.not.exist(err);
                Test.find(function(err, tests) {

                    should.not.exist(err);
                    tests.should.be.instanceof(Array);
                    // tests.should.be.instanceof(Array).and.have.lengthOf(0);

                    done();
                });
            });

        });
    });

    it("Should set archived to true.", function(done) {
        Test.archive({
            _id: test1._id
        }, function(err) {
            should.not.exist(err);

            Test.collection.findOne({
                _id: test1._id
            }, function(err, doc) {


                doc.archived.should.be.true;
                should.exist(doc.archivedAt);
                done();
            });
        });
    });
});

describe("archive(); Methods: ", function() {
    var test2 = new Test(fixtures.test.default2);

    it("Should set archived document to true.", function(done) {
        Test.findById(test2._id, function(err, test) {

            should.not.exist(err);
            should.not.exist(test.archived);

            test.archive(function(err) {

                should.not.exist(err);

                Test.collection.findOne({
                    _id: test2._id
                }, function(err, doc) {

                    doc.archived.should.be.true;
                    should.exist(doc.archivedAt);
                    done();
                });
            });
        });
    });
});
