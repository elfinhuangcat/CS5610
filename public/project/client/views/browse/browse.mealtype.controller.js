"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseMealtypeController", BrowseMealtypeController);

    function BrowseMealtypeController($scope)
    {
        $scope.mealtypes = [
            "Breakfast",
            "Dessert",
            "Entree",
            "Fastfood",
            "Lunch",
            "Appetizer/Starter"
        ];

    }
})();