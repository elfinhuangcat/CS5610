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
                .when("/recipe/:id",
                {
                    templateUrl: "views/recipe/recipe.view.html",
                    controller: "RecipeController"
                })
                .when("/browse/style",
                {
                    templateUrl: "views/browse/browse.style.view.html",
                    controller: "BrowseStyleController"
                })
                .when("/browse/style/:style",
                {
                    templateUrl: "views/browse/style/browse.some.style.view.html",
                    controller: "BrowseSomeStyleController"
                })
                .when("/browse/mealtype",
                {
                    templateUrl: "views/browse/browse.mealtype.view.html",
                    controller: "BrowseMealtypeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();