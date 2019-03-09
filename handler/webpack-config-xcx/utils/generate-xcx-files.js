const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const getEntryInfo = require('../../utils/util-get-entry-info');

module.exports = ({ srcDir, distDir }) => {
    fse.ensureDirSync(distDir);

    const configSrcDir = path.join(srcDir, 'wxconfig');

    if (!fs.existsSync(configSrcDir) || !fs.statSync(configSrcDir).isDirectory()) {
        return;
    }

    fs.readdirSync(configSrcDir).forEach(filename => {
        fse.copySync(path.join(configSrcDir, filename), path.join(distDir, filename));
    });

    // 复制 index.json
    const entryInfo = getEntryInfo({ srcDir });

    Object.keys(entryInfo).forEach(dirname => {
        const srcJson = path.join(srcDir, 'pages', dirname, 'index.json');
        const targetJson = path.join(distDir, 'pages', dirname, 'index.json');

        if (fs.existsSync(srcJson)) {
            fse.copySync(srcJson, targetJson);
        }
    });
};