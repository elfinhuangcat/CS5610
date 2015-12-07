"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            findUserByEmailAndPassword: findUserByEmailAndPassword,
            findUserByEmail: findUserByEmail,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            //findMultipleUsersFromEmailArray: findMultipleUsersFromEmailArray,
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
            var req = "/rest/api/recipescom/user?email=" + email + "&password=" + password;
            $http.get(req)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function findUserByEmail(email) {
            var deferred = $q.defer();
            var req = "/rest/api/recipescom/user?email=" + email;
            $http.get(req)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }


        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/user")
                .success(function(users) {
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/user/" + id)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        /**
         *
         * @param arr - [String] (email)
         * @returns {*|promise}

        function findMultipleUsersFromEmailArray(arr) {
            var deferred = $q.defer();
            var newArr = [];
            for (var ind in arr) {
                newArr.push({"email" : arr[ind]});
            }
            $http.get("/rest/api/recipescom/user/multiple", newArr)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }
         */

        /**
         * @param user - the new user object
         * @returns the created user object
         */
        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/rest/api/recipescom/user", user)
                .success(function(user_obj) {
                    deferred.resolve(user_obj);
                });
            return deferred.promise;
        }

        /**
         * @param id
         * @returns status
         */
        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete("/rest/api/recipescom/user/" + id)
                .success(function(status) {
                    deferred.resolve(status);
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
            var req = "/rest/api/recipescom/user/" + id;
            $http.put(req, user)
                .success(function(user_obj) {
                    deferred.resolve(user_obj);
                });
            return deferred.promise;
        }
    }
})();