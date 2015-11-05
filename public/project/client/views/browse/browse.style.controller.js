"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseStyleController", BrowseStyleController);

    function BrowseStyleController($scope)
    {
        $scope.styles = [
            "American",
            "British",
            "Chinese",
            "Indian",
            "Japanese",
            "Korean",
            "Mediterranean",
            "Mexican"
        ];

    }
})();