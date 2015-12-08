"use strict";
module.exports = function(app, model){
    // new application object in the body
    app.post(   "/rest/api/recipescom/application", createApplication);

    // 1. find all applications; 2. find an applicantion by email
    app.get(   "/rest/api/recipescom/application", getApplication);

    // get a application by id
    app.get(   "/rest/api/recipescom/application/:id", getApplicationById);

    // update a application by id
    app.put(   "/rest/api/recipescom/application/:id", updateApplication);

    // delete a application by id
    app.delete("/rest/api/recipescom/application/:id", deleteApplicationById);

    app.get(   "/rest/api/recipescom/application-count", getApplicationCount);

    /**
     * @param req
     * @param res - the created application (single application)
     */
    function createApplication(req, res) {
        model
            .createApplication(req.body)
            .then(function(application){
                res.json(application);
            });
    }


    /**
     * 1. get all applications
     * 2. /rest/api/recipescom/application?email=xxx : get application by email of applicant
     * @param req
     * @param res
     */
    function getApplication(req, res) {
        if (req.query.email !== undefined) {
            // get application by email of applicant
            model
                .findApplicationByApplicant(req.query.email)
                .then(function(application) {
                    res.json(application);
                });
        } else {
            // get all applications
            model
                .findAllApplication()
                .then(function(applications) {
                    res.json(applications);
                });
        }
    }

    function getApplicationById(req, res) {
        model
            .findApplicationById(req.params["id"])
            .then(function(application) {
                res.json(application);
            });
    }

    /**
     * updates an existing application whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id (param), new recipe in the body
     * @param res
     */
    function updateApplication(req, res) {
        model
            .updateApplication(req.params["id"], req.body)
            .then(function(application) {
                res.json(application);
            });
    }

    /**
     * removes an existing application whose id property is equal to the id path parameter.
     * @param req
     * @param res
     */
    function deleteApplicationById(req, res) {
        model
            .deleteApplicationById(req.params["id"])
            .then(function(result) {
                res.json(result);
            });
    }

    function getApplicationCount(req, res) {
        model
            .getApplicationCount()
            .then(function(count) {
                res.json(count);
            })
    }
};