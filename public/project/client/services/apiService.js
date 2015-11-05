"use strict";
function ApiService($http) {
    this.$http = $http;
    this.url = "/search/q=chicken&app_id=62a21584&app_key=a767290778e5f662f48917a81c7f6f9d";
};

angular.module("RecipesComApp").service('apiService', ApiService);
ApiService.prototype.getSearchResults = function() {
    // Return promise for controller to use.
    return this.$http.get(this.url);
};