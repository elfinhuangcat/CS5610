"use strict";
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
        findFormByUserId: findFormByUserId
    };
    return api;

    var forms = require('./form.mock.json');

    function createForm(form) {
        var uuid = require('uuid');
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
};