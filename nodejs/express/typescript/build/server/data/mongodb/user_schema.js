"use strict";
var data_access_1 = require('./data_access');
var mongoose = data_access_1.DataAccess.mongooseInstance;
var mongooseConnection = data_access_1.DataAccess.mongooseConnection;
var User = (function () {
    function User() {
    }
    Object.defineProperty(User, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                username: {
                    type: String,
                    required: true,
                    unique: true,
                    dropDups: true
                },
                password: {
                    type: String,
                    required: true
                },
                displayName: {
                    type: String,
                    required: false
                }
            }, {
                timestamps: true
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
var schema = mongooseConnection.model("Users", User.schema);
module.exports = schema;
//# sourceMappingURL=user_schema.js.map