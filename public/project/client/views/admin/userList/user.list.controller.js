"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("UserListController", UserListController);

    function UserListController($scope, $location)
    {
        $scope.$location = $location;
        $scope.users = [
            {
                "id": 123,
                "username": "mock_user",
                "email": "mock@mock.com",
                "password": 1234,
                "bookmark":[1,2],
                "friend":[124],
                "role":"r"
            },
            {
                "id": 124,
                "username": "mock_user2",
                "email": "mock@mock.com",
                "password": 1234,
                "bookmark":[1,2],
                "friend":[123],
                "role":"c"
            },
            {
                "id": 0,
                "username":"admin",
                "email":"admin@admin.com",
                "password":"abc",
                "role":"a"
            }
    ];
    }
})();