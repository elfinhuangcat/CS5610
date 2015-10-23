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

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var i = 0; i < users.length; ++i) {
                if (users[i].username == username && users[i].password == password) {
                    callback(true);
                    return users[i];
                }
            }
            callback(false);
            return null;
        }

        function findAllUsers(callback) {
            callback(true); // Because we don't need a callback function to fetch data now.
            return users;
        }

        function createUser(user, callback) {
            // user object contains username and password
            var user = angular.extend(user, {"id" : guid()});
            users.push(user);
            callback(user);
            return user;
        }

        function deleteUserById(id, callback) {
            for (var i = 0; i < users.length; ++i) {
                if (users[i].id == id) {
                    callback(true);
                    users.splice(i, 1);
                    break;
                }
            }
        }

        function updateUser(id, user, callback) {
            for (var i=0; i < users.length; ++i) {
                if (users[i].id == id) {
                    for (var property in user) {
                        users[i][property] = user[property];
                    }
                    callback(true);
                    return users[i];
                }
            }
            // Should not go to this line
            alert("User id: " + id + " not found!");
            callback(false);
            return null;
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