"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($scope) {
        $scope.searchKey = "Steak";
        $scope.resultRecipes = [
            {
                "id":1,
                "title": "mock_recipe_1",
                "tags":["breakfast","American"],
                "prepTime":30,
                "prepTimeUnit":"m",
                "servings":6,
                "author":123,
                "ingredients": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
                "steps":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            },
            {
                "id":2,
                "title": "mock_recipe_2",
                "tags":["Entree","Indian"],
                "prepTime":3,
                "prepTimeUnit":"h",
                "servings":6,
                "author":123,
                "ingredients": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
                "steps":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            }
        ];

        $scope.resultPeople = [
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
    }
})();