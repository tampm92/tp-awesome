"use strict";

/**
 * include packages
 */
import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

/**
 * include modules
 */
import {Config} from '../../configs/config';

export class DataAccess {
  public static sequelize: Sequelize.Sequelize;
  public static mysqlInstance: any;

  constructor() {
    DataAccess.connect();
  }
  public static connect() {
    if (this.mysqlInstance) {
      return this.mysqlInstance;
    }

    this.mysqlInstance = {};

    this.sequelize = new Sequelize(Config.database.databaseName, Config.database.username, Config.database.password, {
      host: Config.database.host,
      port: Config.database.port,
      logging: Config.database.logging,
      dialect: Config.database.dialect
    });

    fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "data_access.js") && (file.split('.').pop() === 'js');
      })
      .forEach((file) => {
        var model = this.sequelize.import(path.join(__dirname, file)) as any;
        this.mysqlInstance[model.name] = model;
      });

    Object.keys(this.mysqlInstance).forEach((modelName) => {
      if ("associate" in this.mysqlInstance[modelName]) {
        this.mysqlInstance[modelName].associate(this.mysqlInstance);
      }
    });

    this.mysqlInstance.sequelize = this.sequelize;
    this.mysqlInstance.Sequelize = Sequelize;

    console.log('mysqlInstance is setup');
    return this.mysqlInstance;
  }
  public static checkConnect(callback: (error: any, data: any) => any): any {
    return this.mysqlInstance.sequelize
      .authenticate()
      .then((err: any) => {
        return callback(null, 'Connection has been established successfully');
      }, (err: any) => {
        return callback(err, null);
      })
      .catch((ex: any) => {
        return callback(ex, null);
      });
  }
  public static setupDatabase(callback: (error: any, data: any) => any): any {
    return this.mysqlInstance.sequelize
      .sync({ force: true })
      .then(() => {
        return callback(null, 'database realy');
      })
      .catch((ex: any) => {
        return callback(ex, null);
      });
  }
}
DataAccess.connect();