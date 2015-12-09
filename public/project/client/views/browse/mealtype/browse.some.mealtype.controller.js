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
        vm.page = $routeParams["page"]; // start from 1
        vm.itemsPerPage = 6; // the number of recipes to show per page
        vm.showPrev = true; // activate the "Prev" button ?
        vm.showNext = true; // activate the "Next" button ?
        vm.recipes = []; // the recipes to show on this page.

        function init() {
            var numOfRecipesOfMealtype = 0;
            RecipeService
                .getRecipesCountByMealtype(vm.mealtype)
                .then(function (count) {
                    numOfRecipesOfMealtype = count;
                    var numOfPages = Math.ceil(count / vm.itemsPerPage);
                    // console.log("Number of pages (browse by meal types): " + numOfPages);
                    if (vm.page < 1 || vm.page > numOfPages) {
                        vm.page = 1;
                        $location.path("/browse/mealtype/"+vm.mealtype +"/1");
                    } else {
                        if (vm.page == 1) {
                            vm.showPrev = false;
                        }
                        if (vm.page == numOfPages) {
                            vm.showNext = false;
                        }
                        RecipeService
                            .findRecipesByMealtype(vm.mealtype)
                            .then(function(recipes) {
                                // show the recipes in current page:
                                var start = (vm.page - 1) * vm.itemsPerPage;
                                var end = vm.page * (vm.itemsPerPage + 1);
                                if (vm.page * (vm.itemsPerPage + 1) > recipes.length) {
                                    end = recipes.length;
                                }
                                vm.recipes = recipes.slice(start, end);
                            });
                    }
                });
        }
        init();
    }
})();