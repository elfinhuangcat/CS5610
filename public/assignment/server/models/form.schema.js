module.exports = function(mongoose) {
    var FieldSchema = require('./field.schema.js');
    var FormSchema = mongoose.Schema({
        "id": String,
        "title": String,
        "userId": String,
        "fields": [FieldSchema]
    }, {collection: "cs5610.assignment.form"});
    return FormSchema;
};