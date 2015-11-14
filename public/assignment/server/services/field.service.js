"use strict";
module.exports = function(app, model, db){
    app.get("/api/assignment/form/:formId/field", getFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getOneFieldByFormAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormAndFieldId);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    /**
     * returns an array of fields belonging to a form object whose id is equal to the formId path parameter
     * @param req
     * @param res
     */
    function getFieldByFormId(req, res) {
        var form_id = req.params["formId"];
        res.json(model.findFieldByFormId(form_id));
    }

    /**
     * @param req
     * @param res
     * response: a field object or null
     */
    function getOneFieldByFormAndFieldId(req, res) {
        res.json(model.findOneFieldByFormAndFieldId(req.params["formId"], req.params["fieldId"]));
    }

    /**
     * removes a field object whose id is equal to the fieldId path parameter
     * and belonging to a form object whose id is equal to the formId path parameter
     * @param req
     * @param res
     * response: none
     */
    function deleteFieldByFormAndFieldId(req, res) {
        model.deleteFieldByFormAndFieldId(req.params["formId"], req.params["fieldId"]);
    }

    /**
     * creates a new field whose properties are the same as the field object embedded
     * in the request's body and the field belongs to a form whose id is equal to the
     * formId path parameter. The field object's id is initially null since it is a new
     * record. The id of the new form field should be set dynamically using Node.js guid
     * or node-uuid libraries. These will eventually be set by the database when they are
     * inserted into a collection
     * @param req
     * @param res
     * response : the new form object
     */
    function createField(req, res) {
        var field = req.body;
        var formId = req.params["formId"];
        res.json(model.createField(formId, field));
    }

    /**
     * updates a field object whose id is equal to the fieldId path parameter
     * and belonging to a form object whose id is equal to the formId path parameter
     * so that its properties are the same as the property values of the field object
     * embedded in the request's body
     * @param req
     * @param res
     * Response: the new form object
     */
    function updateField(req, res) {
        var fieldId = req.params["fieldId"];
        var formId = req.params["formId"];
        res.json(model.updateField(formId, fieldId, req.body));
    }
};