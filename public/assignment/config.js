"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                {
                    templateUrl: "index.html",
                    controller: "courseList.controller"
                })
                .when("/index",
                {
                    templateUrl: "index.html",
                    controller: "courseOverview.controller"
                })
                .when("/register",
                {
                    templateUrl: "register.html",
                    controller: "courseOverview.controller"
                })
                .when("/login",
                {
                    templateUrl: "login/login.view.html",
                    controller: "courseOverview.controller"
                })
        });
})();