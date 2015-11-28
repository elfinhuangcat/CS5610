"use strict";
module.exports = function(app, model){
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
        model
            .createUser(req.body)
            .then(function(user){
                res.json(user);
            });
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
                model
                    .findUserByCredentials(credentials)
                    .then(function(user) {
                        res.json(user);
                    });
            }
            else {
                // GET /api/assignment/user?username=username
                model
                    .findUserByUsername(req.query.username)
                    .then(function(user) {
                        res.json(user);
                    });
            }
        }
        else {
            // no query params. Find all users:
            model
                .findAllUser()
                .then(function(users) {
                    res.json(users);
                });
        }
    }

    function getUserById(req, res) {
        console.log("GET USER BY ID SERVICE: " + req.params["id"]);
        model
            .findUserById(req.params["id"])
            .then(function(user) {
                res.json(user);
            });
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
        // var id = req.params["id"];
        // var user = req.body;
        model
            .updateUser(req.params["id"], req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    /**
     * removes an existing user whose id property is equal to the id path parameter.
     * Responds with an array of all users
     * @param req
     * @param res
     */
    function deleteUserById(req, res) {
        var id = req.params["id"];
        model
            .deleteUserById(req.params["id"])
            .then(function(result) {
                console.log("DELETE USER RESULT: " + result);
            });
        model
            .findAllUser()
            .then(function(users) {
                res.json(users);
            });
    }
};