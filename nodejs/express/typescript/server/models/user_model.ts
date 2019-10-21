"use strict";

/**
 * include packages
 */

/**
 * include modules
 */
import {BaseModel} from './base_model';

/**
 * UserModel
 */
export class UserModel extends BaseModel {
  username: string;
  password: string;
  displayName: string;
}

