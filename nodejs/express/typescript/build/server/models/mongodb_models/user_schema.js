"use strict";
var data_access_1 = require('./data_access');
var mongoose = data_access_1.DataAccess.mongooseInstance;
var mongooseConnection = data_access_1.DataAccess.mongooseConnection;
var UserSchema = (function () {
    function UserSchema() {
    }
    Object.defineProperty(UserSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                username: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return UserSchema;
}());
var schema = mongooseConnection.model("Users", UserSchema.schema);
module.exports = schema;
//# sourceMappingURL=user_schema.js.map