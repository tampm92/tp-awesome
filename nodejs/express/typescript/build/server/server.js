"use strict";
/**
 * include packages
 */
var express = require('express');
/**
 * include modules
 */
var api_controller_1 = require('./api_controllers/api_controller');
var user_api_controller_1 = require('./api_controllers/user_api_controller');
/**
 * ApiServer
 */
var ApiServer = (function () {
    function ApiServer() {
        this.router = express.Router();
    }
    ApiServer.prototype.routers = function (appRouter) {
        appRouter('/', new api_controller_1.ApiController().routers());
        appRouter('/users', new user_api_controller_1.UserApiController().routers());
    };
    return ApiServer;
}());
exports.ApiServer = ApiServer;
/**
 * ViewServer
 */
var ViewServer = (function () {
    function ViewServer() {
        this.router = express.Router();
    }
    ViewServer.prototype.routers = function (appRouter) {
    };
    return ViewServer;
}());
exports.ViewServer = ViewServer;
//# sourceMappingURL=server.js.map