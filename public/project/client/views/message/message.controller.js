"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageController", MessageController);

    function MessageController($scope, $location)
    {
        $scope.$location = $location
        $scope.sent =
        [
            {
                "id":1,
                "from":123,
                "to":124,
                "subject":"Message Subject",
                "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            },
            {
                "id":3,
                "from":123,
                "to":124,
                "subject":"Message Subject",
                "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
            }
        ];
        $scope.received = [
            {
            "id":3,
            "from":124,
            "to":123,
            "subject":"Message Subject",
            "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."}
        ];
    }
})();