"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        /**
         * Each item in the array 'users' has these properties:
         * @property: id
         * @property: username
         * @property: password
         * @property: email
         * @property: firstName
         * @property: lastName
         * @type {Array}
         */


        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        /**
         *
         * @param username
         * @param password
         */
        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
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
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        /**
         * @param id
         * @returns an array of all users after that user is removed
         */
        function deleteUserById(id) {
            var deferred =
        }

        /**
         *
         * @param id
         * @param user
         * @param callback: param - updated user object
         */
        function updateUser(id, user) {
            for (var i=0; i < users.length; ++i) {
                if (users[i].id == id) {
                    for (var property in user) {
                        users[i][property] = user[property];
                    }
                    callback(users[i]);
                    return;
                }
            }
            // Should not go to this line
            alert("User id: " + id + " not found!");
            callback(null);
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