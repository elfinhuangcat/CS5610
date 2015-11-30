"use strict";
var uuid = require('uuid');
module.exports = function(app, mongoose, FormSchema) {
    var q = require("q");
    var FormModel = mongoose.model("FormModel", FormSchema);
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

    /**
     * @param form
     * @returns {*|promise}
     */
    function createForm(form) {
        var deferred = q.defer();
        form.id = uuid.v4();
        FormModel.create(form, function(err, result) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findAllForm() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param id - the id created by the server. NOT the one by the mongodb "_id".
     * @returns {*|promise}
     */
    function findFormById(id) {
        var deferred = q.defer();

        FormModel.findOne({"id" : id}, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param id - the id created by the server. NOT the one by the mongodb "_id".
     * @param form
     * @returns {*|promise}
     */
    function updateForm(id, form) {
        var deferred = q.defer();
        delete form["_id"];
        delete form["id"];

        FormModel.findOneAndUpdate({"id": id}, {$set: form},  { 'new': true }, function(err, newForm) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newForm);
            }
        });

        return deferred.promise;
    }

    /**
     * @param id - the id created by the server. NOT the one by the mongodb "_id".
     * @returns {*|promise}
     */
    function deleteFormById(id) {
        var deferred = q.defer();
        FormModel.remove({"id": id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    /**
     * Find one single form by title
     * @param title
     * @returns {*|promise}
     */
    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({"title": title}, function(err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    /**
     * Returns an array of forms which belong to the user specified by the given userId
     * @param userId
     * @returns {*|promise}
     */
    function findFormByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({"userId": userId}, function(err, forms) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    /**
     * Returns an array of fields by formId
     * @param formId
     * @returns {*|promise}
     */
    function findFieldByFormId(formId) {
        var deferred = q.defer();
        FormModel.findOne({"id": formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    /**
     * Finds the field by formId and fieldId
     * @param formId
     * @param fieldId
     * @returns {*|promise}
     */
    function findOneFieldByFormAndFieldId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({"id": formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var i in form.fields) {
                    if (form.fields[i].id == fieldId) {
                        deferred.resolve(form.fields[i]);
                        break;
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFieldByFormAndFieldId(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findOne({"id" : formId}, function(err, form){
            if (err) {
                deferred.reject(err);
            } else {
                // look for the index of the field to remove:
                var ind;
                var flag = false;
                for (ind = 0; ind < form.fields.length; ++ind) {
                    if (form.fields.id == fieldId) {
                        flag = true;
                        form.fields.splice(ind, 1);
                        form.save(function (err, form) {
                            deferred.resolve(form);
                        });
                    }
                }
                if (!flag) {
                    deferred.reject({"Error": "Cannot find the fieldId in the form."});
                }
            }
        });
        return deferred.promise;
    }

    /**
     * Creates a new field according to the input field object.
     * Returns the new form object  / null
     * @param formId
     * @param field
     */
    function createField(formId, field) {
        var deferred = q.defer();
        field.id = uuid.v4(); // id gen
        FormModel.findOne({"id": formId}, function(err, form){
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("Form " + formId + " found. New field ID: " + field.id);
                form.fields.push(field);
                console.log("Form's new field pushed. " + form.fields.length);
                form.save(function(err, form){
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    } else {
                        console.log("new form object: " + form);
                        deferred.resolve(form);
                    }
                });
            }
        });

        return deferred.promise;
    }

    /**
     * @param formId
     * @param fieldId
     * @param field - a field object with new info
     * Returns: new form object / null
     */
    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        delete field["id"];

        // TODO: CHECK IF UPDATE REALLY RETURNS THE NEW FORM OBJECT
        FormModel.findOne({"id": formId}, function(err, form){
            if (err) {
                deferred.reject(err);
            }
            else {
                var flag = false;
                for (var ind = 0; ind < form.fields.length; ++ind) {
                    if (form.fields[ind].id == fieldId) {
                        flag = true;
                        for (var property in field) {
                            form.fields[ind][property] = field[property];
                        }
                        form.save(function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form);
                            }
                        });
                    }
                }
                if (!flag) {
                    deferred.reject({"Error" : "The fieldId given is not found in the form."});
                }
            }
        });

        return deferred.promise;
    }
};