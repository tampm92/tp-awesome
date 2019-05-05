module.exports = {
    issue: {
        ...require('./create-issue'),
        attachment: {
            ...require('./add-attachment')
        }
    }
}