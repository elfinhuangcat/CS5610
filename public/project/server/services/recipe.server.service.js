"use strict";
module.exports = function(app, model){
    // new recipe object in the body
    app.post(   "/rest/api/recipescom/recipe", createRecipe);

    // find all recipes
    app.get(   "/rest/api/recipescom/recipe", getRecipe);

    // get a recipe by id
    app.get(   "/rest/api/recipescom/recipe/:id", getRecipeById);

    // update a recipe by id
    app.put(   "/rest/api/recipescom/recipe/:id", updateRecipe);

    // delete a recipe by id
    app.delete("/rest/api/recipescom/recipe/:id", deleteRecipeById);

    // findRecipesInArrayOfId : findRecipesInArrayOfId, // arg: [{_id: String(Recipe's id)}]
    // recipe _ids (arr) in the body
    app.get(   "/rest/api/recipescom/recipe/multiple", getMultipleRecipe);

    /**
     * @param req
     * @param res - the created recipe (single recipe)
     */
    function createRecipe(req, res) {
        model
            .createRecipe(req.body)
            .then(function(recipe){
                res.json(recipe);
            });
    }


    /**
     * Get all recipes (for now)
     * @param req
     * @param res
     */
    function getRecipe(req, res) {
        model
            .findAllRecipe()
            .then(function(recipes) {
                res.json(recipes);
            });
    }

    function getRecipeById(req, res) {
        model
            .findRecipeById(req.params["id"])
            .then(function(recipe) {
                res.json(recipe);
            });
    }

    /**
     * updates an existing recipe whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id (param), new recipe in the body
     * @param res
     */
    function updateRecipe(req, res) {
        model
            .updateRecipe(req.params["id"], req.body)
            .then(function(recipe) {
                res.json(recipe);
            });
    }

    /**
     * removes an existing recipe whose id property is equal to the id path parameter.
     * @param req
     * @param res
     */
    function deleteRecipeById(req, res) {
        model
            .deleteRecipeById(req.params["id"])
            .then(function(result) {
                res.json(result);
            });
    }

    /**
     * In the body: arr : [{_id: String}]
     * @param req : [{email: String}] arr in the body
     * @param res : an array of users
     */
    function getMultipleRecipe(req, res) {
        model
            .findRecipesInArrayOfId(req.body)
            .then(function(recipes) {
                res.json(recipes);
            });
    }
};