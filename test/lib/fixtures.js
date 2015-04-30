var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Test = require('./model');

var test = {
    default: {
        _id: new ObjectId(),
        name: 'default'
    },
    archived: {
        _id: new ObjectId(),
        name: 'archived',
        archived: true,
        archivedAt: new Date()
    },
    removed: {
        _id: new ObjectId(),
        name: 'removed',
        deleted: true,
        deletedAt: new Date()
    },
    test1: {
        _id: new ObjectId(),
        name: 'test1'
    },
    test2: {
        _id: new ObjectId(),
        name: 'test2'
    }
};

module.exports = {
    test: test
};
