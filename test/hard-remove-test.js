var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("hardRemove(); ", function() {

    var test = fixtures.test.default;

    it("should remove the document from the database.", function(done) {
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

});
