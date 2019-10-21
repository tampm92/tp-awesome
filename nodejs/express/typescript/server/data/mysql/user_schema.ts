"use strict";

/**
 * include packages
 */
import {DataTypes, Sequelize, DefineAttributes} from 'sequelize';

/**
 * User
 */
class User {

  static schema(sequelize: Sequelize, dataTypes: DataTypes): any {
    let schemaUser: DefineAttributes = {
      username: { 
        type: dataTypes.STRING,
        unique: true
      },
      password: { 
        type: dataTypes.STRING 
      },
      displayName: { 
        type: dataTypes.STRING 
      }
    };

    return sequelize.define("Users", schemaUser);
  }
}

export = User.schema;