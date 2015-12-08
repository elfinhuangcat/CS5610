"use strict";
module.exports = function(app, model){
    // new user object in the body
    app.post(  "/rest/api/recipescom/user", createUser);

    // 1. find all users; 2. find a user by credentials; 3. find a user by email
    app.get(   "/rest/api/recipescom/user", getUser);

    // get a user by id
    app.get(   "/rest/api/recipescom/user/:id", getUserById);

    // update a user by id
    app.put(   "/rest/api/recipescom/user/:id", updateUser);

    // delete a user by id
    app.delete("/rest/api/recipescom/user/:id", deleteUserById);

    // Given the userid, return the user's friends objects
    app.get(   "/rest/api/recipescom/user/:id/friend", getMultipleUser);

    // get the number of users
    app.get(   "/rest/api/recipescom/user-count", getUserCount);

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
     * GET /rest/api/recipescom/user
     responds with an array of all users
     * GET /rest/api/recipescom/user?email=xxx
     responds with a single user whose email property is equal to the email path parameter
     * GET /rest/api/recipescom/user?email=xxx&password=xxx
     responds with a single user whose email property is equal to the email path parameter and its password is equal to the password path parameter
     */
    function getUser(req, res) {
        if (req.query.email !== undefined) {
            if (req.query.password !== undefined) {
                // GET /rest/api/recipescom/user?email=xxx&password=xxx
                var credentials = {
                    "email" : req.query.email,
                    "password" : req.query.password
                };
                model
                    .findUserByCredentials(credentials)
                    .then(function(user) {
                        res.json(user);
                    });
            }
            else {
                // GET /rest/api/recipescom/user?email=xxx
                model
                    .findUserByEmail(req.query.email)
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
        model
            .findUserById(req.params["id"])
            .then(function(user) {
                res.json(user);
            });
    }

    /**
     * updates an existing user whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id(param), new user in the body
     * @param res : the updated user object
     */
    function updateUser(req, res) {
        model
            .updateUser(req.params["id"], req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    /**
     * removes an existing user whose id property is equal to the id path parameter.
     * @param req
     * @param res
     */
    function deleteUserById(req, res) {
        model
            .deleteUserById(req.params["id"])
            .then(function(result) {
                res.json(result);
            });
    }

    /**
     *
     * @param req - [{email: String}] arr in the body
     * @param res - an array of users
     */
    function getMultipleUser(req, res) {
        model
            .findUserById(req.params["id"])
            .then(function(user) {
                var friend = [];
                for (var ind = 0; ind < user.friends.length; ++ind) {
                    friend.push({"email": user.friends[ind]});
                }
                model
                    .findUsersInEmailArray(friend)
                    .then(function(users) {
                        res.json(users);
                    });
            });
    }

    function getUserCount(req, res) {
        model
            .getUserCount()
            .then(function (count) {
                res.send(count);
            });
    }
};