const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const getEntryInfo = require('../../utils/util-get-entry-info');

module.exports = ({ srcDir, userDir }) => {
    // 复制 index.json
    const entryInfo = getEntryInfo({ srcDir, fileReg: /\/src\.js$/ });

    const distPagesPath = path.join(userDir, 'dist-pages');

    Object.keys(entryInfo).forEach(dirname => {
        const src = path.join(srcDir, 'pages', dirname);
        const target = path.join(distPagesPath, dirname);

        if (fs.existsSync(src)) {
            fse.copySync(src, target);
        }
    });
};