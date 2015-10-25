"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        /**
         * Each item in the array 'users' has these properties:
         * @property: id
         * @property: username
         * @property: password
         * @property: email
         * @property: firstname
         * @property: lastname
         * @type {Array}
         */
        var users = [];

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
         * @param callback: param - a user object / null
         */
        function findUserByUsernameAndPassword(username, password, callback) {
            for (var i = 0; i < users.length; ++i) {
                if (users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
        }

        /**
         *
         * @param callback: param - users array
         */
        function findAllUsers(callback) {
            callback(users);
        }

        /**
         *
         * @param user
         * @param callback: param - user object
         */
        function createUser(user, callback) {
            // user object contains username and password
            var user = angular.extend(user, {"id" : guid()});
            users.push(user);
            callback(user);
        }

        /**
         *
         * @param id
         * @param callback: param - boolean representing deletion success or not
         */
        function deleteUserById(id, callback) {
            for (var i = 0; i < users.length; ++i) {
                if (users[i].id == id) {
                    callback(true);
                    users.splice(i, 1);
                    return;
                }
            }
            callback(false);
        }

        /**
         *
         * @param id
         * @param user
         * @param callback: param - updated user object
         */
        function updateUser(id, user, callback) {
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