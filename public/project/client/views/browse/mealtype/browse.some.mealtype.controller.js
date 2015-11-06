"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseSomeMealTypeController", BrowseSomeMealTypeController);

    function BrowseSomeMealTypeController($scope)
    {
        $scope.someMealtype = "Breakfast";
        $scope.mealtypes = [
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
                "tags":["breakfast","Indian"],
                "prepTime":30,
                "prepTimeUnit":"m",
                "servings":6,
                "author":123,
                "ingredients": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
                "steps":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            },
            {
                "id":3,
                "title": "mock_recipe_11",
                "tags":["breakfast","American"],
                "prepTime":30,
                "prepTimeUnit":"m",
                "servings":6,
                "author":123,
                "ingredients": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
                "steps":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            }
        ];

    }
})();