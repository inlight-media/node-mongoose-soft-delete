var mongoose = require('mongoose');
var schema = mongoose.schema;
var _ = require('lodash');
var hooks = require('hooks');

for (var k in hooks) {
    mongoose.Model.prototype[k] = mongoose.Model[k] = hooks[k];
}

mongoose.Model.hook('query', function (query, cb) {
    console.log("calling internal callback after pre query hooks");
    cb();
});

mongoose.Query.prototype.exec = _.wrap(mongoose.Query.prototype.exec, function (exec) {
    console.log("wrapped exec method executing..");
    var self = this;
    var args = arguments;
    this.model.prototype.query(this, function(){
        console.log("working after pre query call back");
        return exec.apply(self, [].slice.call(args, 1));
    });
});

//add any other methods you want to have pre query access
_.each(['find', 'findOne', 'count'], function (method) {
    mongoose.Model[method] = _.wrap(mongoose.Model[method], function (fn) {
        var args = [].slice.call(arguments);
        // if callback exist convert that in to exec style execution and forward to exec wrapper
        // so that we can have access to query object
        if (_.isFunction(args[args.length - 1])) {
            var cb = args.pop();
            return fn.apply(this, [].slice.call(args, 1)).exec(cb);
        }
        // if just find execute it, because user will any way call exec at the end for results
        return fn.apply(this, [].slice.call(arguments, 1));
    });
});

module.exports = function(schema, options) {

    schema.add({
        deleted: Boolean
    });

    schema.add({
        deletedAt: {
            type: Date
        }
    });

    schema.pre('query', function(next) {
       console.log('xxx');
        query.where({deleted: false});
        next();
    });

    schema.pre('save', function(next) {
        if (!this.deleted) {
            this.deleted = false;
        }
        next();
    });

    schema.statics.hardRemove = function(callback) {
        // mirror mongoose .remove
        // https://github.com/LearnBoost/mongoose/blob/master/lib/model.js#L630

        this.collection.remove(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, {});

        });
    };

    schema.statics.remove = function(conditions, callback) {
        console.log(conditions, callback);

        var update = {
            deleted: true,
            deletedAt: new Date()
        };

        this.update({
            _id: conditions._id
        }, update, function(err, numberAffected) {
            console.log(err, numberAffected);
            if (err) {
                return callback(err);
            }
            if (numberAffected === 0) {
                return callback('Wrong arguments!');
            }
            callback(null, {});
        });
    };

};