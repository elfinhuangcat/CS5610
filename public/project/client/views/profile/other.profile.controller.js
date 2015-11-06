"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("OtherProfileController", OtherProfileController);

    function OtherProfileController($scope, $location)
    {
        $scope.$location = $location;
        $scope.username = "user_mock_1";
        $scope.email = "user@user.com";
    }
})();