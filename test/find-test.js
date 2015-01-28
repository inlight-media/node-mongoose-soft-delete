var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("find(); ", function() {

    // var test = fixtures.test.default;
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

    it("Should return an array of all non soft deleted documents", function(done) {
        Test.find(function(err, tests) {

            should.not.exist(err);
            tests.should.be.instanceof(Array);
            tests.forEach(function(test) {
                test.deleted.should.be.false;
            })
            done();

        });
    });

    it("Should not return document after it is soft deleted.", function(done) {
        Test.remove({
            _id: test._id
        }, function(err) {
            Test.find(function(err, tests) {

                should.not.exist(err);
                tests.should.be.instanceof(Array).and.have.lengthOf(3);
                tests.forEach(function(test) {
                    test.deleted.should.be.false;
                });
                done();
            });
        });
    });

});
