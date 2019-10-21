//--------------------
//include packages
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

//--------------------
//config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//--------------------
//include router
app.get('/', function (req, res) {
    res.send('Express structure ✔');
});
//admin
app.use('/admin', express.static('public'));
//swagger
app.use('/swagger', express.static('swagger'));
//api
//require('./server/server')(app);

//--------------------
// error handlers

// development error handler
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (error, req, res, next) {
        console.log(error.message || error);
        res.status(error.status || 500).json({
            data: null,
            errors: [{
                errorCode: 9999,
                errorMessage: error.message || error
            }]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error.status || 500).json({
        data: null,
        errors: [{
            errorCode: 9999,
            errorMessage: error.message || error
        }]
    });
});

//--------------------
// start the server
app.listen(port);
console.log('Express server listening on port ' + port);