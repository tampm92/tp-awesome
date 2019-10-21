"use strict";

/**
 * include packages
 */
import * as express from 'express';

/**
 * include modules
 */
import {ErrorsDefine} from '../configs/errors_define';

/**
 * UserValidator
 */
export class UserValidator {
    public static login(req: any): void {
        let schema = {
            'username': {
                notEmpty: true,
                errorMessage: ErrorsDefine.usernameRequired
            },
            'password': {
                notEmpty: true,
                errorMessage: ErrorsDefine.passwordRequired
            }
        };

        req.checkBody(schema);
    }

    public static create(req: any): void {
        let schema = {
            'username': {
                notEmpty: true,
                errorMessage: ErrorsDefine.usernameRequired
            },
            'password': {
                notEmpty: true,
                errorMessage: ErrorsDefine.passwordRequired
            }
        };

        req.checkBody(schema);
    }
}