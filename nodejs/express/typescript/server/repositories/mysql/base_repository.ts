"use strict";

/**
 * include packages
 */
import {DataTypes, Model} from 'sequelize';

/**
 * include modules
 */
import {BaseModel} from './../../models/base_model';

/**
 * BaseRepository
 */
export abstract class BaseRepository<T extends BaseModel> {

    private schema_model: Model<{}, {}>;
    private dataTypes: DataTypes;

    constructor(schemaModel: Model<{}, {}>) {
        this.schema_model = schemaModel;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this.schema_model.create(item)
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    }

    retrieve (callback: (error: any, result: any) => void) {
         this.schema_model.findAndCountAll({
            
        })
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    }

    update(idItem: number, item: T, callback: (error: any, result: any) => void) {
        this.schema_model.update(item, {
            where: {
                id: idItem
            }
        })
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    }

    deleteById (idItem: number, callback:(error: any, result: any) => void) {
        this.schema_model.destroy({
            where: {
                id: idItem
            }
        })
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    } 

    findById (idItem: number, callback: (error: any, result: any) => void) {
        this.schema_model.findOne({
            where: {
                id: idItem
            }
        })
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    }

    findByUsername (username: string, callback: (error: any, result: any) => void) {
        this.schema_model.findOne({
            where: {
                username: username
            }
        })
            .then((data) => {
                return callback(null, data);
            })
            .catch((error) => {
                return callback(error, null);
            });
    }  
}