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
                    templateUrl: "home/home.view.html",
                })
                .when("/home",
                {
                    templateUrl: "home/home.view.html",
                })
                .when("/register",
                {
                    templateUrl: "register/register.html",
                    controller: "RegisterController"
                })
                .when("/login",
                {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();