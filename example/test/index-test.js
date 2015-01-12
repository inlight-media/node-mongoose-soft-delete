var request = require('supertest')('../app');
var should = require('should');
var Test = require('../lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("Something ", function() {

    var test = fixtures.test.default;

    it("Should create the resource successfully", function(done) {
        var url = '/';
            request.post(url)
            .send({name: 'testName'})
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                console.log(arguments);
                // should.not.exist(err);

                done();
            });

    });

});
