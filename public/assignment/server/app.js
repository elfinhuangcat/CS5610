module.exports = function(app, mongoose, db) {
    var userModel = require("./models/user.model.js")(mongoose, db);
    var formModel = require("./models/form.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel, db);
    require("./services/form.service.server.js")(app, formModel, db);
    require("./services/field.service.server.js")(app, formModel, db);
};