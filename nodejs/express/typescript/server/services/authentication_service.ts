"use strict";

/**
 * include packages
 */
import * as _ from 'lodash';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

/**
 * include packages
 */
import {ErrorsDefine} from '../configs/errors_define';
import {Config} from '../configs/config';
import {HasherString} from '../utils/hasher';
import {UserRepository} from '../repositories/mongodb/user_repository';
import {ApiErrorMessage} from '../utils/api_reponse';

/**
 * AuthenticationService
 */
export interface AuthenticationService {
    validate(req: express.Request, res: express.Response, next: express.NextFunction): void;
    generateToken(userInfo: any): any;
    login(username: string, password: string, callback: (error: ApiErrorMessage, data: any) => {}): any 
}

/**
 * AuthenticationBaseService
 */
abstract class AuthenticationBaseService implements AuthenticationService {
    constructor() {
    }

    public abstract validate(req: express.Request, res: express.Response, next: express.NextFunction): void;
    public abstract generateToken(userInfo: any): any;
    public abstract login(username: string, password: string, callback: (error: ApiErrorMessage, data: any) => {}): any;
}

/**
 * JwtAuthenticationService
 */
export class JwtAuthenticationService extends AuthenticationBaseService {
    constructor() {
        super();
    }

    public validate(req: any, res: express.Response, next: express.NextFunction): void {
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        var secret = Config.authentication.secret;

        if (token) {
            jwt.verify(token, secret, function (err: any, decoded: any) {
                if (err) {
                    next(ErrorsDefine.tokenFail);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            var error = ErrorsDefine.tokenNoProvided as any;
            error.status = 401;
            next(ErrorsDefine.tokenNoProvided);
        }
    }

    public generateToken(loginInfo: any): string {
        var secret = Config.authentication.secret;

        var token = jwt.sign(
            loginInfo, secret,
            {
                expiresIn: 86400 // expires in 24 hours
            }
        );

        return token;
    }

    public login(username: string, password: string, callback: (error: ApiErrorMessage, data: any) => {}): any {
        var userRepository = new UserRepository();

        userRepository.findByUsername(username, (errorFindByUsername, dataFindByUsername) => {
            if (errorFindByUsername) {
                return callback(ErrorsDefine.errorException(errorFindByUsername), null);
            }

            if (!dataFindByUsername) {
                return callback(ErrorsDefine.userNotFound, null);
            }

            var hasherString = new HasherString();
            var userInfo: any = _.pick(dataFindByUsername, "id", "username", "displayName");

            if (!hasherString.validateHash(dataFindByUsername.password, password)) {
                return callback(ErrorsDefine.passwordWrong, null);
            }

            var token = this.generateToken(userInfo);
            var result = _.extend(userInfo);
            result.accessToken = token;

            return callback(null, result);
        });
    }
}