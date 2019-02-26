const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

module.exports = ({ srcDir, distDir }) => {
    fse.ensureDirSync(distDir);

    const configSrcDir = path.join(srcDir, 'wxconfig');

    if (!fs.existsSync(configSrcDir) || !fs.statSync(configSrcDir).isDirectory()) {
        return;
    }

    fs.readdirSync(configSrcDir).forEach(filename => {
        fse.copySync(path.join(configSrcDir, filename), path.join(distDir, filename));
    });
};