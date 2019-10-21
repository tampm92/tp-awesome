"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var moment = require('moment');
var base_api_controller_1 = require('./base_api_controller');
var data_access_1 = require('../data//mongodb/data_access');
/**
 * UserApiController
 */
var ApiController = (function (_super) {
    __extends(ApiController, _super);
    function ApiController() {
        var _this = this;
        _super.call(this);
        this.pingServer = function (req, res, next) {
            var responseData = {
                dateTime: moment.utc().toISOString()
            };
            return _this.asSuccessReponse(req, res, next, responseData);
        };
        this.pingDatabae = function (req, res, next) {
            try {
                data_access_1.DataAccess.checkConnect(function (errorCheckConnect, dataCheckConnect) {
                    if (errorCheckConnect) {
                        return _this.asFailedReponseWithException(req, res, next, errorCheckConnect, _this.httpStatusCode.InternalServerError);
                    }
                    var responseData = {
                        dateTime: moment.utc().toISOString(),
                        message: 'Connection has been established successfully'
                    };
                    return _this.asSuccessReponse(req, res, next, responseData);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.setupDatabae = function (req, res, next) {
            try {
                data_access_1.DataAccess.setupDatabase(function (errorDetupDatabase, dataCheckConnect) {
                    if (errorDetupDatabase) {
                        return _this.asFailedReponseWithException(req, res, next, errorDetupDatabase, _this.httpStatusCode.InternalServerError);
                    }
                    var responseData = {
                        dateTime: moment.utc().toISOString(),
                        message: 'Database ready'
                    };
                    return _this.asSuccessReponse(req, res, next, responseData);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
    }
    ApiController.prototype.routers = function () {
        this.router.get('/', this.pingServer);
        this.router.get('/database', this.pingDatabae);
        this.router.get('/database/setup', this.setupDatabae);
        return this.router;
    };
    return ApiController;
}(base_api_controller_1.BaseApiController));
exports.ApiController = ApiController;
//# sourceMappingURL=api_controller.js.map