"use strict";

/**
 * include modules
 */
import {ApiErrorMessage} from '../utils/api_reponse';

/**
 * ErrorsDefine
 */
export class  ErrorsDefine {
    //
    public static errorException(exception: any): ApiErrorMessage {
        return  {errorCode: 9999, errorMessage: exception.message || exception, stack: exception.stack || null};
    }
    public static notFound: ApiErrorMessage = new ApiErrorMessage(9998, 'Failed to authenticate token');
    
    //Authentication's errors: 20xx
    public static tokenFail: ApiErrorMessage = new ApiErrorMessage(2000, 'Failed to authenticate token');
    public static tokenNoProvided: ApiErrorMessage = new ApiErrorMessage(2001, 'No token provided');
    

    //User's errors: 21xx
    public static userNotFound: ApiErrorMessage = new ApiErrorMessage(2100, 'User not found');
    public static usernameRequired: ApiErrorMessage = new ApiErrorMessage(2101, 'The username field is required');
    public static passwordRequired: ApiErrorMessage = new ApiErrorMessage(2102, 'The password field is required');
    public static passwordWrong: ApiErrorMessage = new ApiErrorMessage(2103, 'The password field is wrong');
}