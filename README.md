Mongoose Soft Delete
====================

Mongoose Soft Delete is a Mongoose plugin that discreetly enables soft delete. 
```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var softDelete = require('mongoose-soft-delete');
schema.plugin(softDelete);
```

To bypass softDelete, simply use native mongo queries.
Eg:
```
Model.collection.find({}).toArray(function(err, doc){
    // [{ deleted: ture, name: 'Fluffy1', _id: 53db63bb322236e666c3d7a1 },
    // { deleted: ture, name: 'Fluffy2', _id: 53db63bb322236e666c3d7a2 },
    // { deleted: false, name: 'Fluffy3', _id: 53db63bb322236e666c3d7a3 },
    // { deleted: false, name: 'Fluffy4', _id: 53db63bb322236e666c3d7a4 }]
});    
```      


### Examples

#### .remove()
Sets deleted key to true.
```
Model.remove(function (err, doc) {
       // mongodb: { deleted: true, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 }
});
```

#### .find(), .findOne(), .findOneAndUpdate(), .update(), .count()
Only query document/s where deleted does not equal ture.
```
Model.find(function (err, doc) {
      // [{ deleted: false, name: 'Fluffy1', _id: 53db63bb322236e666c3d7a1 },
      // { deleted: false, name: 'Fluffy2', _id: 53db63bb322236e666c3d7a2 }]
});
```

### Test
Tests will connect to mongodb via `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this. 

Run `npm test` 
