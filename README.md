# node-mongoose-soft-delete
Mongoose Soft Delete
==================================

A soft delete plugin for Mongoosejs.

Provides methods and statics for soft-deleting documents, as well as restoring and them.
By default, 'removed' documents are invisible to all mongoose queries, this ensures that the plugin can be applied to any application using mongoose without affecting functionality.

### Install

TODO: publish to npm.


Add to package.json
```
"dependencies": {
    "mongoose-archive": "rolandnsharp/node-mongoose-soft-delete"
}
```
Install `npm install`.

### Adding the plugin to the target Mongoose schema.

```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var softDelete = require('node-mongoose-soft-delete');
schema.plugin(softDelete);
```
## Statics and Methods

### remove(conditions, callback)
Soft-deletes documents for `conditions`.
Sets a `{ removed: true }` field on the document/s that hides it/them from all mongoose queries unless specifically queried with `{ removed: true }` conditions.

### restore(conditions, callback)
Restores 'removed' documents which match `conditions`.


- - -

## Queries

#### find(), findOne(), findOneAndUpdate(), update(), count()
Mongoose queries work as expected. In that all `removed` documents are invisible to them.

Examples

```
Model.find(function (err, doc) {
      // Returns an array of all non-soft-deleted documents.
});
```

```
Model.find({ removed: true }, function (err, doc) {
      // Returns an array of all soft-deleted documents.
});
```

### Test
By default, tests will connect to a test mongodb at `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this.
Run `npm test`
