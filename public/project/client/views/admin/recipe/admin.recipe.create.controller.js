"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("AdminRecipeCreateController", AdminRecipeCreateController);

    function AdminRecipeCreateController($rootScope, $location, $routeParams, RecipeService)
    {
        // query - id: _id of the recipe to MODIFY
        var vm = this;
        vm.user = null;
        vm.newRecipe = null;
        vm.createMode = true;

        vm.create = create;
        vm.update = update;

        function init() {
            if (isAdmin()) {
                // only 'C' users can use this feature
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
                    // UPDATE MODE
                    RecipeService
                        .findRecipeById($routeParams["id"])
                        .then(function(recipe) {
                            vm.newRecipe = recipe;
                            vm.createMode = false;
                        });
                }
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

        function create() {
            console.log(vm.newRecipe);
            RecipeService
                .createRecipe(vm.newRecipe)
                .then(function(recipe) {
                    if (recipe != null) {
                        $location.path("/recipe/" + recipe._id); // jump to new recipe detail page.
                    } else {
                        vm.cannotCreateRecipe = true;
                    }
                });
        }

        function update() {
            RecipeService
                .updateRecipe(vm.newRecipe._id, vm.newRecipe)
                .then(function(newRecipe) {
                    if (newRecipe != null) {
                        $location.path("/recipe/" + newRecipe._id); // jump to new recipe detail page.
                    } else {
                        vm.cannotCreateRecipe = true;
                    }
                })
        }

        // definition for constants:
        vm.unitOptions = ["hour(s)", "minute(s)", "second(s)"];
        vm.styles = [
            'American',
            'British',
            'Cajun',
            'Caribbean',
            'Chinese',
            'French',
            'German',
            'Greek',
            'Indian',
            'Italian',
            'Japanese',
            'Korean',
            'Lebanese',
            'Mediterranean',
            'Mexican',
            'Moroccan',
            'Soul',
            'Spanish',
            'Thai',
            'Turkish',
            'Vietnamese',
            'Mixed',
            'Other'
        ];

        vm.mealtypes = [
            'barbecue',
            'box lunch',
            'breakfast',
            'brunch',
            'dinner',
            'high tea',
            'lunch',
            'nosh',
            'picnic',
            'snack',
            'supper',
            'other'
        ];
    }
})();