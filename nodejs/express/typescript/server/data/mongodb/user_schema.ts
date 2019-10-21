import {DataAccess} from './data_access';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class User {

    static get schema() {
        var schema = mongoose.Schema({
            username: {
                type: String,
                required: true,
                unique: true,
                dropDups: true
            },
            password: {
                type: String,
                required: true
            },
            displayName: {
                type: String,
                required: false
            }
        },
            {
                timestamps: true
            });

        return schema;
    }
}
var schema = mongooseConnection.model("Users", User.schema);
export = schema;