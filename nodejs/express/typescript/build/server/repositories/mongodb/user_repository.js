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
var base_repository_1 = require('./base_repository');
var UserSchema = require('../../data/mongodb/user_schema');
/**
 * UserRepository
 */
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        _super.call(this, UserSchema);
    }
    return UserRepository;
}(base_repository_1.BaseRepository));
exports.UserRepository = UserRepository;
//# sourceMappingURL=user_repository.js.map