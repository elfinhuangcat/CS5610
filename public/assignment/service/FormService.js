"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    function FormService() {
        /**
         * Each item in the array 'forms' has these properties:
         * @property: id
         * @property: userid
         * And other properties (since a form shape can change.)
         * @type {Array}
         */
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userid, form, callback) {
            form.id = guid();
            form.userid = userid;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userid, callback) {
            var resultForms = [];
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].userid == userid) {
                    resultForms.push(forms[i]);
                }
            }
            callback(resultForms);
            return resultForms;
        }

        function deleteFormById(formid, callback) {
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].id == formid) {
                    console.log("Form deleted. ID: " + formid);
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formid, newForm, callback) {
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].id == formid) {
                    for (var property in newForm) {
                        forms[i][property] = newForm[property];
                    }
                    callback(forms[i]);
                    break;
                }
            }
        }

        /** Function to generate Guid, from instructor Jose Annunziato.**/
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();