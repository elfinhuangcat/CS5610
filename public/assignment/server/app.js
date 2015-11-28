module.exports = function(app, db) {
    var userSchema = require("./models/user.schema.js")(db);
    var userModel = require("./models/user.model.js")(app, db, userSchema);
    var formModel = require("./models/form.model.js")(app, db);
    require("./services/user.service.js")(app, userModel);
    require("./services/form.service.js")(app, formModel, db);
    require("./services/field.service.js")(app, formModel, db);
};