"use strict";
var uuid = require('uuid');
module.exports = function(app, db) {
    var api = {
        // Create - should accept an instance object, add it to a corresponding collection, and return the collection
        createForm : createForm,
        // FindAll - should take no arguments, and return the corresponding collection
        findAllForm : findAllForm,
        // FindById - should take an ID as an argument, find an instance object in the corresponding collection whose ID property is equal to the ID argument, return the instance found, null otherwise
        findFormById : findFormById,
        // Update - should take an ID and object instance as arguments, find the object instance in the corresponding collection whose ID property is equal to the ID argument, update the found instance with property values in the argument instance object
        updateForm : updateForm,
        // Delete - should accept an ID as an argument, remove the instance object from the corresponding collection whose ID property s equal to the ID argument
        deleteFormById : deleteFormById,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,
        findFieldByFormId: findFieldByFormId,
        findOneFieldByFormAndFieldId: findOneFieldByFormAndFieldId,
        deleteFieldByFormAndFieldId: deleteFieldByFormAndFieldId,
        createField: createField,
        updateField: updateField
    };
    return api;

    var forms = require('./form.mock.json');

    function createForm(form) {
        form.id = uuid.v4();
        forms.push(form);
        return forms;
    }

    function findAllForm() {
        return forms;
    }

    function findFormById(id) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == id) {
                return forms[i];
            }
        }
        return null; // form not found
    }

    function updateForm(id, form) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == id) {
                for (var property in form) {
                    forms[i][property] = form[property];
                }
            }
        }
        console.log("WARNING - updateForm() form id not found");
    }

    function deleteFormById(id) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == id) {
                forms.splice(i,1);
            }
        }
        console.log("WARNING - deleteFormById() - form id not found");
    }

    /**
     * returns a single form whose title is equal to title parameter, null otherwise
     * @param title
     */
    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].title == title) {
                return forms[i];
            }
        }
        return null;
    }

    /**
     * Returns an array of forms which belong to the user specified by the given Id
     * @param userId
     */
    function findFormByUserId(userId) {
        var user_forms = [];
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].userId == userId) {
                user_forms.push(forms[i]);
            }
        }
        return user_forms;
    }

    /**
     * Returns an array of fields by formId. If not found, returns null
     * @param formId
     * @returns {*}
     */
    function findFieldByFormId(formId) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == formId) {
                return forms[i].fields;
            }
        }
        return null;
    }

    /**
     * Finds the field by formId and fieldId
     * @param formId
     * @param fieldId
     * @returns field object
     */
    function findOneFieldByFormAndFieldId(formId, fieldId) {
        var fields = findFieldByFormId(formId);
        for (var i = 0; i < fields.length; ++i) {
            if (fields[i].id == fieldId) {
                return fields[i];
            }
        }
        return null;
    }

    function deleteFieldByFormAndFieldId(formId, fieldId) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == formId) {
                // Form found
                for (var j = 0; j < forms[i].fields.length; ++j) {
                    if (forms[i].fields[j].id == fieldId) {
                        // Field found
                        forms[i].fields.splice(j, 1);
                        console.log("INFO - deleteFieldByFormAndFieldId(): \n" +
                            "       field removed. FormId: " + formId + " ; FieldId: " + fieldId);
                    }
                }
            }
        }
        console.log("WARNING - deleteFieldByFormAndFieldId() formId not found");
    }

    /**
     * Creates a new field according to the input field object.
     * Returns the new form object  / null
     * @param formId
     * @param field
     */
    function createField(formId, field) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == formId) {
                if (forms[i].fields === undefined) {
                    forms[i].fields = [field];
                }
                else {
                    forms[i].fields.push(field);
                }
                return forms[i];
            }
        }
        return null;
    }

    /**
     * @param formId
     * @param fieldId
     * @param field - a field object with new info
     * Returns: new form object / null
     */
    function updateField(formId, fieldId, field) {
        for (var i = 0; i < forms.length; ++i) {
            if (forms[i].id == formId) {
                for (var j = 0; j < forms[i].fields.length; ++j) {
                    if ((forms[i].fields)[j].id == fieldId) {
                        for (var property in field) {
                            (forms[i].fields)[j][property] = field[property];
                        }
                        return forms[i];
                    }
                }
            }
        }
        return null;
    }
};