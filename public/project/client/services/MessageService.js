"use strict";
(function() {
    angular
        .module("RecipesComApp")
        .factory("MessageService", MessageService);

    function MessageService($http, $q) {
        var service = {
            findAllMessages: findAllMessages,
            findMessageById: findMessageById,
            findInMessageForUserByEmail: findInMessageForUserByEmail,
            findOutMessageForUserByEmail: findOutMessageForUserByEmail,
            createMessage: createMessage,
            deleteMessageById: deleteMessageById,
            //deleteMultipleMessage: deleteMultipleMessage,
            updateMessage: updateMessage
        };
        return service;

        function findAllMessages() {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/message")
                .success(function(msgs) {
                    deferred.resolve(msgs);
                });
            return deferred.promise;
        }

        function findMessageById(id) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/message/" + id)
                .success(function(msg) {
                    deferred.resolve(msg);
                });
            return deferred.promise;
        }

        function findInMessageForUserByEmail(email) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/message/"+email+"/in")
                .success(function(msgs) {
                    deferred.resolve(msgs);
                });
            return deferred.promise;
        }

        function findOutMessageForUserByEmail(email) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/message/"+email+"/sent")
                .success(function(msgs) {
                    deferred.resolve(msgs);
                });
            return deferred.promise;
        }

        function createMessage(msg) {
            var deferred = $q.defer();
            $http.post("/rest/api/recipescom/message", msg)
                .success(function(newMsg) {
                    deferred.resolve(newMsg);
                });
            return deferred.promise;
        }

        function deleteMessageById(id) {
            var deferred = $q.defer();
            $http.delete("/rest/api/recipescom/message/" + id)
                .success(function(status) {
                    deferred.resolve(status);
                });
            return deferred.promise;
        }

        /**
         * Delete multiple messages.
         * @param arr - [_id]
         * @returns {*|promise}
         */
        function deleteMultipleMessage(arr) {
            var deferred = $q.defer();
            $http.delete("/rest/api/recipescom/message", arr)
                .success(function(status) {
                    deferred.resolve(status);
                });
            return deferred.promise;
        }

        function updateMessage(id, msg) {
            var deferred = $q.defer();
            $http.put("/rest/api/recipescom/message/" + id, msg)
                .success(function(newMsg) {
                    deferred.resolve(newMsg);
                });
            return deferred.promise;
        }
    }
})();