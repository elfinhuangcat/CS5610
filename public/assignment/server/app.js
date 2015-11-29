module.exports = function(app, mongoose, db) {
    var userSchema = require("./models/user.schema.js")(mongoose);
    var formSchema = require("./models/form.schema.js")(mongoose);
    var userModel = require("./models/user.model.js")(app, mongoose, userSchema);
    var formModel = require("./models/form.model.js")(app, mongoose, formSchema);
    require("./services/user.service.js")(app, userModel);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);
};