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
            var user;
            for (user in users) {
                if (user.username == username & user.password == password) {
                    callback("User found.");
                    return user;
                }
            }
            callback("User not found.");
            return null;
        }

        function findAllUsers(callback) {
            callback("All users found"); // Because we don't need a callback function to fetch data now.
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
                    console.log("User found. Delete user: " + users[i].id);
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(id, user, callback) {
            console.log("Debug updateUser() : input id - " + id);
            console.log("                   : users.length - " + users.length);
            for (var i=0; i < users.length; ++i) {
                console.log("Debug updateUser() : loop item id - " + i);
                if (users[i].id == id) {
                    for (var property in user) {
                        users[i][property] = user[property];
                    }
                    callback(users[i]);
                    return users[i];
                }
            }
            alert("User id: " + id + " not found!");
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