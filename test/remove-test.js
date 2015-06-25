var Test = require('./model');
var should = require('should');

describe("Remove Statics: ", function() {

  it("Should `remove` all documents.", function(done) {

    Test.remove(function(err) {
      should.not.exist(err);
      Test.find(function(err, tests) {

        should.not.exist(err);
        tests.should.be.instanceof(Array).and.have.lengthOf(0);

        done();
      });
    });
  });

  it("Should set removed to true in the database.", function(done) {

    Test.remove({
      name: 'test2'
    }, function(err, doc) {
      should.not.exist(err);

      Test.collection.findOne({
        name: 'test2'
      }, function(err, doc) {

        doc.removed.should.be.true;
        should.exist(doc.removedAt);
        done();
      });
    });
  });
});

describe("Remove Methods: ", function() {

  it("Should set document removed field to true in the database.", function(done) {
    Test.findOne({
      name: 'default'
    }, function(err, doc) {

      should.not.exist(err);
      should.not.exist(doc.removed);
      should.not.exist(doc.archived);

      doc.remove(function(err) {

        should.not.exist(err);
        Test.collection.findOne({
          name: 'default'
        }, function(err, doc) {

          doc.removed.should.be.true;
          should.exist(doc.removedAt);
          done();
        });
      });
    });
  });
});
