var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var helper = require('./lib/helper');
var mongoose = require('mongoose');

describe("find(); ", function() {

    var test = fixtures.test.default;
    // beforeEach(function(done){
    //     Test.hardRemove(done);
    // })

    it("Should return an array of all non soft deleted documents", function(done) {
        Test.find(function(err, res) {

            should.not.exist(err);
            res.should.be.instanceof(Array).and.have.lengthOf(1);
            done();

        });
    });

    it("Should not return document after it is soft deleted.", function(done) {
        Test.remove({
            _id: test._id
        }, function(err) {
            Test.find(function(err, test) {

                should.not.exist(err);
                test.should.be.instanceof(Array).and.have.lengthOf(0);
                done();
            });
        });
    });

});
