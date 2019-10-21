"use strict";

/**
 * include packages
 */
import * as express from 'express';
import * as _ from 'lodash';

/**
 * include modules
 */
import {LoggerService, ConsoleLoggerService} from '../services/logger_service';
import {AuthenticationService, JwtAuthenticationService} from '../services/authentication_service';
import {HttpStatusCode} from '../utils/http_status_code';
import {ErrorsDefine} from '../configs/errors_define';
import {ApiResponse, ApiErrorMessage} from '../utils/api_reponse';

/**
 * BaseController
 */
export abstract class BaseApiController {
    protected router: express.Router;
    protected logger: LoggerService;
    protected authentication: AuthenticationService;
    protected httpStatusCode = HttpStatusCode;
    protected errorsDeinde = ErrorsDefine;

    constructor() {
        this.router = express.Router();
        this.logger = new ConsoleLoggerService();
        this.authentication = new JwtAuthenticationService();
    }

    public abstract routers(): express.Router;

    public asSuccessReponseNotData(req: express.Request, res: express.Response, next: express.NextFunction, status?: HttpStatusCode): express.Response {
        return this.asSuccessReponse(req, res, next, null, status);
    }

    public asSuccessReponse(req: express.Request, res: express.Response, next: express.NextFunction, data: any, status: HttpStatusCode = HttpStatusCode.OK): express.Response {
        let apiResponse = new ApiResponse();

        apiResponse.data = data;

        return res.status(status).json(apiResponse);
    }

    public asFailedReponse(req: express.Request, res: express.Response, next: express.NextFunction, apiErrorMessage: ApiErrorMessage, status: HttpStatusCode = HttpStatusCode.BadRequest): express.Response {
        let apiErrorMessages = [apiErrorMessage];

        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    }

    public asFailedReponseWithException(req: express.Request, res: express.Response, next: express.NextFunction, exception: any, status: HttpStatusCode = HttpStatusCode.InternalServerError): express.Response {
        let apiErrorMessages = [this.errorsDeinde.errorException(exception)];

        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    }

    public asFailedReponseWithValidator(req: express.Request, res: express.Response, next: express.NextFunction, validatorErrors: any[], status: HttpStatusCode = HttpStatusCode.InternalServerError): express.Response {
        let apiErrorMessages: ApiErrorMessage[] = [];

        try {
            _(validatorErrors).forEach((data) => {
                apiErrorMessages.push(data.msg);
            });
        } catch (ex) {
            apiErrorMessages = validatorErrors;
        }

        return this.asFailedReponseWithListError(req, res, next, apiErrorMessages, status);
    }

    public asFailedReponseWithListError(req: express.Request, res: express.Response, next: express.NextFunction, apiErrorMessages: ApiErrorMessage[], status: HttpStatusCode = HttpStatusCode.BadRequest): express.Response {
        let apiResponse = new ApiResponse();

        apiResponse.errors = apiErrorMessages;
        apiResponse.requestBody = req.body || null;
        apiResponse.requestUrl = req.originalUrl || '';

        this.logger.error(apiResponse);

        return res.status(status).json(apiResponse);
    }
}