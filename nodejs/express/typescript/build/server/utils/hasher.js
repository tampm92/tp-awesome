"use strict";
/**
 * include packages
 */
var crypto = require("crypto");
/**
 * HashString
 */
var HasherString = (function () {
    function HasherString() {
        this.saltLength = 24;
    }
    HasherString.prototype.createHash = function (data) {
        var salt = this.generateSalt(this.saltLength);
        var hash = this.md5(data + salt);
        return salt + hash;
    };
    HasherString.prototype.validateHash = function (hash, data) {
        var salt = hash.substr(0, this.saltLength);
        var validHash = salt + this.md5(data + salt);
        return hash === validHash;
    };
    HasherString.prototype.generateSalt = function (lenght) {
        var set = 'abcdefghijk0123456789ABCDEFGHIJKlmnopqurstuvwxyzLMNOPQURSTUVWXYZ', setLen = set.length, salt = '';
        for (var i = 0; i < lenght; i++) {
            var p = Math.floor(Math.random() * setLen);
            salt += set[p];
        }
        return salt;
    };
    HasherString.prototype.md5 = function (data) {
        return crypto.createHash('md5').update(data).digest('hex');
    };
    return HasherString;
}());
exports.HasherString = HasherString;
//# sourceMappingURL=hasher.js.map