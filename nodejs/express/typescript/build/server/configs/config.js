"use strict";
/**
 * Config
 */
var Config = (function () {
    function Config() {
    }
    Config.isProduction = false;
    /**
     * Authentication Config
     */
    Config.authentication = {
        secret: 'secret'
    };
    /**
     * Database Config
     */
    Config.databaseProduction = {
        host: 'localhost',
        port: 3306,
        databaseName: 'tstest',
        username: 'root',
        password: '',
        logging: false,
        dialect: 'mysql',
        url: 'mongodb://localhost/myappdatabase'
    };
    Config.databaseDevelopment = {
        host: 'localhost',
        port: 3306,
        databaseName: 'tstest',
        username: 'root',
        password: '',
        logging: false,
        dialect: 'mysql',
        url: 'mongodb://localhost/myappdatabase'
    };
    Config.database = Config.isProduction ? Config.databaseProduction : Config.databaseDevelopment;
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map