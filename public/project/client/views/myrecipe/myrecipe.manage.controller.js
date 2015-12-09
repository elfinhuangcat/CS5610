"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("AdminRecipeManageController", AdminRecipeManageController);

    function AdminRecipeManageController($rootScope, $location, RecipeService)
    {
        // query - id: _id of the recipe to MODIFY
        var vm = this;
        vm.user = null;
        vm.recipes = [];

        vm.update = update;
        vm.remove = remove;

        function init() {
            if (isLoggedIn() && $rootScope.user.role == 'C') {
                // only 'C' users can use this feature
                vm.user = $rootScope.user;
                RecipeService
                    .findRecipesByAuthor(vm.user.email)
                    .then(function(recipes) {
                        vm.recipes = recipes;
                    });
            } else {
                $location.path("/");
            }
        }
        init();



        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }


        function update(recipeId) {
            $location.path("/myrecipe/create").search("id", recipeId);
        }

        function remove(recipeId) {
            console.log("Enter remove: " + recipeId);
            RecipeService
                .deleteRecipeById(recipeId)
                .then(function(status) {
                    console.log(status);
                    init();
                });
        }
    }
})();