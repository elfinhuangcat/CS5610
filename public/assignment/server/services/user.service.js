"use strict";
module.exports = function(app, model, db){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser); // It may contain queries
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    /**
     * @param req
     * @param res - the created user (single user)
     */
    function createUser(req, res) {

        var user = req.body;
        res.json(model.createUser(user)); //model.createUser returns all users

    }

    /** Get User Issues:
     * GET /api/assignment/user
     responds with an array of all users
     * GET /api/assignment/user?username=username
     responds with a single user whose username property is equal to the username path parameter
     * GET /api/assignment/user?username=alice&password=wonderland
     responds with a single user whose username property is equal to the username path parameter and its password is equal to the password path parameter
     */
    function getUser(req, res) {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                // GET /api/assignment/user?username=alice&password=wonderland
                var credentials = {
                    "username" : req.query.username,
                    "password" : req.query.password
                };
                res.json(model.findUserByCredentials(credentials));
            }
            else {
                // GET /api/assignment/user?username=username
                res.json(model.findUserByUsername(req.query.username));
            }
        }
        else {
            // no query params. Find all users:
            res.json(model.findAllUser());
        }
    }

    function getUserById(req, res) {
        var id = req.params["id"];
        res.json(model.findUserById(id));
    }

    /**
     * updates an existing user whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id(param), firstName, lastName, username, password, email(queries)
     * @param res : the updated user object
     */
    function updateUser(req, res) {
        // Properties to be update:
        // firstName, lastName, username, password, email
        console.log("server before update " + req.params["id"]);
        var id = req.params["id"];
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    /**
     * removes an existing user whose id property is equal to the id path parameter.
     * Responds with an array of all users
     * @param req
     * @param res
     */
    function deleteUserById(req, res) {
        var id = req.params["id"];
        model.deleteUserById(id);
        res.json(model.findAllUser());
    }
};