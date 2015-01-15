module.exports = function(schema) {
	schema.pre('save', function(next) {

		var user = this;

		if (user.constructor.modelName !== 'user'){
			throw new Error('User pre-save middleware should not pre-save "' + user.constructor.modelName + 's".');
		}

		next();

	});
};
