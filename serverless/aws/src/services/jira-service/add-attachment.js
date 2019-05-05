const jiraHttp = require('./jira-http');
const logger = require('../../utils/logger');
const FormData = require('form-data');
const Archiver = require('archiver');

async function addWithZip (issueKey, pathFolder, fileName) {
    try {
        var zip = Archiver('zip');
        zip.directory(pathFolder, false).finalize();
        
        return await add(issueKey, zip, `${fileName}.zip`)
    } catch (error) {
        logger.error(error);
        return;
    }
}

async function add (issueKey, file, fileNameWithExtension) {
    try {
        const form = new FormData();
        form.append('file', file, fileNameWithExtension);

        let options = {
            url: `issue/${issueKey}/attachments`,
            data: form,
            headers: {
                ...form.getHeaders(),
                'Content-Type': 'multipart/form-data',
                'X-Atlassian-Token': 'no-check'
            }
        };
        const response = await jiraHttp.post(options);
        return response;
    } catch (error) {
        logger.error(error);
        return;
    }
}

module.exports = {
    add,
    addWithZip
}