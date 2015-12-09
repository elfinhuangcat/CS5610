"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MyRecipeCreateController", MyRecipeCreateController);

    function MyRecipeCreateController($rootScope, $location)
    {
        var vm = this;
        vm.user = null;
        if (isLoggedIn() && $rootScope.user.role != 'A') {
            vm.user = $rootScope.user;
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
            $location.path("/");
        }


        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }
    }
})();