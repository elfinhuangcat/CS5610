"use strict";
module.exports = function(app, model){
    // new message object in the body
    app.post(   "/rest/api/recipescom/message", createMessage);

    // find all messages
    app.get(   "/rest/api/recipescom/message", getMessage);

    // get a message by id
    app.get(   "/rest/api/recipescom/message/:id", getMessageById);

    // get all inbox message for a user by [user email]
    app.get(   "/rest/api/recipescom/message/:email/in", getInMessageByUserEmail);

    // get all sentbox message for a user by [user email]
    app.get(   "/rest/api/recipescom/message/:email/sent", getOutMessageByUserEmail);

    // update a message by id
    app.put(   "/rest/api/recipescom/message/:id", updateMessage);

    // delete a message by id
    app.delete("/rest/api/recipescom/message/:id", deleteMessageById);

    // delete multiple messages, message ids in body
    app.delete("/rest/api/recipescom/message", deleteMultipleMessage);

    /**
     * @param req
     * @param res - the created message (single message)
     */
    function createMessage(req, res) {
        model
            .createMessage(req.body)
            .then(function(msg){
                res.json(msg);
            });
    }


    /**
     * get all messages
     * @param req
     * @param res
     */
    function getMessage(req, res) {
        model
            .findAllMessage()
            .then(function(msgs) {
                res.json(msgs);
            });
    }

    function getMessageById(req, res) {
        model
            .findMessageById(req.params["id"])
            .then(function(msg) {
                res.json(msg);
            });
    }

    function getInMessageByUserEmail(req, res) {
        model
            .findInMessageByUserEmail(req.params["email"])
            .then(function(msgs) {
                res.json(msgs);
            });
    }

    function getOutMessageByUserEmail(req, res) {
        model
            .findSentMessageByUserEmail(req.params["email"])
            .then(function(msgs) {
                res.json(msgs);
            });
    }

    /**
     * updates an existing message whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id (param), new message in the body
     * @param res
     */
    function updateMessage(req, res) {
        model
            .updateMessage(req.params["id"], req.body)
            .then(function(msg) {
                res.json(msg);
            });
    }

    /**
     * removes an existing message whose id property is equal to the id path parameter.
     * @param req
     * @param res
     */
    function deleteMessageById(req, res) {
        model
            .deleteMessageById(req.params["id"])
            .then(function(result) {
                res.json(result);
            });
    }

    /**
     *
     * @param req - [ids] in the body
     * @param res
     */
    function deleteMultipleMessage(req, res) {
        model
            .deleteMultipleMessageByIds(req.body)
            .then(function(result) {
                res.json(result);
            });
    }
};