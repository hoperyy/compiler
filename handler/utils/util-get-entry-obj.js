const getEntryObj = ({ srcDir, noPolyfill }) => {
    // entry.vendor 优先使用用户配置的 vendor，覆盖式
    const fs = require('fs');
    const path = require('path');

    const entryFiles = {};

    let pageDir = require('./util-get-page-dir')(srcDir);
    const logUtil = require('./util-log');

    if (!pageDir) {
        logUtil.warn('找不到页面入口文件，入口文件举例: ./src/pages/index/index.js');
        process.exit(1);
        return;
    }

    fs.readdirSync(pageDir).forEach((fileName) => {
        const dirpath = path.join(pageDir, fileName);
        const indexJsFile = path.join(dirpath, 'index.js');
        const indexHtmlFile = path.join(dirpath, 'index.html');
        const dirname = path.basename(dirpath);

        // 如果 js 文件不存在
        if (!fs.existsSync(indexJsFile)) {
            return;
        }

        if (noPolyfill) {
            entryFiles[`${dirname}/index`] = [
                indexJsFile
            ];
        } else {
            entryFiles[`${dirname}/index`] = [
                'babel-polyfill',
                indexJsFile
            ];
        }
    });

    return entryFiles;
};

module.exports = getEntryObj;
