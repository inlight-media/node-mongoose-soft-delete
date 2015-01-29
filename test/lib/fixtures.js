var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Test = require('./model');

var test = {
    default: {
        _id: new ObjectId(),
        name: 'test'
    },
    default1: {
        _id: new ObjectId(),
        name: 'test1'
    },
    default2: {
        _id: new ObjectId(),
        name: 'test2'
    },
    default3: {
        _id: new ObjectId(),
        name: 'test3'
    },
    default4: {
        _id: new ObjectId(),
        name: 'test4',
        deleted: true,
        deletedAt: new Date()
    }
};

module.exports = {
    test: test
};
