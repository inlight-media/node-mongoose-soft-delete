var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var helper = require('./lib/helper');
var mongoose = require('mongoose');

describe("remove(); ", function() {

    var test = fixtures.test.default;

    xit("Should remove all documents.", function(done) {
        Test.find(function(err, doc) {

            Test.remove(function(err) {
                should.not.exist(err);
                done();
            });

        });
    });

    it("Should set deleted to true.", function(done) {
        Test.remove({
            _id: test._id
        }, function(err) {
            should.not.exist(err);
            Test.findById(test._id, function(err, test) {

                test.deleted.should.be.true;
                should.exist(test.deletedAt);

                done();
            });
        });
    });
});
