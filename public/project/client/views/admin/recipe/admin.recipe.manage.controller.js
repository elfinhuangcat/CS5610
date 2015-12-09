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
            if (isAdmin()) {
                vm.user = $rootScope.user;
                RecipeService
                    .findAllRecipes()
                    .then(function(recipes) {
                        vm.recipes = recipes;
                    });
            } else {
                $location.path("/");
            }
        }
        init();



        function isAdmin() {
            if ($rootScope.user != null || $rootScope.user != undefined) {
                return $rootScope.user.role == 'A';
            } else {
                return false;
            }
        }


        function update(recipeId) {
            $location.path("/admin/recipe/create").search("id", recipeId);
        }

        function remove(recipeId) {
            RecipeService
                .deleteRecipeById(recipeId)
                .then(function(status) {
                    console.log(status);
                    init();
                });
        }

    }
})();