var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("restore(); Method:", function() {

    it("Should restore a soft deleted document.", function(done) {

        Test.find({
            includeDeleted: true,
            name: 'test4'
        }, function(err, docs) {
            should.not.exist(err);
            var test4 = docs[0];

            test4.deleted.should.be.true;

            test4.restore(function(err) {
                should.not.exist(err);

                Test.find({
                    name: 'test4'
                }, function(err, docs) {
                    should.not.exist(err);
                    var test4 = docs[0];
                    test4.deleted.should.be.false;

                    done();
                });
            });

        });
    });
});

describe("restore(); Static:", function() {

    it("Should restore a soft deleted document.", function(done) {
        var test4 = new Test(fixtures.test.default4);
        test4.deleted.should.be.true;
        Test.restore({
            name: 'test4'
        }, function(err, doc) {
            Test.find({
                name: 'test4'
            }, function(err, test4) {

                test4[0].deleted.should.be.false;
                done();
            });
        });

    });
});
