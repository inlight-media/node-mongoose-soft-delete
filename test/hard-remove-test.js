var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("hardRemove(); Statics:", function() {
    var test = new Test(fixtures.test.default);

    it("should remove a specific document from the database.", function(done) {
        Test.hardRemove({
            _id: test._id
        }, function(err) {

            should.not.exist(err);
            Test.findById(test._id, function(err, test) {

                should.not.exist(err);
                should.not.exist(test);

                done();
            });
        });
    });

    it("Should remove all documents from the database.", function(done) {

        Test.find(function(err, doc) {
            Test.hardRemove({}, function(err) {
                should.not.exist(err);
                // test that documents are deleted fromt the db
                done();
            });
        });
    });

});

describe("hardRemove(); Methods: ", function() {
    var test3 = new Test(fixtures.test.default3);

    it("Should delete that document.", function(done) {
        Test.findById(test3._id, function(err, test) {
            should.not.exist(err);
            test.deleted.should.be.false;

            test.hardRemove(function(err) {
                should.not.exist(err);

                Test.collection.findOne({
                    _id: test3._id
                }, function(err, doc) {
                    should.not.exist(err);
                    should.not.exist(doc);
                    done();
                });
            });
        });
    });
});