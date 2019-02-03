const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');

module.exports = ({ distDir, srcDir }) => {
    return {
        afterBuild() {
            const srcImgDirPath = path.join(srcDir, 'src/manifest-img');
            const targetImgDirPath = path.join(distDir, 'manifest-img');

            const srcManifestPath = path.join(srcDir, 'src/manifest.json');
            const targetManifestPath = path.join(distDir, 'manifest.json');

            fse.copySync(srcManifestPath, targetManifestPath);
            
            if (fs.existsSync(targetImgDirPath)) {
                fse.removeSync(targetImgDirPath);
            }

            fse.ensureDirSync(targetImgDirPath);
            fse.copySync(srcImgDirPath, targetImgDirPath);
        }
    };
};