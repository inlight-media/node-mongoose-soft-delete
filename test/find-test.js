var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("find(); ", function() {

    var test = fixtures.test.default;

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
