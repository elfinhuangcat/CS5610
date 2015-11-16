"use strict";
(function()
{
    angular
        .module("FormBuilderAppOld")
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
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login",
                {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",
                {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/form",
                {
                    templateUrl: "form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();