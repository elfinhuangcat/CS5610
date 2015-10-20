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
         * @type {Array}
         */
        var users = [];

        var service = {
            getAllCourses: getAllCourses
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
            user.id = guid();
            users.push(user);
            callback(user);
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
            for (var item in users) {
                if (item.id == id) {
                    for (var property in user) {
                        item[property] = user[property];
                    }
                    callback(item);
                    return item;
                }
            }
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