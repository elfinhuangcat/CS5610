"use strict";
module.exports = function(app, model, db){
    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

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

    /**
     * removes a form object whose id is equal to the formId path parameter
     * @param req
     * @param res
     */
    function deleteFormByFormId(req, res) {
        var form_id = req.params["formId"];
        model.deleteFormById(form_id);
    }

    /**
     * creates a new form whose properties are the same as the form object embedded
     * in the HTTP request's body and the form belongs to a user whose id is equal
     * to the userId path parameter. The form object's id is initially null since
     * it is a new record. The id of the new form should be set dynamically using
     * Node.js guid or node-uuid libraries. These will eventually be set by the
     * database when they are inserted into a collection
     * @param req
     * @param res - the new form object
     */
    function createForm(req, res) {
        var form = req.body;
        form.userId = req.params["userId"];
        res.json(model.createForm(form));
    }

    /**
     * updates a form object whose id is equal to the formId path parameter
     * so that its properties are the same as the property values of the form
     * object embedded in the request's body
     * @param req
     * @param res - the updated form object
     */
    function updateFormById(req, res) {
        var form_id = req.params["formId"];
        var form = req.body;
        model.updateForm(form_id, form);
        res.json(model.findFormById(form_id));
    }
};