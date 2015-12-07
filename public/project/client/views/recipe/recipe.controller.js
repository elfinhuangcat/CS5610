"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(RecipeService, $routeParams, $location)
    {
        // For now, the image is not implemented and all show the same image.
        var vm = this;
        vm.recipe = null;

        function init() {
            RecipeService
                .findRecipeById($routeParams["id"])
                .then(function(result) {
                    if (result == null) {
                        $location.path("/");
                    } else {
                        vm.recipe = result;
                    }
                });
        }
        init();
    }
})();