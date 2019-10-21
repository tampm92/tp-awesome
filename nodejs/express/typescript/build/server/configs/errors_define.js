"use strict";
/**
 * include modules
 */
var api_reponse_1 = require('../utils/api_reponse');
/**
 * ErrorsDefine
 */
var ErrorsDefine = (function () {
    function ErrorsDefine() {
    }
    //
    ErrorsDefine.errorException = function (exception) {
        return { errorCode: 9999, errorMessage: exception.message || exception, stack: exception.stack || null };
    };
    ErrorsDefine.notFound = new api_reponse_1.ApiErrorMessage(9998, 'Failed to authenticate token');
    //Authentication's errors: 20xx
    ErrorsDefine.tokenFail = new api_reponse_1.ApiErrorMessage(2000, 'Failed to authenticate token');
    ErrorsDefine.tokenNoProvided = new api_reponse_1.ApiErrorMessage(2001, 'No token provided');
    //User's errors: 21xx
    ErrorsDefine.userNotFound = new api_reponse_1.ApiErrorMessage(2100, 'User not found');
    ErrorsDefine.usernameRequired = new api_reponse_1.ApiErrorMessage(2101, 'The username field is required');
    ErrorsDefine.passwordRequired = new api_reponse_1.ApiErrorMessage(2102, 'The password field is required');
    ErrorsDefine.passwordWrong = new api_reponse_1.ApiErrorMessage(2103, 'The password field is wrong');
    return ErrorsDefine;
}());
exports.ErrorsDefine = ErrorsDefine;
//# sourceMappingURL=errors_define.js.map