"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);
    function FieldService($q, $http) {

        var service = {
            // create a new field for form whose id is formId
            createFieldForForm: createFieldForForm,

            // retrieve fields belonging to a form object whose id is equal to the formId
            getFieldsForForm: getFieldsForForm,

            // retrieve a field object whose id is equal to the fieldId and belonging to a
            // form object whose id is equal to the formId.
            getFieldForForm: getFieldForForm,

            // remove a field object whose id is equal to the fieldId and belonging to
            // a form object whose id is equal to the formId
            deleteFieldFromForm: deleteFieldFromForm,

            // update a field object whose id is equal to the fieldId and belonging to a form
            // object whose id is equal to the formId so that its properties are the same as
            // the property values of the field object parameter
            updateField: updateField
        };
        return service;

        /**
         * @param formId
         * @param field - new field information
         * @returns the new form object (related to formId)
         */
        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/" + formId + "/field", field)
                .success(function(form_obj) {
                    deferred.resolve(form_obj);
                });
            return deferred.promise;
        }

        /**
         * @param formId
         * @returns an array of fields belonging to this form
         */
        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId +"/field")
                .success(function(fields) {
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }

        /**
         * @param formId
         * @param fieldId
         * @returns {the wanted field object|promise}
         */
        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(field) {
                    deferred.resolve(field);
                });
            return deferred.promise;
        }

        /**
         * @param formId
         * @param fieldId
         * @returns {none|promise}
         */
        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function() {
                    deferred.resolve();
                    console.log("INFO - [client] deleteFieldFromForm: field " + fieldId +
                        " deleted from form" + formId);
                });
            return deferred.promise;
        }

        /**
         *
         * @param formId
         * @param fieldId
         * @param field
         * @returns {the new form object|promise}
         */
        function updateField(formId, fieldId, field){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field)
                .success(function(form) {
                    deferred.resolve(form);
                });
            return deferred.promise;
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