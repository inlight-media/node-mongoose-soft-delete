var should = require('should');
var Test = require('./model');

describe("Count: ", function() {

  it("should NOT count `removed` documents", function(done) {
    Test.count(function(err, count) {
      should.not.exist(err);
      count.should.be.exactly(3).and.be.a.Number;

      done();
    });
  });
});
