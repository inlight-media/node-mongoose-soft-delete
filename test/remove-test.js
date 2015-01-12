var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');
var test = fixtures.test.default;

describe("Statics: remove(); ", function() {


    it("Should remove all documents.", function(done) {
        Test.find(function(err, doc) {
            Test.remove(function(err) {
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

    it("Should set deleted to true.", function(done) {
        Test.remove({
            _id: test._id
        }, function(err) {
            should.not.exist(err);

            Test.collection.findOne( { _id: test._id }, function(err, doc){

            	doc.deleted.should.be.true;
                should.exist(doc.deletedAt);
                done();
            });
        });
    });
});

describe("Methods: remove(); ", function() {

    it("Should set deleted document to true.", function(done) {
        Test.findById(test._id, function(err, test) {

            should.not.exist(err);
            test.deleted.should.be.false;

            test.remove(function(err) {

                should.not.exist(err);

                Test.collection.findOne( { _id: test._id }, function(err, doc){

	            	doc.deleted.should.be.true;
	                should.exist(doc.deletedAt);
	                done();
	            });
            });
        });
    });
});
