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
    // [{ deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 },
    // { deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 }]
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
      // [{ deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 },
      // { deleted: false, name: 'Fluffy', _id: 53db63bb322236e666c3d7a6 }]
});
```

### Test
Tests will connect to mongodb via `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this. 

Run `npm test` 
