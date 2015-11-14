"use strict";
var uuid = require('uuid');
// var q = require("q");
module.exports = function(app, db) {

    var api = {
        // Create - should accept an instance object, add it to a corresponding collection, and return the collection
        createUser : createUser,
        // FindAll - should take no arguments, and return the corresponding collection
        findAllUser : findAllUser,
        // FindById - should take an ID as an argument, find an instance object in the corresponding collection whose ID property is equal to the ID argument, return the instance found, null otherwise
        findUserById : findUserById,
        // Update - should take an ID and object instance as arguments, find the object instance in the corresponding collection whose ID property is equal to the ID argument, update the found instance with property values in the argument instance object
        updateUser : updateUser,
        // Delete - should accept an ID as an argument, remove the instance object from the corresponding collection whose ID property s equal to the ID argument
        deleteUserById : deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    var users = require('./user.mock.json');

    /**
     *
     * @param user
     * @returns a list of all users
     */
    function createUser(user) {
        user.id = uuid.v4();
        users.push(user);
        return users;
    }

    function findAllUser() {
        return users;
    }

    /**
     * @param id
     */
    function findUserById(id) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == id) {
                return users[i]; //user found
            }
        }
        return null; //User not found
    }

    /**
     *
     * @param id
     * @param user: Update the found user instance with the properties in this object
     */
    function updateUser(id, user) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == id) {
                for (var property in user) {
                    users[i][property] = user[property];
                }
            }
        }
        console.log("WARNING - updateUser() user id not found")
    }

    function deleteUserById(id) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == id) {
                users.splice(i,1);
            }
        }
        console.log("WARNING - deleteUserById() - user id not found");
    }

    /**
     * Returns a found user instance, or null if the user is not found
     * @param username
     */
    function findUserByUsername(username) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].username == username) {
                return users[i];
            }
        }
        return null; // user not found
    }

    /**
     *
     * @param credentials : "username" and "password"
     */
    function findUserByCredentials(credentials) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].username == credentials.username &&
                users[i].password == credentials.password) {
                return users[i];
            }
        }
        return null; //user not found
    }
};