"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                {
                    templateUrl: "views/index.views/index.view.html",
                })
                .when("/register",
                {
                    templateUrl: "views/register/register.view.html",
                    //controller: "RegisterController"
                })
                .when("/login",
                {
                    templateUrl: "views/login/login.view.html",
                    //controller: "LoginController"
                })
                .when("/profile",
                {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/bookmark",
                {
                    templateUrl: "views/bookmark/bookmark.view.html",
                    controller: "BookmarkController"
                })
                .when("/recipe",
                {
                    templateUrl: "views/recipe/recipe.view.html",
                    controller: "RecipeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();