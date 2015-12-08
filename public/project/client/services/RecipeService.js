"use strict";
(function() {
    angular
        .module("RecipesComApp")
        .factory("RecipeService", RecipeService);

    function RecipeService($http, $q) {
        var service = {
            findAllRecipes: findAllRecipes,
            findRecipeById: findRecipeById,
            createRecipe: createRecipe,
            deleteRecipeById: deleteRecipeById,
            updateRecipe: updateRecipe,
            getRecipesCountByStyle: getRecipesCountByStyle,
            getRecipesCountByMealtype: getRecipesCountByMealtype,
            findRecipesByStyle: findRecipesByStyle,
            findRecipesByMealtype: findRecipesByMealtype
        };
        return service;

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

        function getRecipesCountByStyle(style) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/style-count/" + style)
                .success(function(count) {
                    deferred.resolve(count);
                });
            return deferred.promise;
        }

        function getRecipesCountByMealtype(mealtype) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/mealtype-count/" + mealtype)
                .success(function(count) {
                    deferred.resolve(count);
                });
            return deferred.promise;
        }

        function findRecipesByStyle(style) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/style/" + style)
                .success(function(recipes) {
                    deferred.resolve(recipes);
                });
            return deferred.promise;
        }

        function findRecipesByMealtype(mealtype) {
            var deferred = $q.defer();
            $http.get("/rest/api/recipescom/recipe/mealtype/" + mealtype)
                .success(function(recipes) {
                    deferred.resolve(recipes);
                });
            return deferred.promise;
        }
    }
})();