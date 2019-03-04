const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const readdirSync = require('recursive-readdir-sync');
const md5 = require('md5');

module.exports = function(srcDir) {
    const docsRootDir = path.join(srcDir, 'docs');
    const pagesRootDir = path.join(srcDir, 'pages');

    /************************************************** 方法定义 ********************************************************/
    // 根据 md 文件生成 html 索引
    const mdFiles = readdirSync(docsRootDir).filter((fileName) => {
        // 过滤
        if (!/(\.git)|(dist)|(node_modules)/.test(fileName) && /\.md/.test(fileName)) {
            return true;
        }

        return false;
    });

    const getRelativeDirPath = mdFilePath => mdFilePath.replace(docsRootDir, '').replace(/\.md$/, '').replace(/^\//, '').replace(/\/$/, '');

    const generatePageForAllMds = (mdFiles) => {
        mdFiles.forEach(mdFilePath => {
            const relativeDirPath = getRelativeDirPath(mdFilePath);
            const docsPagePath = path.join(srcDir, 'pages/docs');
            const curPageDir = path.join(docsPagePath, relativeDirPath);

            const rewriteIndexVueKeywords = ({ mdFilePath, relativeDirPath, docsPagePath }) => {
                const indexVueFilePath = path.join(docsPagePath, relativeDirPath, 'index.vue');
                // 动态生成对 md 的引用字符串，写入 index.vue
                let content = fs.readFileSync(indexVueFilePath, 'utf8');

                content = content.replace(/\$\$\_IMPORT\_\$\$/g, `import MD from '${mdFilePath}';`);
                content = content.replace(/\$\$\_SRCDIR\_\$\$/g, srcDir);

                fs.writeFileSync(indexVueFilePath, content);
            };

            const params = { mdFilePath, relativeDirPath, docsPagePath, curPageDir };

            // 为 markdown 文件生成单独的页面
            fse.copySync(path.join(tptDir, 'docs'), curPageDir);

            // 重写 index.vue 中的关键词
            rewriteIndexVueKeywords(params);
        });
    };

    const rewriteDataJsFile = (mdFiles) => {
        const allDocsAry = [];

        const pageSize = 2;
        const allPageNum = Math.ceil(mdFiles.length / pageSize);

        mdFiles.forEach((mdFilePath, index) => {
            const relativeDirPath = getRelativeDirPath(mdFilePath);
            const arr = relativeDirPath.split('/');

            allDocsAry.push({
                type: arr[0],
                name: arr[arr.length - 1],
                relativePath: `${relativeDirPath}.md`,
                // absolutePath: mdFilePath,
                pageNum: Math.floor(index / pageSize),
                allPageNum
            });
        });

        // 写入 data.js
        const dataFile = path.join(srcDir, 'common/data/index.js');
        const content = fs.readFileSync(dataFile, 'utf8').replace(' $$_ALL_DOCS_ARY_$$', JSON.stringify(allDocsAry));

        fs.writeFileSync(dataFile, content);
    };

    const generateListPage = (mdFiles) => {
        const listPagePath = path.join(pagesRootDir, 'list');
        fse.copySync(path.join(__dirname, 'pages-dir-template/list'), listPagePath);

        const indexVueFilePath = path.join(listPagePath, 'index.vue');
        // 动态生成对 md 的引用字符串，写入 index.vue
        let content = fs.readFileSync(indexVueFilePath, 'utf8');
        
        content = content.replace(/\$\$\_SRCDIR\_\$\$/g, srcDir);

        fs.writeFileSync(indexVueFilePath, content);
    };

    /************************************************** 方法定义结束 ********************************************************/

    /************************************************** 开始解析文件 ********************************************************/
    fse.ensureDirSync(pagesRootDir);

    // 复制模板目录里的 common 目录到 srcDir 目录
    const tptDir = path.join(__dirname, 'pages-dir-template');
    fse.copySync(path.join(tptDir, 'common'), path.join(srcDir, 'common'));

    // 为 docs 生成页面
    generatePageForAllMds(mdFiles);
    rewriteDataJsFile(mdFiles);

    // 生成 list 页面
    generateListPage(mdFiles);
};
