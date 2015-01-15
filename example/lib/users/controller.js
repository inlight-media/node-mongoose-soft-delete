var controller;
(function init() {
	var CrudGenerator = require('crud-generator');
	var Model = require('./model');
	var crud = new CrudGenerator(Model);

	controller = crud.all();
}());
module.exports = controller;
