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
                    controller: "RegisterController as registerController"
                })
                .when("/login",
                {
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController as loginController"
                })
                .when("/profile/:id",
                {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController as profileController"
                })
                .when("/profile/:id/applycontributor",
                {
                    templateUrl: "views/apply.contributor/apply.contributor.html",
                    controller: "ApplyContributorController as applyContributorController"
                })
                .when("/bookmark",
                {
                    templateUrl: "views/bookmark/bookmark.view.html",
                    controller: "BookmarkController"
                })
                /*
                .when("/recipe",
                {
                    templateUrl: "views/recipe/recipe.view.html",
                    controller: "RecipeController"
                })
                */
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
                .when("/browse/mealtype/:mealtype",
                {
                    templateUrl: "views/browse/mealtype/browse.some.mealtype.view.html",
                    controller: "BrowseSomeMealTypeController"
                })
                .when("/message",
                {
                    templateUrl: "views/message/message.view.html",
                    controller: "MessageController"
                })
                .when("/myrecipe",
                {
                    templateUrl: "views/myrecipe/myrecipe.view.html",
                    controller: "MyRecipeController"
                })
                .when("/friend",
                {
                    templateUrl: "views/friend/friend.view.html",
                    controller: "FriendController"
                })
                .when("/searchresult",
                {
                    templateUrl: "views/search/search.result.view.html",
                    controller: "SearchResultController"
                })
                .when("/admin/userlist",
                {
                    templateUrl: "views/admin/userList/user.list.view.html",
                    controller: "UserListController"
                })
                .when("/admin/contapp",
                {
                    templateUrl: "views/admin/contApp/contributor.app.view.html",
                    controller: "ContAppController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();