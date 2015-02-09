var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var user = {
    user1: {
        _id: new ObjectId(),
        name: 'user1'
    },
    user2: {
        _id: new ObjectId(),
        name: 'user2'
    },
    user3: {
        _id: new ObjectId(),
        name: 'user3'
    },
    user4: {
        _id: new ObjectId(),
        name: 'user4'
    },
    user5: {
        _id: new ObjectId(),
        name: 'user5',
        deleted: true
    }
};

var post = {
    post1: {
        _id: new ObjectId(),
        title: 'post1'
    },
    post2: {
        _id: new ObjectId(),
        title: 'post2'
    },
    post3: {
        _id: new ObjectId(),
        title: 'post3'
    },
    post4: {
        _id: new ObjectId(),
        title: 'post4'
    },
    post5: {
        _id: new ObjectId(),
        title: 'post5',
        deleted: true
    }
};

module.exports = {
    user: user,
    post: post
};
