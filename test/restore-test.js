var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("restore(); ", function() {

    var test;
    var test1;
    var test2;
    var test3;
    var test4;

    before(function(done) {
        test = new Test(fixtures.test.default);
        test1 = new Test(fixtures.test.default1);
        test2 = new Test(fixtures.test.default2);
        test3 = new Test(fixtures.test.default3);
        test4 = new Test(fixtures.test.default4);

        test.save(function() {
            test1.save(function() {
                test2.save(function() {
                    test3.save(function() {
                        test4.save(function() {
                            done();
                        });
                    });
                });
            });
        });
    });

    xit("Should restore a soft deleted document.", function(done) {

        Model = mongoose.model('test');
        console.log('isdldsjfldlsf');
        Model.collection.remove(function(err){
            console.log('it worked');
        });
        // duplicate id or somethang
        // works with it.only
        test4.deleted.should.be.true;

        test4.restore(function(err, restoredDoc) {
            console.log(arguments);
            restoredDoc.deleted.should.be.false;
            should.not.exist(restoredDoc.deletedAt);
            done();
        });
    });
});
