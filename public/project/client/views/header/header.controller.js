"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location)
    {
        $scope.$location = $location;
        var searchKey = $scope.searchKey;

        $scope.search = function() {
            console.log("Search key: " + searchKey);
            $location.path("/searchresult");
        }
    }
})();