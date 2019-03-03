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

    // 生成通用 highlightjs 文件
    // const tptDir = path.join(__dirname, 'pages-dir-template');
    // fse.copySync(path.join(tptDir, 'highlightjs'), path.join(srcDir, 'common/highlightjs'));

    // const generatePagesFromDocsDir = (mdFilePath) => {
    //     const dirName = mdFilePath.replace(docsRootDir, '').replace(/\.md$/, '');
    //     const curPageDir = path.join(srcDir, 'pages', dirName);

    //     fse.copySync(path.join(tptDir, 'detail'), curPageDir);

    //     readdirSync(curPageDir).forEach(filePath => {
    //         // 动态生成对 md 的引用字符串，写入 index.vue
    //         let content = fs.readFileSync(filePath, 'utf8');

    //         content = content.replace('$$_IMPORT_$$', `import MD from '${mdFilePath}';`);
    //         content = content.replace('$$_RENDER_$$', `this.mdContent = MD;`);
    //         content = content.replace(/\$\$\_SRCDIR\_\$\$/g, srcDir);

    //         fs.writeFileSync(filePath, content);
    //     });
    // };

    const generateDocsPage = () => {
        const mdFiles = readdirSync(docsRootDir).filter((fileName) => {
            // 过滤
            if (!/(\.git)|(dist)|(node_modules)/.test(fileName) && /\.md/.test(fileName)) {
                return true;
            }

            return false;
        });

        fse.copySync(path.join(__dirname, 'pages-dir-template/docs'), path.join(pagesRootDir, 'docs'));

        // 根据 docs 生成各自的 component
        const importsArr = [];
        const routesArr = [];
        mdFiles.forEach(mdFilePath => {
            // 根据 md 文件名字生成目录名
            const relativeDirPath = mdFilePath.replace(docsRootDir, '').replace(/\.md$/, '').replace(/^\//, '').replace(/\/$/, '');
            const md5RelativeDirPath = md5(relativeDirPath);

            // 路由相关
            const componentName = `Component_${md5RelativeDirPath}`;
            importsArr.push(`const ${componentName} = import('./docs-components/${relativeDirPath}.vue');`);
            routesArr.push(`{ path: '/${relativeDirPath}',  component: ${ componentName } }`);

            // 生成 component 文件
            const docsPagePath = path.join(pagesRootDir, 'docs');
            const componentVueFilePath = path.join(path.join(docsPagePath, 'docs-components', `${relativeDirPath}.vue`));
            const componentVueFileContent = fs.readFileSync(path.join(docsPagePath, 'docs-components/template.vue'), 'utf8').replace('$$_IMPORT_$$', `import MD from '${mdFilePath}';`).replace(/\$\$\_DOCS\_PAGE\_PATH\_\$\$/g, docsPagePath);
            fse.ensureFileSync(componentVueFilePath);
            fs.writeFileSync(componentVueFilePath, componentVueFileContent);
        });

        // 重写 index.js 的子路由
        const indexJsFilePath = path.join(pagesRootDir, 'docs/index.js');
        let indexJsContent = fs.readFileSync(indexJsFilePath, 'utf8');
        indexJsContent = indexJsContent.replace(/\$\$\_IMPORT\_\$\$/, importsArr.join('\n'));
        indexJsContent = indexJsContent.replace(/\$\$\_ROUTES\_\$\$/, routesArr.join(',\n'));

        fs.writeFileSync(indexJsFilePath, indexJsContent);
    };

    generateDocsPage();
};
