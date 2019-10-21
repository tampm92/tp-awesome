"use strict";

/**
 * include packages
 */

/**
 * include modules
 */
import {BaseRepository} from './base_repository';
import {UserModel} from '../../models/user_model';
import {DataAccess} from '../../data/mysql/data_access';

/**
 * UserRepository
 */
export class UserRepository extends BaseRepository<UserModel> {
    constructor () {
        super(DataAccess.mysqlInstance.Users);
    }
}