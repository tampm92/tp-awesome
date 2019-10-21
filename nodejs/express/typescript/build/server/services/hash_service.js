"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * LoggerServiceBase
 */
var HashServiceBase = (function () {
    function HashServiceBase() {
    }
    return HashServiceBase;
}());
/**
 * ConsoleLoggerService
 */
var NothingHashService = (function (_super) {
    __extends(NothingHashService, _super);
    function NothingHashService() {
        _super.call(this);
    }
    NothingHashService.prototype.info = function (data) {
        console.info(data);
    };
    NothingHashService.prototype.error = function (data) {
        console.error(data);
    };
    return NothingHashService;
}(HashServiceBase));
exports.NothingHashService = NothingHashService;
//# sourceMappingURL=hash_service.js.map