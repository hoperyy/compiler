const getEntryObj = ({ srcDir, polyfill }) => {
    // entry.vendor 优先使用用户配置的 vendor，覆盖式
    const fs = require('fs');
    const path = require('path');
    const readdirSync = require('recursive-readdir-sync');

    const entryFiles = {};

    let pageDir = require('./util-get-page-dir')(srcDir);
    const logUtil = require('./util-log');

    if (!pageDir) {
        logUtil.warn('no entry file found: ./src/pages/**/index.js');
        process.exit(1);
        return;
    }

    const indexJsReg = /\/index\.js$/;
    readdirSync(pageDir).forEach((indexJsFile) => {
        if (!indexJsReg.test(indexJsFile)) {
            return;
        }

        const dirname = indexJsFile.replace(path.join(srcDir, 'pages/'), '').replace(indexJsReg, '');

        if (polyfill) {
            entryFiles[`${dirname}/index`] = [
                'babel-polyfill',
                indexJsFile
            ];
        } else {
            entryFiles[`${dirname}/index`] = [
                indexJsFile
            ];
        }
    });

    return entryFiles;
};

module.exports = getEntryObj;
