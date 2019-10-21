"use strict";
/**
 * BaseRepository
 */
var BaseRepository = (function () {
    function BaseRepository(schemaModel) {
        this.schema_model = schemaModel;
    }
    BaseRepository.prototype.create = function (item, callback) {
        this.schema_model.create(item)
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    BaseRepository.prototype.retrieve = function (callback) {
        this.schema_model.findAndCountAll({})
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    BaseRepository.prototype.update = function (idItem, item, callback) {
        this.schema_model.update(item, {
            where: {
                id: idItem
            }
        })
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    BaseRepository.prototype.deleteById = function (idItem, callback) {
        this.schema_model.destroy({
            where: {
                id: idItem
            }
        })
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    BaseRepository.prototype.findById = function (idItem, callback) {
        this.schema_model.findOne({
            where: {
                id: idItem
            }
        })
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    BaseRepository.prototype.findByUsername = function (username, callback) {
        this.schema_model.findOne({
            where: {
                username: username
            }
        })
            .then(function (data) {
            return callback(null, data);
        })
            .catch(function (error) {
            return callback(error, null);
        });
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map