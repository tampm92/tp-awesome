"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * include packages
 */
/**
 * include modules
 */
var base_model_1 = require('./base_model');
/**
 * UserModel
 */
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
    }
    return UserModel;
}(base_model_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=user_model.js.map