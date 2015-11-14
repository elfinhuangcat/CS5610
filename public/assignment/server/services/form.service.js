"use strict";
module.exports = function(app, model, db){
    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser); // It may contain queries
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    // creates a new user embedded in the body of the request, and responds with an array of all users
    function createUser(req, res) {

        var user = req.body;
        res.json(model.createUser(user)); //model.createUser returns all users

    }

    /**
     * returns an array of forms belonging to a user whose id is equal to the userId path parameter
     * @param req
     * @param res
     */
    function getFormByUserId(req, res) {
        var user_id = req.params["userId"];
        res.json(model.findFormByUserId(user_id));
    }

    /**
     * returns a form object whose id is equal to the formId path parameter
     * @param req
     * @param res
     */
    function getFormByFormId(req, res) {
        var form_id = req.params["formId"];
        res.json(model.findFormById(form_id));
    }
};