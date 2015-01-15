var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var user = {
    default: {
        _id: new ObjectId(),
        name: 'user'
    },
    default1: {
        _id: new ObjectId(),
        name: 'user1'
    },
    default2: {
        _id: new ObjectId(),
        name: 'user2'
    },
    default3: {
        _id: new ObjectId(),
        name: 'user3'
    },
    default4: {
        _id: new ObjectId(),
        name: 'user4',
        deleted: true
    }
};

var post = {
    default: {
        _id: new ObjectId(),
        notAName: 'test'
    },
    default1: {
        _id: new ObjectId(),
        notAName: 'test1'
    },
    default2: {
        _id: new ObjectId(),
        notAName: 'test2'
    },
    default3: {
        _id: new ObjectId(),
        notAName: 'test3'
    },
    default4: {
        _id: new ObjectId(),
        notAName: 'test4',
        deleted: true
    }
};

module.exports = {
    user: user,
    post: post
};
