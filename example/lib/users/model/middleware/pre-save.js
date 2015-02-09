module.exports = function(schema) {
	schema.pre('save', function(next) {

		var user = this;

		console.log('running pre-save middleware: ', user.constructor.modelName);

		if (user.constructor.modelName !== 'user'){
			throw new Error('User pre-save middleware should not pre-save "' + user.constructor.modelName + 's".');
		}

		next();

	});
};
