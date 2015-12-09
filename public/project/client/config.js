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
                    controller: "BookmarkController as bookmarkController"
                })
                .when("/recipe/:id",
                {
                    templateUrl: "views/recipe/recipe.view.html",
                    controller: "RecipeController as recipeController"
                })
                .when("/browse/style",
                {
                    templateUrl: "views/browse/browse.style.view.html",
                    controller: "BrowseStyleController as browseStyleController"
                })
                .when("/browse/style/:style/:page",
                {
                    templateUrl: "views/browse/style/browse.some.style.view.html",
                    controller: "BrowseSomeStyleController as someStyleController"
                })
                .when("/browse/style/:style",
                {
                    redirectTo: "/browse/style/:style/1"
                })
                .when("/browse/mealtype",
                {
                    templateUrl: "views/browse/browse.mealtype.view.html",
                    controller: "BrowseMealtypeController as browseMealtypeController"
                })
                .when("/browse/mealtype/:mealtype/:page",
                {
                    templateUrl: "views/browse/mealtype/browse.some.mealtype.view.html",
                    controller: "BrowseSomeMealTypeController as someMealTypeController"
                })
                .when("/browse/mealtype/:mealtype",
                {
                    redirectTo: "/browse/mealtype/:mealtype/1"
                })
                .when("/message/compose",
                {
                    // query 1: "to" : receiver's email addr
                    // query 2: "subject" : the subject of message
                    templateUrl: "views/message/message.compose.view.html",
                    controller: "MessageComposeController as msgController"
                })
                .when("/message/inbox",
                {
                    templateUrl: "views/message/message.inbox.view.html",
                    controller: "MessageInboxController as msgController"
                })
                .when("/message/sentbox",
                {
                    templateUrl: "views/message/message.sentbox.view.html",
                    controller: "MessageSentboxController as msgController"
                })
                .when("/message/read/:id",
                {
                    templateUrl: "views/message/message.read.view.html",
                    controller: "MessageReadController as msgController"
                })
                .when("/message",
                {
                    redirectTo: "/message/compose"
                })
                .when("/myrecipe/create",
                {
                    // query 1: "id" : recipe _id to modify
                    templateUrl: "views/myrecipe/myrecipe.create.view.html",
                    controller: "MyRecipeCreateController as myRecipeController"
                })
                .when("/myrecipe/manage",
                {
                    templateUrl: "views/myrecipe/myrecipe.manage.view.html",
                    controller: "MyRecipeManageController as myRecipeController"
                })
                .when("/friend",
                {
                    templateUrl: "views/friend/friend.view.html",
                    controller: "FriendController as friendController"
                })
                .when("/admin/userlist",
                {
                    templateUrl: "views/admin/userList/user.list.view.html",
                    controller: "UserListController as userlistController"
                })
                .when("/admin/contapp",
                {
                    templateUrl: "views/admin/contApp/contributor.app.view.html",
                    controller: "ContAppController as appController"
                })
                .when("/admin/recipe/create",
                {
                    // query 1: "id" : recipe _id to modify
                    templateUrl: "views/admin/recipe/admin.recipe.create.html",
                    controller: "AdminRecipeCreateController as recipeController"
                })
                .when("/admin/recipe/manage",
                {
                    templateUrl: "views/admin/recipe/admin.recipe.manage.html",
                    controller: "AdminRecipeManageController as recipeController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();