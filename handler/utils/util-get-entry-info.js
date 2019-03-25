module.exports = ({ srcDir, fileReg = /\/index\.js$/ }) => {
    const path = require('path');
    const readdirSync = require('recursive-readdir-sync');

    let pageDir = require('./util-get-page-dir')(srcDir);
    const logUtil = require('./util-log');

    if (!pageDir) {
        logUtil.warn('no entry file found: ./src/pages/**/index.js');
        process.exit(1);
        return;
    }

    const map = {};
    readdirSync(pageDir).forEach((indexJsFile) => {
        if (!fileReg.test(indexJsFile)) {
            return;
        }

        const dirname = indexJsFile.replace(path.join(srcDir, 'pages/'), '').replace(fileReg, '');

        map[dirname] = indexJsFile;
    });

    return map;
};;
