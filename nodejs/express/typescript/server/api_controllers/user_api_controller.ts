"use strict";

/**
 * include packages
 */
import * as express from 'express';
import * as _ from 'lodash';

/**
 * include modules
 */
import {BaseApiController} from './base_api_controller';
import {UserValidator} from '../validators/user_validator';
import {HasherString} from '../utils/hasher';
import {ApiErrorMessage} from '../utils/api_reponse';
import {UserModel} from '../models/user_model';
import {UserRepository} from '../repositories/mongodb/user_repository';

/**
 * UserApiController
 */
export class UserApiController extends BaseApiController {
    private userRepository: UserRepository;

    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    public routers(): express.Router {

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
    }

    private login = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            UserValidator.login(req);
            var validatorErrors = req.validationErrors() as any[];

            if (validatorErrors) {
                return this.asFailedReponseWithValidator(req, res, next, validatorErrors)
            }

            var username = req.body.username;
            var password = req.body.password;
            
            this.authentication.login(username, password, (errorLogin: ApiErrorMessage, dataLogin: any) => {
                if (errorLogin) {
                    return this.asFailedReponse(req, res, next, errorLogin);
                }
                
                return this.asSuccessReponse(req, res, next, dataLogin);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private create = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            UserValidator.create(req);
            var validatorErrors = req.validationErrors() as any[];

            if (validatorErrors) {
                return this.asFailedReponseWithValidator(req, res, next, validatorErrors)
            }

            var user = req.body;
            var result = _.clone(user); //clone user to return if create success
            var hasherString = new HasherString();
            var password = user.password;
            user.password = hasherString.createHash(password);
            
            this.userRepository.create(user, (errorCreateUser, dataCreateUser) => {
                if (errorCreateUser) {
                    return this.asFailedReponseWithException(req, res, next, errorCreateUser);
                }

                result.id = dataCreateUser.id;                
                return this.asSuccessReponse(req, res, next, result);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private getCurrentUser = (req: any, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            var userCurrent = req.decoded;

            return this.asSuccessReponse(req, res, next, userCurrent);
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }
    
    private getAll = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            this.userRepository.retrieve((errorRetrieve, dataRetrieve) => {
                if (errorRetrieve) {
                    return this.asFailedReponseWithException(req, res, next, errorRetrieve);
                }

                return this.asSuccessReponse(req, res, next, dataRetrieve);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private getById = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            var userId = req.params.id;

            this.userRepository.findById(userId, (errorFindById, dataFindById) => {
                if (errorFindById) {
                    return this.asFailedReponseWithException(req, res, next, errorFindById);
                }

                if (dataFindById) {
                    return this.asSuccessReponse(req, res, next, dataFindById);    
                }

                return this.asSuccessReponse(req, res, next, null, this.httpStatusCode.NotFound);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private updateById = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            var userId = req.params.id;
            var user = req.body;

            this.userRepository.update(userId, user, (errorUpdateById, dataUpdateById) => {
                if (errorUpdateById) {
                    return this.asFailedReponseWithException(req, res, next, errorUpdateById);
                }

                return this.asSuccessReponse(req, res, next, dataUpdateById);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private deleteById = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            var userId = req.params.id;

            this.userRepository.deleteById(userId, (errorDeleteById, dataDeleteById) => {
                if (errorDeleteById) {
                    return this.asFailedReponseWithException(req, res, next, errorDeleteById);
                }

                return this.asSuccessReponse(req, res, next, dataDeleteById);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }
}

