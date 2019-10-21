"use strict";

/**
 * include packages
 */

/**
 * include modules
 */
import {BaseRepository} from './base_repository';
import {UserModel} from '../../models/user_model';
import * as UserSchema from '../../data/mongodb/user_schema';

/**
 * UserRepository
 */
export class UserRepository extends BaseRepository<UserModel> {
    constructor () {
        super(UserSchema);
    }
}