"use strict";
/**
 * include packages
 */
var mongoose = require('mongoose');
/**
 * include modules
 */
var config_1 = require('../../configs/config');
var DataAccess = (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once("open", function () {
            console.log("mongooseInstance is setup");
        });
        this.mongooseInstance = mongoose.connect(config_1.Config.database.url);
        return this.mongooseInstance;
    };
    DataAccess.checkConnect = function (callback) {
        if (mongoose.connection.readyState === 0) {
            return callback('Connection mongodb fails', null);
        }
        return callback(null, 'Connection mongodb successfully');
    };
    DataAccess.setupDatabase = function (callback) {
        if (mongoose.connection.readyState === 0) {
            return callback('Connection mongodb fails', null);
        }
        return callback(null, 'Connection mongodb successfully');
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
//# sourceMappingURL=data_access.js.map