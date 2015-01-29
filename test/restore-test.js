var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("restore(); Method:", function() {
    var test4 = new Test(fixtures.test.default4);


    xit("Should restore a soft deleted document.", function(done) {


        // Model = mongoose.model('test');

        // Model.collection.remove(function(err){
        //     console.log('it worked');
        // });
        // duplicate id or somethang
        // works with it.only
        // mongoose.connection.db.collection('testCollection').find({
        //     name: 'test4'
        // }).toArray(function(err, docs) {
        //     console.log(docs[0]);
        //     docs[0].restore(function(err, restoredDoc) {

        //         restoredDoc.deleted.should.be.false;
        //         should.not.exist(restoredDoc.deletedAt);
        //         done();
        //     });
        // });

        test4.deleted.should.be.true;

        test4.restore(function(err, restoredDoc) {
            console.log(arguments);
            // restoredDoc.deleted.should.be.false;
            // should.not.exist(restoredDoc.deletedAt);
            done();
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
