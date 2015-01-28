module.exports = function(schema) {

	schema.add({
		deleted: Boolean,
		deletedAt: {
			type: Date
		}
	});

	schema.pre('save', function(next) {
		if (!this.deleted) {
			this.deleted = false;
		}
		next();
	});

	var hooks = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];

	hooks.forEach(function(hook) {
		schema.pre(hook, function(next) {
			this.where({
				deleted: {
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

	schema.methods.remove = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.deleted = true;
		this.deletedAt = new Date();

		this.save(callback);
	};

	schema.statics.hardRemove = function() {
		return this.remove.apply(this, arguments);
	};

	schema.methods.hardRemove = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.collection.remove({ _id: this._id }, callback);
	};

	schema.methods.restore = function (callback) {
        this.deleted = false;
        this.deletedAt = undefined;
        this.save(callback);
    };
};
