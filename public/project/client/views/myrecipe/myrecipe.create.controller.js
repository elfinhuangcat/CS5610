"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MyRecipeCreateController", MyRecipeCreateController);

    function MyRecipeCreateController($rootScope, $location, $routeParams, RecipeService)
    {
        // query - id: _id of the recipe to MODIFY
        var vm = this;
        vm.user = null;
        vm.newRecipe = null;
        vm.unitOptions = ["hour(s)", "minute(s)", "second(s)"];
        vm.unitValue = vm.unitOptions[0];

        function init() {
            if (isLoggedIn() && $rootScope.user.role != 'A') {
                // only 'R' and 'C' users can use this feature
                vm.user = $rootScope.user;
                if ($routeParams["id"] == undefined || $routeParams["id"] == null) {
                    vm.newRecipe = {
                        "title"      : "", // recipe's title
                        "author"     : vm.user.email, // recipe's author EMAIL
                        // "img"        : { data: Buffer, contentType: String }, // food image
                        "style"      : [], // can have many styles
                        "mealtype"   : [], // can belong to many meal types
                        "time"       : 1, // Preparation time
                        "unit"       : 'H', // Preparation time unit
                        "ingredients": "",
                        "steps"      : ""
                    }
                } else {
                    RecipeService
                        .findRecipeById($routeParams["id"])
                        .then(function(recipe) {
                            vm.newRecipe = recipe;
                        });
                }
            } else {
                $location.path("/");
            }
        }
        init();



        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }
    }
})();