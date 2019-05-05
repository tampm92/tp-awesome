function Exception(message, metadata, name = 'ErrorUndefined') {
    this.name = name;
    this.message = message;
    this.metadata = metadata
}
Exception.prototype = new Error();

function create(message, metadata, name) {
    const error = new Exception(message, metadata, name);    
    return error;
}

module.exports = {
    create
}