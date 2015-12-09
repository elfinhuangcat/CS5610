"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseSomeStyleController", BrowseSomeStyleController);

    function BrowseSomeStyleController($routeParams, $location, RecipeService)
    {
        var vm = this;
        vm.style = $routeParams["style"];
        vm.page = $routeParams["page"]; // start from 1
        vm.itemsPerPage = 6; // the number of recipes to show per page
        vm.showPrev = true; // activate the "Prev" button ?
        vm.showNext = true; // activate the "Next" button ?
        vm.recipes = []; // the recipes to show on this page.

        function init() {
            var numOfRecipesOfStyle = 0;
            RecipeService
                .getRecipesCountByStyle(vm.style)
                .then(function (count) {
                    numOfRecipesOfStyle = count;
                    var numOfPages = Math.ceil(count / vm.itemsPerPage);
                    if (vm.page < 1 || vm.page > numOfPages) {
                        vm.page = 1;
                        $location.path("/browse/style/"+vm.style +"/1");
                    } else {
                        if (vm.page == 1) {
                            vm.showPrev = false;
                        }
                        if (vm.page == numOfPages) {
                            vm.showNext = false;
                        }
                        RecipeService
                            .findRecipesByStyle(vm.style)
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