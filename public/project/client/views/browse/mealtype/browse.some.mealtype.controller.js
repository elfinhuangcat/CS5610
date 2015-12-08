"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseSomeMealTypeController", BrowseSomeMealTypeController);

    function BrowseSomeMealTypeController($routeParams, $location, RecipeService)
    {
        var vm = this;
        vm.mealtype = $routeParams["mealtype"];
        vm.page = $routeParams["page"];
        vm.itemsPerPage = 9;
        vm.showPrev = true;
        vm.showNext = true;
        vm.recipes = null;

        function init() {
            var numOfRecipesOfMealtype = 0;
            RecipeService
                .getRecipesCountByMealtype(vm.mealtype)
                .then(function (count) {
                    numOfRecipesOfMealtype = count;
                    var numOfPages = Math.ceil(count / vm.itemsPerPage);
                    console.log("Number of pages (browse by meal types): " + numOfPages);
                    if (vm.page < 1 || vm.page > numOfPages) {
                        $location.path("/browse/mealtype/"+vm.mealtype +"/1");
                    } else {
                        if (vm.page == 1) {
                            vm.showPrev = false;
                        }
                        if (vm.page == numOfPages) {
                            vm.showNext == false;
                        }
                        RecipeService
                            .findRecipesByMealtype(vm.mealtype)
                            .then(function(recipes) {
                                vm.recipes = recipes;
                            });
                    }
                });
        }
        init();
    }
})();