Mongoose Soft Delete
====================

Mongoose Soft Delete is a Mongoose plugin that discreetly enables soft delete. 
```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var softDelete = require('mongoose-soft-delete')(mongoose);
schema.plugin(softDelete);
```

### Examples

#### .remove()
Sets deleted key to true.
```
Model.remove(function () {
       // mongodb: { deleted: true, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 }
});
```
#### .hardRemove()
Removes document/s from the database.
```
Model.hardRemove(function () {
       // mongodb: []
});
```
#### .find()
Only returns document/s where deleted does not equal ture.
```
Model.find(function () {
      // [{ deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 },
      // { deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 }]
});
```

### Test
Tests will connect to mongodb via `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this. 

Run `npm test` 
