const http = require('../../utils/http');
const logger = require('../../utils/logger');
const jiraToken = process.env.JIRA_TOKEN;
const jiraBaseUrl = process.env.JIRA_BASE_URL;

function handleOptions(options) {
    options.baseURL = jiraBaseUrl;
    var headers = options.headers ? options.headers : {};
    headers.Authorization = jiraToken;
    options.headers = headers;
    return options;
}

async function get(options) {
    try {
        options = handleOptions(options);
        const response = await http.get(options);
        return response.data;
    } catch (error) {
        logger.error(error);
        return;
    }
}

async function post(options) {
    try {
        options = handleOptions(options);
        const response = await http.post(options);
        return response.data;
    } catch (error) {
        logger.error(error);
        return;
    }
}

module.exports = {
    get,
    post
}