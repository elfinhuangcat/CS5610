"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    function FormService($q, $http) {
        /**
         * Each item in the array 'forms' has these properties:
         * @property: id
         * @property: userid
         * And other properties (since a form shape can change.)
         * @type {Array}
         */

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        /**
         * @param userid
         * @param form
         * @returns the new form object
         */
        function createFormForUser(userid, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userid + "/form", form)
                .success(function(form_obj) {
                    deferred.resolve(form_obj);
                });
            return deferred.promise;
        }

        /**
         * @param userid
         * @returns an array of forms belonging to this user
         */
        function findAllFormsForUser(userid) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userid + "/form")
                .success(function(forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        /**
         * @param formid
         * @effect delete the form
         */
        function deleteFormById(formid) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formid)
                .success(function() {
                    deferred.resolve();
                    console.log("INFO - [client] deleteFormById - form " + formid + " deleted.");
                });
            return deferred.promise;
        }

        /**
         *
         * @param formid
         * @param newForm
         */
        function updateFormById(formid, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formid, newForm)
                .success(function(form_obj) {
                    deferred.resolve(form_obj);
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