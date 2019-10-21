"use strict";
/**
 * include packages
 */
var express = require('express');
var _ = require('lodash');
/**
 * include modules
 */
var logger_service_1 = require('../services/logger_service');
var authentication_service_1 = require('../services/authentication_service');
var http_status_code_1 = require('../utils/http_status_code');
var errors_define_1 = require('../configs/errors_define');
var api_reponse_1 = require('../utils/api_reponse');
/**
 * BaseController
 */
var BaseApiController = (function () {
    function BaseApiController() {
        this.httpStatusCode = http_status_code_1.HttpStatusCode;
        this.errorsDeinde = errors_define_1.ErrorsDefine;
        this.router = express.Router();
        this.logger = new logger_service_1.ConsoleLoggerService();
        this.authentication = new authentication_service_1.JwtAuthenticationService();
    }
    BaseApiController.prototype.asSuccessReponseNotData = function (req, res, next, status) {
        return this.asSuccessReponse(req, res, next, null, status);
    };
    BaseApiController.prototype.asSuccessReponse = function (req, res, next, data, status) {
        if (status === void 0) { status = http_status_code_1.HttpStatusCode.OK; }
        var apiResponse = new api_reponse_1.ApiResponse();
        apiResponse.data = data;
        return res.status(status).json(apiResponse);
    };
    BaseApiController.prototype.asFailedReponse = function (req, res, next, apiErrorMessage, status) {
        if (status === void 0) { status = http_status_code_1.HttpStatusCode.BadRequest; }
        var apiErrorMessages = [apiErrorMessage];
        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    };
    BaseApiController.prototype.asFailedReponseWithException = function (req, res, next, exception, status) {
        if (status === void 0) { status = http_status_code_1.HttpStatusCode.InternalServerError; }
        var apiErrorMessages = [this.errorsDeinde.errorException(exception)];
        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    };
    BaseApiController.prototype.asFailedReponseWithValidator = function (req, res, next, validatorErrors, status) {
        if (status === void 0) { status = http_status_code_1.HttpStatusCode.InternalServerError; }
        var apiErrorMessages = [];
        try {
            _(validatorErrors).forEach(function (data) {
                apiErrorMessages.push(data.msg);
            });
        }
        catch (ex) {
            apiErrorMessages = validatorErrors;
        }
        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    };
    BaseApiController.prototype.asFailedReponseWithListError = function (req, res, next, apiErrorMessages, status) {
        if (status === void 0) { status = http_status_code_1.HttpStatusCode.BadRequest; }
        var apiResponse = new api_reponse_1.ApiResponse();
        apiResponse.errors = apiErrorMessages;
        apiResponse.requestBody = req.body || null;
        apiResponse.requestUrl = req.originalUrl || '';
        this.logger.error(apiResponse);
        return res.status(status).json(apiResponse);
    };
    return BaseApiController;
}());
exports.BaseApiController = BaseApiController;
//# sourceMappingURL=base_api_controller.js.map