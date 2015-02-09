var mongoose = require('mongoose');
var userController = require('./lib/users/controller');
var express = require('express');
var app = express();

mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

mongoose.connection.on('error', function(err) {
    console.log('MongoDB error', err);
});

mongoose.connection.on('open', function() {
    console.log('Mongoose connection open');
});

var router = new express.Router();

router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:user', userController.show);
router.put('/:user', userController.update);
router.delete('/:user', userController.destroy);

app.use('/', router);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;
