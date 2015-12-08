"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("BrowseStyleController", BrowseStyleController);

    function BrowseStyleController()
    {
        var vm = this;
        vm.AllStyles = [
            'American',
            'British',
            'Cajun',
            'Caribbean',
            'Chinese',
            'French',
            'German',
            'Greek',
            'Indian',
            'Italian',
            'Japanese',
            'Korean',
            'Lebanese',
            'Mediterranean',
            'Mexican',
            'Moroccan',
            'Soul',
            'Spanish',
            'Thai',
            'Turkish',
            'Vietnamese',
            'Mixed',
            'Other'
        ];
    }
})();