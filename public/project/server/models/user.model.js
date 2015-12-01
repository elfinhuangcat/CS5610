"use strict";
module.exports = function(app, mongoose, UserSchema) {
    var q = require("q");
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser : createUser, // arg: user
        findAllUser : findAllUser, // arg: null
        findUsersInEmailArray : findUsersInEmailArray, // arg: [{email: String}]
        findUserById : findUserById, // arg: _id
        updateUser : updateUser, // arg: _id, newUser
        deleteUserById : deleteUserById, // arg: _id
        findUserByEmail: findUserByEmail, // arg: email
        findUserByCredentials: findUserByCredentials // arg: email&password
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
                deferred.resolve(result); // should return the created user
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
     * Returns the user objects whose email addr appears in the param "arr"
     * @param arr : [{email: String}]
     * @returns {*|promise}
     */
    function findUsersInEmailArray(arr) {
        var deferred = q.defer();
        UserModel.find({$or: arr}, function (err, users) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param id - _id
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
     * @param id - _id
     * @param user - the whole user object to be modified
     * @returns {*|promise}
     */
    function updateUser(id, user) {
        var deferred = q.defer();

        delete user["_id"];

        UserModel.findOneAndUpdate({"_id": id}, {$set: user},{ 'new': true }, function(err, newUser) {
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
     * @param id - _id
     * @returns {*|promise}
     */
    function deleteUserById(id) {
        var deferred = q.defer();

        UserModel.remove({"_id": id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function findUserByEmail(email) {
        var deferred = q.defer();
        UserModel.findOne({'email': email}, function (err, user) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param credentials : {email: String, password: String}
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