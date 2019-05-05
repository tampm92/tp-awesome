const logger = require('../../utils/logger');

function create (event) {
    let request = {
        body: {},
        params: {},
        query: {},
        method: ''
    };
    
    try {
        if (event.httpMethod) {
            request.method = event.httpMethod
        }
    
        if (event.body) {
            request.body = JSON.parse(event.body);
        }
    
        if (event.pathParameters) {
            request.params = event.pathParameters;
        }
    
        if (event.queryStringParameters) {
            request.query = event.queryStringParameters;
        }
    } catch (error) {
        logger.error(error);
    }   
    
    request.debug = event;

    return request;
}

module.exports = {
    create
}