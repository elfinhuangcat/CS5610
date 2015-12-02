"use strict";
(function() {
    angular
        .module("RecipesComApp")
        .factory("RecipeService", RecipeService);

    function RecipeService($http, $q) {
        var service = {
            findMultipleRecipeByIds: findMultipleRecipeByIds,
            findAllRecipes: findAllRecipes,
            findRecipeById: findRecipeById,
            createRecipe: createRecipe,
            deleteRecipeById: deleteRecipeById,
            updateRecipe: updateRecipe
        };
        return service;

        /**
         *
         * @param arr - [{_id: String(Recipe's id)}]
         * @returns {*|promise}
         */
        function findMultipleRecipeByIds(arr) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/multiple", arr)
                .success(function(recipes) {
                    deferred.resolve(recipes);
                });
            return deferred.promise;
        }

        function findAllRecipes() {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe")
                .success(function(recipes) {
                    deferred.resolve(recipes);
                });
            return deferred.promise;
        }

        function findRecipeById(id) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/" + id)
                .success(function(recipe) {
                    deferred.resolve(recipe);
                });
            return deferred.promise;
        }

        function createRecipe(recipe) {
            var deferred = $q.defer();
            $http.post("/rest/api/recipescom/recipe", recipe)
                .success(function(newRecipe) {
                    deferred.resolve(newRecipe);
                });
            return deferred.promise;
        }

        function deleteRecipeById(id) {
            var deferred = $q.defer();
            $http.delete("/rest/api/recipescom/recipe/" + id)
                .success(function(status) {
                    deferred.resolve(status);
                });
            return deferred.promise;
        }

        function updateRecipe(id, recipe) {
            var deferred = $q.defer();
            $http.put("/rest/api/recipescom/recipe/" + id, recipe)
                .success(function(newRecipe) {
                    deferred.resolve(newRecipe);
                });
            return deferred.promise;
        }
    }
})();