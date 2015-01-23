module.exports = function(schema) {

	schema.add({
		deleted: Boolean,
		deletedAt: {
			type: Date
		}
	});

	schema.pre('find', function(next) {
		this.where({
			deleted: {
				'$ne': true
			}
		});
		next();
	});

	schema.pre('findOne', function(next) {
		this.where({
			deleted: {
				'$ne': true
			}
		});
		next();
	});

	schema.pre('findOneAndUpdate', function(next) {
		this.where({
			deleted: {
				'$ne': true
			}
		});
		next();
	});

	schema.pre('update', function(next) {
		this.where({
			deleted: {
				'$ne': true
			}
		});
		next();
	});

	schema.pre('save', function(next) {
		if (!this.deleted) {
			this.deleted = false;
		}
		next();
	});

	schema.statics.hardRemove = function(one, two, three) {
		// @TODO: get something like this working:
		// return this.collection.remove.apply(this, arguments);
		return this.collection.remove(one, two, three);
	};

	schema.statics.remove = function(first, second) {
		var callback;
		var conditions;

		if (typeof first === 'function') {
			callback = first;
			conditions = {};
		} else {
			callback = second;
			conditions = {
				_id: first._id
			};
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

	//@TODO test methods
	schema.methods.remove = function(first, second) {
		var callback = typeof first === 'function' ? first : second,
			deletedBy = second !== undefined ? first : null;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.deleted = true;
		this.deletedAt = new Date();

		this.save(callback);
	};
};
