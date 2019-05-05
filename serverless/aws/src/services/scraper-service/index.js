const path = require('path');
const util = require('../../utils/util');

class ScraperPlugin {
    apply(registerAction) {
        let absoluteDirectoryPath, loadedResources = [];

        registerAction('beforeStart', async ({
            options
        }) => {
            absoluteDirectoryPath = path.resolve(process.cwd(), options.directory);
            util.rmdir(absoluteDirectoryPath);
        });
    }
}

module.exports = {
    ScraperPlugin
}