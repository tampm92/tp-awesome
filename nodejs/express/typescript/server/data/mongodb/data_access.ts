"use strict";

/**
 * include packages
 */
import * as mongoose from 'mongoose';

/**
 * include modules
 */
import {Config} from '../../configs/config';


export class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    public static connect(): mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("mongooseInstance is setup");
        });

        this.mongooseInstance = mongoose.connect(Config.database.url);
        return this.mongooseInstance;
    }
    public static checkConnect(callback: (error: any, data: any) => any): any {
        if (mongoose.connection.readyState === 0) {
            return callback('Connection mongodb fails', null);
        }

        return callback(null, 'Connection mongodb successfully');
    }
    public static setupDatabase(callback: (error: any, data: any) => any): any {
        if (mongoose.connection.readyState === 0) {
            return callback('Connection mongodb fails', null);
        }

        return callback(null, 'Connection mongodb successfully');
    }
}

DataAccess.connect();
