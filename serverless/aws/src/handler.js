var handlerMiddleware = require('./middleware/handler-middleware');
var homeController = require('./controllers/homeController');

module.exports = {
    createIssueJiraWebhooks: (event, context) => handlerMiddleware.create(event, context, homeController.createIssueJiraWebhooks),
}