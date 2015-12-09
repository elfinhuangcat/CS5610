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
        vm.recipesToShow = [];
        function init() {
        }
        init();
    }
})();