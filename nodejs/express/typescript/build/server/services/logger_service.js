"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * LoggerServiceBase
 */
var LoggerServiceBase = (function () {
    function LoggerServiceBase() {
    }
    return LoggerServiceBase;
}());
/**
 * ConsoleLoggerService
 */
var ConsoleLoggerService = (function (_super) {
    __extends(ConsoleLoggerService, _super);
    function ConsoleLoggerService() {
        _super.call(this);
    }
    ConsoleLoggerService.prototype.info = function (data) {
        console.info(data);
    };
    ConsoleLoggerService.prototype.error = function (data) {
        console.error(data);
    };
    return ConsoleLoggerService;
}(LoggerServiceBase));
exports.ConsoleLoggerService = ConsoleLoggerService;
//# sourceMappingURL=logger_service.js.map