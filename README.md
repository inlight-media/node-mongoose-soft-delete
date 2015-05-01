Mongoose Archiving and Soft Delete
==================================

An archiving and soft delete plugin for Mongoosejs.

Provides methods and statics for archiving and soft-deleting documents, as well as restoring and unarchiving them.
By default, 'archived' and 'removed' documents are invisible to all mongoose queries, this ensures that the plugin can be applied to any application using mongoose without affecting functionality.

### Install

TODO: publish to npm.


Add to package.json
```
"dependencies": {
    "mongoose-archive": "inlight-media/node-mongoose-soft-delete"
}
```
Install `npm install`.

### Adding the plugin to the target Mongoose schema.

```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var archive = require('mongoose-archive');
schema.plugin(archive);
```
## Statics and Methods

### remove(conditions, callback)
Soft deletes documents for `conditions`.
Sets a `{ removed: true }` field on the document/s that hides it/them from all mongoose queries unless specifically queried with `{ removed: true }` conditions.

### restore(conditions, callback)
Restores 'removed' documents which match `conditions`.

### archive(conditions, callback)
Archives documents for `conditions`.
This sets an `{archived: true}` field on the document/s that hides it/them from all mongoose queries unless specifically queried with `{archived: true}` conditions, or `{archived: null}` which will return both archived and non-archived documents but not 'removed' documents.

### unarchive(conditions, callback)
Unarchives 'archived' documents which match `conditions`.

Examples:

```
Model.archive(conditons, function (err, doc) {
       // Archives all documents for `conditions`.
});
```
```
Model.remove(conditons, function (err) {
       // Soft deletes all documents for `conditions`.
});
```

```
Model.unarchive(conditons, function (err, doc) {
       // Archives all documents for `conditions`.
});
```

- - -

## Queries

#### find(), findOne(), findOneAndUpdate(), update(), count()
Mongoose queries work as expected. In that all `removed` documents are invisible to them, plus all `archived` documents are also invisible.

Examples

```
Model.find(function (err, doc) {
      // Returns an array of all non-archived and non-soft-deleted documents.
});
```

```
Model.find({ archived: true }, function (err, doc) {
      // Returns an array of all archived documents.
});
```

```
Model.find({ removed: true }, function (err, doc) {
      // Returns an array of all soft-deleted documents.
});
```
```
Model.find({ archived: null }, function (err, doc) {
    // Returns an array of all non-archived and non-soft-deleted documents,
    // Plus all archived documents.
});
```

### Test
By default, tests will connect to a test mongodb at `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this.
Run `npm test`
