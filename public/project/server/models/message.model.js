"use strict";
module.exports = function(app, mongoose, MessageSchema) {
    var q = require("q");
    var MessageModel = mongoose.model("MessageModel", MessageSchema);
    var api = {
        createMessage : createMessage, // arg: message
        findAllMessage : findAllMessage, // arg: null
        findMessageById : findMessageById, // arg: _id
        findInMessageByUserEmail   : findInMessageByUserEmail, // arg: userEmail
        findSentMessageByUserEmail : findSentMessageByUserEmail, // arg: userEmail
        updateMessage : updateMessage, // arg: _id, newMsg
        deleteMessageById : deleteMessageById, // arg: _id
        deleteMultipleMessageByIds : deleteMultipleMessageByIds // arg: arr of ids
    };
    return api;


    /**
     *
     * @param msg
     * @returns {*|promise}
     */
    function createMessage(msg) {
        var deferred = q.defer();
        MessageModel.create(msg, function(err, result) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result); // should return the created user
            }
        });
        return deferred.promise;
    }

    function findAllMessage() {
        var deferred = q.defer();

        MessageModel.find(function(err, msgs){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(msgs);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @returns {*|promise}
     */
    function findMessageById(id) {
        var deferred = q.defer();

        MessageModel.findById(id, function(err, msg){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(msg);
            }
        });

        return deferred.promise;
    }

    function findInMessageByUserEmail(userEmail) {
        var deferred = q.defer();
        MessageModel.find({"to": userEmail}, function(err, msgs) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(msgs);
            }
        });
        return deferred.promise;
    }

    function findSentMessageByUserEmail(userEmail) {
        var deferred = q.defer();
        MessageModel.find({"from": userEmail}, function(err, msgs) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(msgs);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @param msg - the whole message object to be modified
     * @returns {*|promise}
     */
    function updateMessage(id, msg) {
        var deferred = q.defer();

        delete msg["_id"];

        MessageModel.findOneAndUpdate({"_id": id}, {$set: msg},{ 'new': true }, function(err, newMsg) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newMsg);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @returns {*|promise}
     */
    function deleteMessageById(id) {
        var deferred = q.defer();

        MessageModel.remove({"_id": id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function deleteMultipleMessageByIds(arr) {
        var deferred = q.defer();
        MessageModel.remove({"_id" : {$in : arr}}, function(err, status) {
            if (err) {
                console.log("ERROR: delete multiple message by ids: ");
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};