var mongoose = require('mongoose');
var controller = require('./lib/controller');
var express = require('express');
var app = express();
var Test = require('./lib/model');

mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

mongoose.connection.on('error', function(err) {
    console.log('MongoDB error', err);
});

mongoose.connection.on('open', function() {
    console.log('Mongoose connection open');
});

var router = new express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:test', controller.show);
router.put('/:test', controller.update);
router.delete('/:test', controller.destroy);

app.use('/', router);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;
