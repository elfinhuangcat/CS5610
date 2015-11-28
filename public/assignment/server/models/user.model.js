"use strict";
// var uuid = require('uuid');
module.exports = function(app, db, UserSchema) {
    var q = require("q");
    var UserModel = db.model("UserModel", UserSchema);
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


    /**
     *
     * @param user
     * @returns {*|promise}
     */
    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err, result) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function findAllUser() {
        console.log("MODEL - FIND ALL USERS INVOKED");
        var deferred = q.defer();

        UserModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id
     * @returns {*|promise}
     */
    function findUserById(id) {
        var deferred = q.defer();

        UserModel.findById(id, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id
     * @param user - the whole user object to be modified
     * @returns {*|promise}
     */
    function updateUser(id, user) {
        var deferred = q.defer();

        user.delete("_id");

        UserModel.findOneAndUpdate({_id: id}, {$set: user}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(id) {
        var deferred = q.defer();

        UserModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param username
     * @returns {*|promise}
     */
    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({"username": username}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param credentials
     * @returns {*|promise}
     */
    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.find(credentials,
            function(err, user){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
};