"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location)
    {
        $scope.$location = $location;
    }
})();