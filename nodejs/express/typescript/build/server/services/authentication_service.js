"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * include packages
 */
var _ = require('lodash');
var jwt = require('jsonwebtoken');
/**
 * include packages
 */
var errors_define_1 = require('../configs/errors_define');
var config_1 = require('../configs/config');
var hasher_1 = require('../utils/hasher');
var user_repository_1 = require('../repositories/mongodb/user_repository');
/**
 * AuthenticationBaseService
 */
var AuthenticationBaseService = (function () {
    function AuthenticationBaseService() {
    }
    return AuthenticationBaseService;
}());
/**
 * JwtAuthenticationService
 */
var JwtAuthenticationService = (function (_super) {
    __extends(JwtAuthenticationService, _super);
    function JwtAuthenticationService() {
        _super.call(this);
    }
    JwtAuthenticationService.prototype.validate = function (req, res, next) {
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        var secret = config_1.Config.authentication.secret;
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    next(errors_define_1.ErrorsDefine.tokenFail);
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            var error = errors_define_1.ErrorsDefine.tokenNoProvided;
            error.status = 401;
            next(errors_define_1.ErrorsDefine.tokenNoProvided);
        }
    };
    JwtAuthenticationService.prototype.generateToken = function (loginInfo) {
        var secret = config_1.Config.authentication.secret;
        var token = jwt.sign(loginInfo, secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    };
    JwtAuthenticationService.prototype.login = function (username, password, callback) {
        var _this = this;
        var userRepository = new user_repository_1.UserRepository();
        userRepository.findByUsername(username, function (errorFindByUsername, dataFindByUsername) {
            if (errorFindByUsername) {
                return callback(errors_define_1.ErrorsDefine.errorException(errorFindByUsername), null);
            }
            if (!dataFindByUsername) {
                return callback(errors_define_1.ErrorsDefine.userNotFound, null);
            }
            var hasherString = new hasher_1.HasherString();
            var userInfo = _.pick(dataFindByUsername, "id", "username", "displayName");
            if (!hasherString.validateHash(dataFindByUsername.password, password)) {
                return callback(errors_define_1.ErrorsDefine.passwordWrong, null);
            }
            var token = _this.generateToken(userInfo);
            var result = _.extend(userInfo);
            result.accessToken = token;
            return callback(null, result);
        });
    };
    return JwtAuthenticationService;
}(AuthenticationBaseService));
exports.JwtAuthenticationService = JwtAuthenticationService;
//# sourceMappingURL=authentication_service.js.map