"use strict";

/**
 * include packages
 */
import * as express from 'express';
import * as moment from 'moment';

/**
 * include modules
 */
import {ErrorsDefine} from '../configs/errors_define';
import {HttpStatusCode} from '../utils/http_status_code';
import {BaseApiController} from './base_api_controller';
import {DataAccess} from '../data//mongodb/data_access';

/**
 * UserApiController
 */
export class ApiController extends BaseApiController {
    constructor() {
        super();
    }

    public routers(): express.Router {

        this.router.get('/', this.pingServer);
        this.router.get('/database', this.pingDatabae);
        this.router.get('/database/setup', this.setupDatabae);

        return this.router;
    }

    private pingServer = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        let responseData = {
            dateTime: moment.utc().toISOString()
        }
        return this.asSuccessReponse(req, res, next, responseData);
    }

    private pingDatabae = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            DataAccess.checkConnect((errorCheckConnect, dataCheckConnect) => {
                if (errorCheckConnect) {
                    return this.asFailedReponseWithException(req, res, next, errorCheckConnect, this.httpStatusCode.InternalServerError);
                }

                let responseData = {
                    dateTime: moment.utc().toISOString(),
                    message: 'Connection has been established successfully'
                };

                return this.asSuccessReponse(req, res, next, responseData);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }

    private setupDatabae = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        try {
            DataAccess.setupDatabase((errorDetupDatabase, dataCheckConnect) => {
                if (errorDetupDatabase) {
                    return this.asFailedReponseWithException(req, res, next, errorDetupDatabase, this.httpStatusCode.InternalServerError);
                }

                let responseData = {
                    dateTime: moment.utc().toISOString(),
                    message: 'Database ready'
                };

                return this.asSuccessReponse(req, res, next, responseData);
            });
        } catch (ex) {
            return this.asFailedReponseWithException(req, res, next, ex);
        }
    }
}