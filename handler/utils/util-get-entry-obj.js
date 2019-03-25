module.exports = ({ srcDir, polyfill, fileReg }) => {
    // entry.vendor 优先使用用户配置的 vendor，覆盖式
    const getEntryInfo = require('./util-get-entry-info');

    const entryFiles = {};

    let pageDir = require('./util-get-page-dir')(srcDir);
    const logUtil = require('./util-log');

    if (!pageDir) {
        logUtil.warn('no entry file found: ./src/pages/**/index.js');
        process.exit(1);
        return;
    }
    

    const entryInfo = getEntryInfo({ srcDir, fileReg });
    Object.keys(entryInfo).forEach(dirname => {

        if (polyfill) {
            entryFiles[`${dirname}/index`] = [
                'babel-polyfill',
                entryInfo[dirname]
            ];
        } else {
            entryFiles[`${dirname}/index`] = [
                entryInfo[dirname]
            ];
        }
    });

    return entryFiles;
};
