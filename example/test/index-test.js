var request = require('supertest')(require('../app'));
var should = require('should');

var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("Tests  ", function() {

    var User = fixtures.user.default;

    it("Should index.", function(done) {
        request.get('/')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                should.not.exist(err);
                done();
            });

    });

    it("Should create the resource successfully", function(done) {
        request.post('/')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                should.not.exist(err);
                done();
            });
    });

});
