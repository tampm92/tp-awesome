/**
 * Config
 */
export class Config {
    private static isProduction = false;
    
    /**
     * Authentication Config
     */
    public static authentication = {
        secret: 'secret'
    };

    /**
     * Database Config
     */
    private static databaseProduction = {
        host: 'localhost',
        port: 3306,
        databaseName: 'tstest',
        username: 'root',
        password: '',
        logging: false,
        dialect: 'mysql',
        url: 'mongodb://localhost/myappdatabase'
    };
    private static databaseDevelopment = {
        host: 'localhost',
        port: 3306,
        databaseName: 'tstest',
        username: 'root',
        password: '',
        logging: false,
        dialect: 'mysql',
        url: 'mongodb://localhost/myappdatabase'
    }; 
    public static database = Config.isProduction ? Config.databaseProduction : Config.databaseDevelopment;
}