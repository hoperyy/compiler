const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const readdirSync = require('recursive-readdir-sync');

const getRelativeObj = require('./get-relative-obj');

module.exports = function(srcDir) {
    // 读取所有文件夹
    // const dirs = fs.readdirSync(srcDir).filter((folderName) => {
    //     // 读取所有文件夹
    //     if (!fs.statSync(path.join(srcDir, folderName)).isDirectory()) {
    //         return false;
    //     }

    //     // 过滤
    //     if (/\.git/.test(folderName)) {
    //         return false;
    //     }

    //     return true;
    // });

    const mdFiles = readdirSync(srcDir).filter((fileName) => {
        // 过滤
        if (!/\.git/.test(fileName) && /\.md/.test(fileName)) {
            return true;
        }

        return false;
    });

    fse.ensureDirSync(srcDir, 'pages');

    // 根据 md 文件生成 html 索引
    mdFiles.forEach(mdFilePath => {
        // 根据 md 文件名字生成目录名
        const dirName = mdFilePath.replace(srcDir, '').replace(/\.md$/, '');

        // pages 目录相关
        const pageRootDir = path.join(srcDir, 'pages');
        const curPageDir = path.join(pageRootDir, dirName);

        fse.copySync(path.join(__dirname, 'pages-dir-template'), curPageDir);

        // 动态生成对 md 的引用字符串，写入 index.vue
        const relativeObj = getRelativeObj(path.join(curPageDir, 'index.js'), pageRootDir);
        const targetVueFile = path.join(curPageDir, 'index.vue');

        let content = fs.readFileSync(targetVueFile, 'utf8');

        content = content.replace('$$_IMPORT_$$', `import MD from '../${relativeObj.preDot}${relativeObj.relativeDirPath}.md';`);
        content = content.replace('$$_RENDER_$$', `this.mdContent = md.render(MD);`);

        fs.writeFileSync(targetVueFile, content);
    });
};
