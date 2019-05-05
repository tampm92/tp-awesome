const path = require('path');
const fs = require("fs");
const logger = require('./logger');

function isRunOnAws() {
    return process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined || process.env.FUNCTION_NAME !== undefined;
}

function stringRandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function rmdir(dir) {
    try {
        if (!fs.existsSync(dir)) {
            return;
        }

        var list = fs.readdirSync(dir);
        for (var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if (filename == "." || filename == "..") {
                // pass these files
            } else if (stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    isRunOnAws: isRunOnAws(),
    stringRandom,
    rmdir
}