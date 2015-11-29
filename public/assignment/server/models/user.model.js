"use strict";
var uuid = require('uuid');
module.exports = function(app, mongoose, UserSchema) {
    var q = require("q");
    var UserModel = mongoose.model("UserModel", UserSchema);
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
        user.id = uuid.v4();
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
     * @param id - the id created by the server. NOT the one by mongodb (_id)
     * @returns {*|promise}
     */
    function findUserById(id) {
        var deferred = q.defer();

        UserModel.findOne({"id" : id}, function(err, user){
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
     * @param id - the id created by the server. NOT the one by mongodb (_id)
     * @param user - the whole user object to be modified
     * @returns {*|promise}
     */
    function updateUser(id, user) {
        var deferred = q.defer();

        user.delete("_id");
        user.delete("id");

        UserModel.findOneAndUpdate({"id": id}, {$set: user}, function(err, newUser) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newUser);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id - the id created by the server. NOT the one by mongodb (_id)
     * @returns {*|promise}
     */
    function deleteUserById(id) {
        var deferred = q.defer();

        UserModel.remove({"id": id}, function(err, status) {
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

        UserModel.findOne({"username": username}, function(err, user){
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

        UserModel.findOne(credentials,
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