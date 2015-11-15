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
                    templateUrl: "views/home/home.view.html",
                })
                .when("/home",
                {
                    templateUrl: "views/home/home.view.html",
                })
                .when("/register",
                {
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login",
                {
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",
                {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/form",
                {
                    templateUrl: "views/form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();