module.exports = function(schema) {

	schema.add({
		removed: Boolean,
		removedAt: Date,
		archived: Boolean,
		archivedAt: Date
	});

	var queries = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];

	queries.forEach(function(query) {
		schema.pre(query, function(next) {

			var conditions = {
				removed: {
					'$ne': true
				}
			};

			if (this._conditions.archived === null) {
				// remove invalid mongoose condition {archived: null}
				delete this._conditions.archived;
				this.where(conditions);

				return next();
			}

			conditions.archived = {
				'$ne': true
			}

			this.where(conditions);
			next();
		});
	});

	schema.statics.destroy = function() {
	// save instance of remove
		// TODO fix this
		// return this.remove.apply(this, arguments);
	};

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
		this.collection.update(conditions, update, function(err, numberAffected) {
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

		var update = {
			$unset: {
				archived: 1,
				archivedAt: 1
			}
		};
		// TODO update with mongoose
		this.collection.update(conditions, update, function(err, raw) {
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
};
