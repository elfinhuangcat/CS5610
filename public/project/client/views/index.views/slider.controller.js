"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("SliderController", SliderController);

    function SliderController(RecipeService)
    {
        var vm = this;
        vm.recipes = [];
        function init() {
            RecipeService
                .findRecipeById("56689255502ba10f79eb74bf")
                .then(function(recipe) {
                    vm.recipes.push(recipe);
                    RecipeService
                        .findRecipeById("5668934e502ba10f79eb74c1")
                        .then(function(recipe) {
                            vm.recipes.push(recipe);
                            RecipeService
                                .findRecipeById("566893f5502ba10f79eb74c2")
                                .then(function(recipe) {
                                    vm.recipes.push(recipe);
                                });
                        });
                });
        }
        init();
    }
})();