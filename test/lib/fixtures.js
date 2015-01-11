var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Test = require('./model');

var test = {
    default: {
        _id: new ObjectId(),
        name: 'test'
    }
};

module.exports = {
    test: test
};
