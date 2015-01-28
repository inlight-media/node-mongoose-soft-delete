var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("hardRemove(); Statics:", function() {

    var test;
    var test1;
    var test2;
    var test3;
    var test4;

    before(function(done) {
        test = new Test(fixtures.test.default);
        test1 = new Test(fixtures.test.default1);
        test2 = new Test(fixtures.test.default2);
        test3 = new Test(fixtures.test.default3);
        test4 = new Test(fixtures.test.default4);

        test.save(function() {
            test1.save(function() {
                test2.save(function() {
                    test3.save(function() {
                        test4.save(function() {
                            done();
                        });
                    });
                });
            });
        });
    });

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

    var test;
    var test1;
    var test2;
    var test3;
    var test4;

    before(function(done) {
        test = new Test(fixtures.test.default);
        test1 = new Test(fixtures.test.default1);
        test2 = new Test(fixtures.test.default2);
        test3 = new Test(fixtures.test.default3);
        test4 = new Test(fixtures.test.default4);

        test.save(function() {
            test1.save(function() {
                test2.save(function() {
                    test3.save(function() {
                        test4.save(function() {
                            done();
                        });
                    });
                });
            });
        });
    });

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