var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var helper = require('./lib/helper');
var mongoose = require('mongoose');

describe("Remove static: ", function() {

    var test = fixtures.test;

    before(function(done) {
        mongoose.connection.db.dropCollection("testCollection", function() {
            test.save(function() {
                done();
            });
        });
    });

    it("should set deleted to true.", function(done) {
        Test.remove({ _id: test._id }, function(err) {
            should.not.exist(err);
            Test.findById(test._id, function(err, test) {

                test.deleted.should.be.true;
                should.exist(test.deletedAt);

                done();
            });
        });
    });

    it("find() should not return soft deleted documents.", function(done) {
        Test.remove({ _id: test._id }, function(err) {
            Test.find(function(err, test) {

            	should.not.exist(err);
            	test.should.be.instanceof(Array).and.have.lengthOf(0);
                done();
            });
        });
    });

    it("hardRemove should delete the document.", function(done) {
        Test.hardRemove({ _id: test._id }, function(err) {

            should.not.exist(err);
            Test.findById(test._id, function(err, test) {

            	should.not.exist(err);
            	should.not.exist(test);

                done();
            });
        });
    });

});
