var _ = require('lodash');
var should = require('should');
var Test = require('./lib/model');
var fixtures = require('./lib/fixtures');
var mongoose = require('mongoose');

describe("count(); ", function() {
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

	it("Should not count soft deleted documents.", function(done) {
		Test.count(function(err, count) {
			should.not.exist(err);
			count.should.be.exactly(4).and.be.a.Number;

			done();
		});
	});
});
