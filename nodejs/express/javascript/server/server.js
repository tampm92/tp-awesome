"use strict";

//--------------------
//include packages
var moment = require('moment');
moment().format();

//--------------------
//include modules
var responseService = require('./providers/reponse_provider');
var ErrorsDefine = require('./configs/errors_define');
var mysqlModels = require("./mysql_models");

module.exports = function (app) {
    app.get(buildUrl(''), function (req, res) {
        var today = moment.utc().toISOString();
        return responseService.asSuccess(req, res, {
            message: "Express structure",
            time: today
        });
    });

    app.use(buildUrl('test'), require('./controllers/test'));
};

function buildUrl(name) {
    return "/api/" + name;
};