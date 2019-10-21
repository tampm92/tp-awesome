"use strict";
/**
 * include packages
 */
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
/**
 * include modules
 */
var config_1 = require('../../configs/config');
var DataAccess = (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        var _this = this;
        if (this.mysqlInstance) {
            return this.mysqlInstance;
        }
        this.mysqlInstance = {};
        this.sequelize = new Sequelize(config_1.Config.database.databaseName, config_1.Config.database.username, config_1.Config.database.password, {
            host: config_1.Config.database.host,
            port: config_1.Config.database.port,
            logging: config_1.Config.database.logging,
            dialect: config_1.Config.database.dialect
        });
        fs
            .readdirSync(__dirname)
            .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "data_access.js") && (file.split('.').pop() === 'js');
        })
            .forEach(function (file) {
            var model = _this.sequelize.import(path.join(__dirname, file));
            _this.mysqlInstance[model.name] = model;
        });
        Object.keys(this.mysqlInstance).forEach(function (modelName) {
            if ("associate" in _this.mysqlInstance[modelName]) {
                _this.mysqlInstance[modelName].associate(_this.mysqlInstance);
            }
        });
        this.mysqlInstance.sequelize = this.sequelize;
        this.mysqlInstance.Sequelize = Sequelize;
        console.log('mysqlInstance is setup');
        return this.mysqlInstance;
    };
    DataAccess.checkConnect = function (callback) {
        return this.mysqlInstance.sequelize
            .authenticate()
            .then(function (err) {
            return callback(null, 'Connection has been established successfully');
        }, function (err) {
            return callback(err, null);
        })
            .catch(function (ex) {
            return callback(ex, null);
        });
    };
    DataAccess.setupDatabase = function (callback) {
        return this.mysqlInstance.sequelize
            .sync({ force: true })
            .then(function () {
            return callback(null, 'database realy');
        })
            .catch(function (ex) {
            return callback(ex, null);
        });
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
//# sourceMappingURL=data_access.js.map