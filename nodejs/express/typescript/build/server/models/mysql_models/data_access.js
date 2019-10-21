"use strict";
/**
 * include packages
 */
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
/**
 * include modules
 */
var config_1 = require('../../configs/config');
var sequelize = new Sequelize(config_1.Config.database.databaseName, config_1.Config.database.username, config_1.Config.database.password, {
    host: config_1.Config.database.host,
    port: config_1.Config.database.port,
    logging: config_1.Config.database.logging,
    dialect: config_1.Config.database.dialect
});
var db = {};
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "data_access.js") && (getFileExtension(file) === 'js');
})
    .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
function getFileExtension(filename) {
    return filename.split('.').pop();
}
module.exports = db;
//# sourceMappingURL=data_access.js.map