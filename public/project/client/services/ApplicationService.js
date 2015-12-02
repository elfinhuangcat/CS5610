"use strict";
(function() {
    angular
        .module("RecipesComApp")
        .factory("ApplicationService", ApplicationService);

    function ApplicationService($http, $q) {
        var service = {
            findApplicationByEmail: findApplicationByEmail,
            findAllApplications: findAllApplications,
            findApplicationById: findApplicationById,
            createApplication: createApplication,
            deleteApplicationById: deleteApplicationById,
            updateApplication: updateApplication
        };
        return service;

        /**
         *
         * @param email - user's email
         * @returns {*|promise}
         */
        function findApplicationByEmail(email) {
            var deferred = $q.defer();
            var req = "/rest/api/recipescom/application?email=" + email;
            $http.get(req)
                .success(function(application) {
                    deferred.resolve(application);
                });
            return deferred.promise;
        }

        function findAllApplications() {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/application")
                .success(function(applications) {
                    deferred.resolve(applications);
                });
            return deferred.promise;
        }

        function findApplicationById(id) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/application/" + id)
                .success(function(application) {
                    deferred.resolve(application);
                });
            return deferred.promise;
        }

        function createApplication(application) {
            var deferred = $q.defer();
            $http.post("/rest/api/recipescom/application", application)
                .success(function(newApplication) {
                    deferred.resolve(newApplication);
                });
            return deferred.promise;
        }

        function deleteApplicationById(id) {
            var deferred = $q.defer();
            $http.delete("/rest/api/recipescom/application/" + id)
                .success(function(status) {
                    deferred.resolve(status);
                });
            return deferred.promise;
        }

        function updateApplication(id, application) {
            var deferred = $q.defer();
            $http.put("/rest/api/recipescom/application/" + id, application)
                .success(function(newApplication) {
                    deferred.resolve(newApplication);
                });
            return deferred.promise;
        }
    }
})();