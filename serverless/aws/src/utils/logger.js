function log(...args) {
    console.log(...args);
}

function error(...args) {
    console.error(...args);
}

function warn(...args) {
    console.warn(...args);
}

module.exports = {
    log,
    error,
    warn
}