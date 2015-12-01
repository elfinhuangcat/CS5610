module.exports = function(app, mongoose, db) {
    var userSchema = require("./models/user.schema.js")(mongoose);
    var recipeSchema = require("./models/recipe.schema.js")(mongoose);
    var messageSchema = require("./models/message.schema.js")(mongoose);
    var applicationSchema = require("./models/application.schema.js")(mongoose);

    var userModel = require("./models/user.model.js")(app, mongoose, userSchema);
    var recipeModel = require("./models/recipe.model.js")(app, mongoose, recipeSchema);
    var messageModel = require("./models/message.model.js")(app, mongoose, messageSchema);
    var applicationModel = require("./models/application.model.js")(app, mongoose, applicationSchema);

    require("./services/user.server.service.js")(app, userModel);
    require("./services/recipe.server.service.js")(app, recipeModel);
    require("./services/message.server.service.js")(app, messageModel);
    require("./services/application.server.service.js")(app, applicationModel);
};