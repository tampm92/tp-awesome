"use strict";

/**
 * include packages
 */
import * as mongoose from "mongoose";

/**
 * include modules
 */
import {BaseModel} from './../../models/base_model';

/**
 * BaseRepository
 */
export abstract class BaseRepository<T extends BaseModel> {
    
    private schema_model: mongoose.Model<mongoose.Document>;;
    
    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this.schema_model = schemaModel;
    }

    create (item: T, callback: (error: any, result: any) => void) {
        this.schema_model.create(item, callback);
    }
    
    retrieve (callback: (error: any, result: any) => void) {
         this.schema_model.find({}, callback)
    }
    
    update (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
            this.schema_model.update({_id: _id}, item, callback);
    }
        
    deleteById (_id: string, callback:(error: any, result: any) => void) {
        this.schema_model.remove({_id: this.toObjectId(_id)}, (err) => callback(err, null));       
    } 
    
    findById (_id: string, callback: (error: any, result: T) => void) {
        this.schema_model.findById( _id, callback);
    }

    findByUsername (username: string, callback: (error: any, result: T) => void) {
        this.schema_model.findOne({username: username}, callback);
    }    
    
    private toObjectId (_id: string) : mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}