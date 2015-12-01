module.exports = function(app, mongoose, db) {
    var userSchema = require("./models/user.schema.js")(mongoose);
    var recipeSchema = require("./models/recipe.schema.js")(mongoose);
    var messageSchema = require("./models/message.schema.js")(mongoose);
    var applicationSchema = require("./models/application.schema.js")(mongoose);

    var userModel = require("./models/user.model.js")(app, mongoose, userSchema);

    require("./services/user.service.js")(app, userModel);
};