"use strict";
/**
 * include modules
 */
var errors_define_1 = require('../configs/errors_define');
/**
 * UserValidator
 */
var UserValidator = (function () {
    function UserValidator() {
    }
    UserValidator.login = function (req) {
        var schema = {
            'username': {
                notEmpty: true,
                errorMessage: errors_define_1.ErrorsDefine.usernameRequired
            },
            'password': {
                notEmpty: true,
                errorMessage: errors_define_1.ErrorsDefine.passwordRequired
            }
        };
        req.checkBody(schema);
    };
    UserValidator.create = function (req) {
        var schema = {
            'username': {
                notEmpty: true,
                errorMessage: errors_define_1.ErrorsDefine.usernameRequired
            },
            'password': {
                notEmpty: true,
                errorMessage: errors_define_1.ErrorsDefine.passwordRequired
            }
        };
        req.checkBody(schema);
    };
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=user_validator.js.map