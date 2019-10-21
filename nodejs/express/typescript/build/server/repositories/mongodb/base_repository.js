"use strict";
/**
 * include packages
 */
var mongoose = require("mongoose");
/**
 * BaseRepository
 */
var BaseRepository = (function () {
    function BaseRepository(schemaModel) {
        this.schema_model = schemaModel;
    }
    ;
    BaseRepository.prototype.create = function (item, callback) {
        this.schema_model.create(item, callback);
    };
    BaseRepository.prototype.retrieve = function (callback) {
        this.schema_model.find({}, callback);
    };
    BaseRepository.prototype.update = function (_id, item, callback) {
        this.schema_model.update({ _id: _id }, item, callback);
    };
    BaseRepository.prototype.deleteById = function (_id, callback) {
        this.schema_model.remove({ _id: this.toObjectId(_id) }, function (err) { return callback(err, null); });
    };
    BaseRepository.prototype.findById = function (_id, callback) {
        this.schema_model.findById(_id, callback);
    };
    BaseRepository.prototype.findByUsername = function (username, callback) {
        this.schema_model.findOne({ username: username }, callback);
    };
    BaseRepository.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map