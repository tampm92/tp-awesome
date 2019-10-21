"use strict";
/**
 * User
 */
var User = (function () {
    function User() {
    }
    User.schema = function (sequelize, dataTypes) {
        var schemaUser = {
            username: {
                type: dataTypes.STRING,
                unique: true
            },
            password: {
                type: dataTypes.STRING
            },
            displayName: {
                type: dataTypes.STRING
            }
        };
        return sequelize.define("Users", schemaUser);
    };
    return User;
}());
module.exports = User.schema;
//# sourceMappingURL=user_schema.js.map