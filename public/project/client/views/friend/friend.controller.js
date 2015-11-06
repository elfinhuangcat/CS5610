"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .controller("FriendController", FriendController);

    function FriendController($scope, $location) {
        $scope.searchKey = "Steak";

        $scope.friends = [
            {
                "id": 123,
                "username": "mock_user",
                "email": "mock@mock.com",
                "password": 1234,
                "bookmark":[1,2],
                "friend":[124]
            },
            {
                "id": 124,
                "username": "mock_user2",
                "email": "mock2@mock.com",
                "password": 1234,
                "bookmark":[1,2],
                "friend":[123]
            }
        ];

        $scope.sendMessage = function() {
            console.log("Send message clicked.");
            $location.path('/message');
        }
    }
})();