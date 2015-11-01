"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($scope, $rootScope, apiService) {
        $scope.response = apiService.getSearchResults();
    }
})();