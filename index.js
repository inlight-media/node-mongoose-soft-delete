module.exports = function(schema) {

	// add fields to mongoose schema
	schema.add({
		removed: Boolean,
		removedAt: Date,
		archived: Boolean,
		archivedAt: Date
	});

	// All mongoose queries are built using these base queries,
	// therefore adding the `archived` and `removed` logic to these queries adds it to all queries.
	var queries = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];

	// add pre-query logic
	queries.forEach(function(query) {
		schema.pre(query, function(next) {

			// default to only querying documents that do not the removed flag set
			// setting {removed: true} overrides this and only queries removed documents
			var conditions = {
				removed: {
					'$ne': true
				}
			};

			// {archived: null} returns both archived and unarchived documents, but not removed documents

			// The logic after || is to fix .unarchive logic
			// the {unarchive: false} falg is set in .unarchive()
			// .unarchive() uses the `update` query
			if (this._conditions.archived === null || (this._conditions.archived === false && query === 'update')) {
				// remove invalid mongoose condition {archived: null}
				delete this._conditions.archived;
				this.where(conditions);

				return next();
			}

			// else, also, don't query archived documents
			conditions.archived = {
				'$ne': true
			}

			this.where(conditions);
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

	schema.statics.archive = function(first, second) {

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
			archived: true,
			archivedAt: new Date()
		};

		this.update(conditions, update, function(err, raw) {

			if (err) {
				return callback(err);
			}
			// `raw` is raw mongo output
			callback(null, raw);

		});
	};

	schema.methods.archive = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.archived = true;
		this.archivedAt = new Date();

		this.save(callback);
	};

	schema.statics.unarchive = function(first, second) {
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

		// set {archived: false} to trip the pre-query hook conditional.
		conditions.archived = false;

		// remove archived fields
		var update = {
			$unset: {
				archived: 1,
				archivedAt: 1
			}
		};

		// TODO Mongoose update does not return the document like mongo update does.
		// maybe use find find first to return the document if we need this functionality in the future.
		this.update(conditions, update, function(err, raw) {
			if (err) {
				return callback(err);
			}
			if (raw === 0) {
				return callback('Wrong arguments!');
			}
			// `raw` is raw mongo output
			callback(null, raw);

		});
	};

	schema.methods.unarchive = function(callback) {
		this.archived = undefined;
		this.archivedAt = undefined;
		this.save(callback);
	};

	schema.statics.destroy = function() {
		// save instance of remove
		// TODO fix this
		// return this.remove.apply(this, arguments);
	};
};
