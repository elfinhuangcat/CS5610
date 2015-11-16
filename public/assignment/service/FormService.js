"use strict";
(function() {
    angular
        .module("FormBuilderAppOld")
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

        /**
         *
         * @param userid
         * @param form
         * @param callback: param - the form object created.
         */
        function createFormForUser(userid, form, callback) {
            form.id = guid();
            form.userid = userid;
            forms.push(form);
            callback(form);
        }

        /**
         *
         * @param userid
         * @param callback: param - an array of forms belonged to the input user
         */
        function findAllFormsForUser(userid, callback) {
            var resultForms = [];
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].userid == userid) {
                    resultForms.push(forms[i]);
                }
            }
            callback(resultForms);
        }

        /**
         *
         * @param formid
         * @param callback: param - the deleted form object or null
         */
        function deleteFormById(formid, callback) {
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].id == formid) {
                    forms.splice(i, 1);
                    callback(forms[i]);
                    return;
                }
            }
            callback(null);
        }

        /**
         *
         * @param formid
         * @param newForm
         * @param callback: param - the updated form object
         */
        function updateFormById(formid, newForm, callback) {
            for (var i = 0; i < forms.length; ++i) {
                if (forms[i].id == formid) {
                    for (var property in newForm) {
                        forms[i][property] = newForm[property];
                    }
                    callback(forms[i]);
                    return;
                }
            }
            callback(null); // form not found
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