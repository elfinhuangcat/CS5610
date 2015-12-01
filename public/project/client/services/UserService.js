"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            findUserByEmailAndPassword: findUserByEmailAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        /**
         *
         * @param email
         * @param password
         */
        function findUserByEmailAndPassword(email, password) {
            var deferred = $q.defer();
            var req = "/api/assignment/user?email=" + email + "&password=" + password;
            $http.get(req)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }


        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function(users) {
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        /**
         * @param user : the new user object
         * @returns the created user object
         */
        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", user)
                .success(function(user_obj) {
                    deferred.resolve(user_obj);
                });
            return deferred.promise;
        }

        /**
         * @param id
         * @returns an array of all users after that user is removed
         */
        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + id)
                .success(function(users) {
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        /**
         *
         * @param id
         * @param user
         * @returns the updated user object
         */
        function updateUser(id, user) {
            var deferred = $q.defer();
            var req = "/api/assignment/user/" + id;
            $http.put(req, user)
                .success(function(user_obj) {
                    deferred.resolve(user_obj);
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