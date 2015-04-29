module.exports = function(schema) {

	schema.add({
		deleted: Boolean,
		deletedAt: Date,
		archived: Boolean,
		archivedAt: Date
	});

	var hooks = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];

	hooks.forEach(function(hook) {
		schema.pre(hook, function(next) {

			this.where({
				deleted: {
					'$ne': true
				},
				archived: {
					'$ne': true
				}
			});
			next();
		});
	});

	schema.statics.remove = function(first, second) {
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
			deleted: true,
			deletedAt: new Date()
		};

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

	schema.methods.remove = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.deleted = true;
		this.deletedAt = new Date();

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

	schema.methods.archive = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.archived = true;
		this.archivedAt = new Date();

		this.save(callback);
	};
};
