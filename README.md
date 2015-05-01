Mongoose Archiving and Soft Delete
================================

An archiving and soft delete plugin for Mongoosejs.


All archived and removed documents will be hidden from mongoose queries unless specifically queried with the conditions `{archived: true}` or `{deleted: true}`. Using `{archived: null}` will return all archived and non-archived documents, but not removed documents.

### Installing the plugin to your Mongoose schema.

```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var archive = require('mongoose-archive');
schema.plugin(archive);
```

### remove(conditions, callback)
Soft deletes all documents for `conditions`.
```
Model.remove(conditons, function (err, doc) {
       // Soft deletes all documents for `conditions`.
});
```

### archive(conditions, callback)
Archives all documents for `conditions`.

```
Model.archive(conditons, function (err, doc) {
       // Archives all documents for `conditions`.
});
```

#### find(), findOne(), findOneAndUpdate(), update(), count()
Mongoose queries work as expected. In that all `removed` documents are invisible to them, plus all `archived` documents are also invisible.

Examples

```
Model.find(function (err, doc) {
      // Returns an array of all non-archived and non-soft-deleted documents.
});
```

```
Model.find({archived: true }, function (err, doc) {
      // Returns an array of all archived documents.
});
```

```
Model.find({removed: true }, function (err, doc) {
      // Returns an array of all soft-deleted documents.
});
```
```
Model.find({archived: null }, function (err, doc) {
    // Returns an array of all non-archived and non-soft-deleted documents,
    // Plus all archived documents.
});
```

### Test
By default, tests will connect to a test mongodb at `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this.
Run `npm test`
