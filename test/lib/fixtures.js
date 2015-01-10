var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Test = require('./model');

var test = new Test({
    _id: new ObjectId(),
    name: 'test1'
});

module.exports = {
    test: test
};
