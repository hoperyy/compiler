const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const rename = require('gulp-rename');
const htmlmin = require("gulp-htmlmin");
const processHtmlContent = require('./process-html-content');
const utilGetPageDir = require('../../../utils/util-get-page-dir');
const logUtil = require('../../../utils/util-log');

let writeHtmlDelayTimer = null;

const rewriteHtml = (dir, options) => {
    clearTimeout(writeHtmlDelayTimer);

    writeHtmlDelayTimer = setTimeout(() => {
        processHtmlContent(dir, options);
    }, 500);
};

function buildHtml(finalConfig) {
    const { srcDir, userDir, distDir, replace, taskName, onHtmlBuild } = finalConfig;

    const distPagesPath = path.join(userDir, 'dist-pages');

    let pagesDir = utilGetPageDir(srcDir);

    if (!pagesDir) {
        logUtil.error('\n\n项目中找不到页面入口 html 文件\n\n');
        return;
    }

    let stream = gulp.src([path.join(pagesDir, '/**/*.wxml')]);

    if (replace) {
        Object.keys(replace).forEach((key) => {
            stream = stream.pipe(gulpReplace(new RegExp(key.replace(/\$/g, '\\$'), 'g'), replace[key][taskName]));
        });
    }

    let pipeline = null;

    pipeline = stream.pipe(rename((_path) => {
        _path.basename = 'index';
        _path.dirname = _path.dirname;
        _path.extname = '.wxml';
    }));

    if (/build/.test(taskName)) {
        pipeline = pipeline.pipe(htmlmin({
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace: true,
            removeComments: false
        }));
    }

    pipeline = pipeline.pipe(gulp.dest(distPagesPath));
    
    // build 目录的 html 文件生成后，添加一些通用脚本，比如埋点、jsbridge、flexible 等
    pipeline.on('end', () => {
        rewriteHtml(distPagesPath, {
            ...finalConfig,
            CDN_URL: replace['$$_CDNURL_$$'][taskName],
            callback: () => {
                // 执行 onHtmlBuild 回调
                if (onHtmlBuild) {
                    if (fs.existsSync(distPagesPath)) {
                        const htmlFiles = fs.readdirSync(distPagesPath).filter(filename => /\.wxml$/.test(filename)).map(filename => path.join(distPagesPath, filename));
                        onHtmlBuild(htmlFiles);
                    }
                }
            }
        });
    });

}

function presetHtml(finalConfig) {
    const { srcDir, watch } = finalConfig;

    buildHtml(finalConfig);

    const pageDir = utilGetPageDir(srcDir);

    if (watch) {
        return htmlWatcher = gulp.watch([path.join(pageDir, '/**/*.wxml')], () => {
            buildHtml(finalConfig);
        });
    }

    return null;
}

module.exports = presetHtml;
