"use strict";

/**
 * include packages
 */
import * as express from 'express';

/**
 * include modules
 */
import {ApiController} from './api_controllers/api_controller';
import {UserApiController} from './api_controllers/user_api_controller';

/**
 * ApiServer
 */
export class ApiServer {
    router: express.Router;

    constructor() {
        this.router = express.Router();
    }
    routers(appRouter: Function): void {
        appRouter('/', new ApiController().routers());
        appRouter('/users', new UserApiController().routers());
    }
}

/**
 * ViewServer
 */
export class ViewServer {
    router: express.Router;

    constructor() {
        this.router = express.Router();
    }
    routers(appRouter: Function): void {

    }
}