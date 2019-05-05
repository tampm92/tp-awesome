const handlerRequest = require('./handler-request');
const handlerResponse = require('./handler-response');

async function create (event, context, main) {
    let request = handlerRequest.create(event);
    let response = handlerResponse.create();
    let result = await main(request, response);

    return result;
};

module.exports = {
    create: create
}