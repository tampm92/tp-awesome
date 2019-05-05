function create() {
    let response = {
        asSuccess: createResponseAsSuccess,
        asError: createResponseAsError
    };

    return response;
}

function createResponse(data = null, error = null, message = null, statusCode = 200) {
    let responseData = {
        statusCode: statusCode,
        body: JSON.stringify({
            message,
            data,
            error
        }),
    };

    return responseData;
}

function createResponseAsSuccess(data, message, statusCode = 200) {
    let responseData = createResponse(data, null, message, statusCode);
    return responseData;
}

function createResponseAsError(error, message, statusCode = 400) {
    let responseData = createResponse(null, error, message, statusCode);
    return responseData;
}

module.exports = {
    create
}