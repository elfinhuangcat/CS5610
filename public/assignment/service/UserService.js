"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];

        var service = {
            getAllCourses: getAllCourses
        };
        return service;

        function findUserByUsernameAndPassword(username, password, function(){}) {

        }
    }
})();