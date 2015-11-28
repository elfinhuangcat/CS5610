module.exports = function(db) {
    var UserSchema = db.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String
    }, {collection: "cs5610.assignment.user"});
    return UserSchema;
};