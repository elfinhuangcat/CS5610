module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        "id": String,
        "label": {type: String, enum: ['TEXT', 'TEXTAREA', 'DATE','SELECT','CHECKBOXE','RADIO']}, // the label to display above the field
        //options - an array of options to be used when the field is of type RADIO, CHECKBOX, or SELECT.
        "options": [{
            "label" : String, // the label used to display
            "value": String // the actual value of the selected option
        }],
        "placeholder": String // the placeholder attribute text to show when the field is of type TEXT
    });
    return FieldSchema;
};