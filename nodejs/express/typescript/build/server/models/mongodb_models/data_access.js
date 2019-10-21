"use strict";
var mongoose = require('mongoose');
var DataAccess = (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once("open", function () {
            console.log("Conectado ao mongodb.");
        });
        this.mongooseInstance = mongoose.connect('mongodb://localhost/myappdatabase');
        return this.mongooseInstance;
    };
    DataAccess.checkConnect = function () {
        return mongoose.connection.readyState === 1;
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
//# sourceMappingURL=data_access.js.map