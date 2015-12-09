"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BookmarkController", BookmarkController);

    function BookmarkController($rootScope, $location, UserService, RecipeService)
    {
        var vm = this;
        vm.user = $rootScope.user;
        vm.bookmarks = []; // list of recipes bookmarked by the current user
        vm.unbookmark = unbookmark;

        function init() {
            if (!isLoggedIn() || vm.user.role == 'A') {
                $location.path("/");
            } else {
                vm.user.bookmarks.forEach(function(recipe_id) {
                    RecipeService
                        .findRecipeById(recipe_id)
                        .then(function (recipe) {
                            recipe.selected = false;
                            vm.bookmarks.push(recipe);
                        });
                });
            }
        }
        init();

        function unbookmark() {
            for (var i = 0; i < vm.bookmarks.length; ++i) {
                if (vm.bookmarks[i].selected) {
                    // remove it from user's bookmark list:
                    for (var j = 0; j < vm.user.bookmarks.length; ++j) {
                        if (vm.user.bookmarks[j] == vm.bookmarks[i]._id) {
                            vm.user.bookmarks.splice(j, 1);
                            break;
                        }
                    }
                }
            }

            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function(newUser) {
                    $rootScope.user = newUser;
                    vm.user = newUser;
                    vm.bookmarks = [];
                    init();
                });
        }


        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }
    }
})();