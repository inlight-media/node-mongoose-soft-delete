module.exports = function(schema, options) {

  // add fields to mongoose schema
  schema.add({
    removed: Boolean,
    removedAt: Date
  });

  // All mongoose queries are built using these base queries,
  // therefore adding the `archived` and `removed` logic to these queries adds it to all queries.
  var queries = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];

  // add pre-query logic
  queries.forEach(function(query) {
    schema.pre(query, function(next) {
      // Only query documents that do not have the removed flag set to ture.
      // Setting {removed: true} overrides this and only queries removed documents.

      this.where({
        removed: {
          '$ne': true
        }
      });

      next();
    });
  });

  schema.statics.remove = function(first, second) {
    // TODO if archived. removed from archived
    var callback;
    var update = {
      removed: true,
      removedAt: new Date()
    };
    var conditions;
    var options = {
      multi: false
    };

    if (typeof first === 'function') {
      callback = first;
      conditions = {};
      options.multi = true;
    } else {
      callback = second;
      conditions = first;
    }

    if (typeof callback !== 'function') {
      throw ('Wrong arguments!');
    }

    this.update(conditions, update, options, function(err, numAffected) {
      if (err) {
        return callback(err);
      }
      callback(null, numAffected);
    });
  };

  schema.methods.remove = function(callback) {
    // TODO test this conditional.
    // when document is removed, it is no longer archived
    if (this.archived) {
      this.archived = undefined;
      this.archivedAt = undefined;
    }

    this.removed = true;
    this.removedAt = new Date();
    this.save(callback);
  };


  schema.statics.restore = function(first, second) {
    var callback;
    var conditions;

    if (typeof first === 'function') {
      callback = first;
      conditions = {};
    } else {
      callback = second;
      conditions = first;
    }

    if (typeof callback !== 'function') {
      throw ('Wrong arguments!');
    }

    var update = {
      $unset: {
        removed: 1
      },
      $unset: {
        removedAt: 1
      }
    };
    // TODO use mongoose .update
    this.update(conditions, update, function(err, numberAffected) {
      if (err) {
        return callback(err);
      }
      if (numberAffected === 0) {
        return callback('Wrong arguments!');
      }
      callback(null);

    });
  };

  schema.methods.restore = function(callback) {
    this.removed = undefined;
    this.removedAt = undefined;
    this.save(callback);
  };

  schema.statics.destroy = function(callback) {
    // save instance of remove
    // TODO fix this
    // return this.remove.apply(this, arguments);

    this.collection(conditions, callback)
  };
};
