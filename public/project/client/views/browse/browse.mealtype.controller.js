"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseMealtypeController", BrowseMealtypeController);

    function BrowseMealtypeController($scope)
    {
        var vm = this;
        vm.AllMealType = [
        'barbecue',
        'box lunch',
        'breakfast',
        'brunch',
        'dinner',
        'high tea',
        'lunch',
        'nosh',
        'picnic',
        'snack',
        'supper',
        'other'
    ];

    }
})();