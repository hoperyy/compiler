const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const readdirSync = require('recursive-readdir-sync');
const md5 = require('md5');

const getRelativeObj = require('./get-relative-obj');

module.exports = function(srcDir) {
    const docsRootDir = path.join(srcDir, 'docs');
    const pagesRootDir = path.join(srcDir, 'pages');

    fse.ensureDirSync(pagesRootDir);

    // 根据 md 文件生成 html 索引
    const mdFiles = readdirSync(docsRootDir).filter((fileName) => {
        // 过滤
        if (!/(\.git)|(dist)|(node_modules)/.test(fileName) && /\.md/.test(fileName)) {
            return true;
        }

        return false;
    });

    // 生成通用 highlightjs 文件
    const tptDir = path.join(__dirname, 'pages-dir-template');
    fse.copySync(path.join(tptDir, 'common'), path.join(srcDir, 'common'));

    const generatePagesFromDocsDir = (mdFilePath) => {
        const relativeDirPath = mdFilePath.replace(docsRootDir, '').replace(/\.md$/, '').replace(/^\//, '').replace(/\/$/, '');

        const docsPagePath = path.join(srcDir, 'pages/docs');

        const curPageDir = path.join(docsPagePath, relativeDirPath);

        fse.copySync(path.join(tptDir, 'docs'), curPageDir);

        const indexVueFilePath = path.join(docsPagePath, relativeDirPath, 'index.vue');
        // 动态生成对 md 的引用字符串，写入 index.vue
        let content = fs.readFileSync(indexVueFilePath, 'utf8');

        content = content.replace(/\$\$\_IMPORT\_\$\$/g, `import MD from '${mdFilePath}';`);
        content = content.replace(/\$\$\_SRCDIR\_\$\$/g, srcDir);

        fs.writeFileSync(indexVueFilePath, content);
    };

    mdFiles.forEach(mdFilePath => {
        generatePagesFromDocsDir(mdFilePath);
    });
};
