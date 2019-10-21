"use strict";

//--------------------
//include packages
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var expressValidator = require('express-validator');

var app = express();
var port = process.env.PORT || 3000;

//--------------------
//config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));

//--------------------
//include router
app.get('/', function (req, res) {
    res.send('Server Ok');
});
//public
app.use('/public', express.static('public'));
//swagger
app.use('/swagger', express.static('swagger'));
//webapp
app.use('/webapp', express.static('web_app'));
//server
// var server = require('./build/server/server');
// var serverApi = new server.ApiServer();
// serverApi.routers((urlApi, routerApi) => {
//     app.use('/api' + urlApi, routerApi);
// });

//--------------------
// error handlers
// var baseApiControllerModule = require('./build/server/api_controllers/base_api_controller');
// var baseApiController = new baseApiControllerModule.BaseApiController();

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var errorReponse = {
//         errorCode: 9998,
//         errorMessage: 'Not Found URL',
//         status: 404
//     };
//     next(errorReponse);
// });

// // catch 500
// app.use(function (error, req, res, next) {
//     var errorReponse = {
//         errorCode: error.errorCode || 9999,
//         errorMessage: error.errorMessage || error || 'Server can not handler this error. Please contact to admin!'
//     };

//     baseApiController.asFailedReponse(req, res, next, errorReponse, error.status || 500);
// });

//--------------------
// start the server
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});