"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
/**
 * include modules
 */
var base_api_controller_1 = require('./base_api_controller');
var user_validator_1 = require('../validators/user_validator');
var hasher_1 = require('../utils/hasher');
var user_repository_1 = require('../repositories/mongodb/user_repository');
/**
 * UserApiController
 */
var UserApiController = (function (_super) {
    __extends(UserApiController, _super);
    function UserApiController() {
        var _this = this;
        _super.call(this);
        this.login = function (req, res, next) {
            try {
                user_validator_1.UserValidator.login(req);
                var validatorErrors = req.validationErrors();
                if (validatorErrors) {
                    return _this.asFailedReponseWithValidator(req, res, next, validatorErrors);
                }
                var username = req.body.username;
                var password = req.body.password;
                _this.authentication.login(username, password, function (errorLogin, dataLogin) {
                    if (errorLogin) {
                        return _this.asFailedReponse(req, res, next, errorLogin);
                    }
                    return _this.asSuccessReponse(req, res, next, dataLogin);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.create = function (req, res, next) {
            try {
                user_validator_1.UserValidator.create(req);
                var validatorErrors = req.validationErrors();
                if (validatorErrors) {
                    return _this.asFailedReponseWithValidator(req, res, next, validatorErrors);
                }
                var user = req.body;
                var result = _.clone(user); //clone user to return if create success
                var hasherString = new hasher_1.HasherString();
                var password = user.password;
                user.password = hasherString.createHash(password);
                _this.userRepository.create(user, function (errorCreateUser, dataCreateUser) {
                    if (errorCreateUser) {
                        return _this.asFailedReponseWithException(req, res, next, errorCreateUser);
                    }
                    result.id = dataCreateUser.id;
                    return _this.asSuccessReponse(req, res, next, result);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.getCurrentUser = function (req, res, next) {
            try {
                var userCurrent = req.decoded;
                return _this.asSuccessReponse(req, res, next, userCurrent);
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.getAll = function (req, res, next) {
            try {
                _this.userRepository.retrieve(function (errorRetrieve, dataRetrieve) {
                    if (errorRetrieve) {
                        return _this.asFailedReponseWithException(req, res, next, errorRetrieve);
                    }
                    return _this.asSuccessReponse(req, res, next, dataRetrieve);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.getById = function (req, res, next) {
            try {
                var userId = req.params.id;
                _this.userRepository.findById(userId, function (errorFindById, dataFindById) {
                    if (errorFindById) {
                        return _this.asFailedReponseWithException(req, res, next, errorFindById);
                    }
                    if (dataFindById) {
                        return _this.asSuccessReponse(req, res, next, dataFindById);
                    }
                    return _this.asSuccessReponse(req, res, next, null, _this.httpStatusCode.NotFound);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.updateById = function (req, res, next) {
            try {
                var userId = req.params.id;
                var user = req.body;
                _this.userRepository.update(userId, user, function (errorUpdateById, dataUpdateById) {
                    if (errorUpdateById) {
                        return _this.asFailedReponseWithException(req, res, next, errorUpdateById);
                    }
                    return _this.asSuccessReponse(req, res, next, dataUpdateById);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.deleteById = function (req, res, next) {
            try {
                var userId = req.params.id;
                _this.userRepository.deleteById(userId, function (errorDeleteById, dataDeleteById) {
                    if (errorDeleteById) {
                        return _this.asFailedReponseWithException(req, res, next, errorDeleteById);
                    }
                    return _this.asSuccessReponse(req, res, next, dataDeleteById);
                });
            }
            catch (ex) {
                return _this.asFailedReponseWithException(req, res, next, ex);
            }
        };
        this.userRepository = new user_repository_1.UserRepository();
    }
    UserApiController.prototype.routers = function () {
        this.router.post('/login', this.login);
        this.router.post('/', this.create);
        //required authentication
        this.router.use(this.authentication.validate);
        this.router.get('/me', this.getCurrentUser);
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.put('/:id', this.updateById);
        this.router.delete('/:id', this.deleteById);
        return this.router;
    };
    return UserApiController;
}(base_api_controller_1.BaseApiController));
exports.UserApiController = UserApiController;
//# sourceMappingURL=user_api_controller.js.map