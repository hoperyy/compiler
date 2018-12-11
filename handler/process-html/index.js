const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const rename = require('gulp-rename');
const htmlmin = require("gulp-htmlmin");
const processHtmlContent = require('./process-html-content');
const checkUpdateInHtml = require('../check-update/in-html');
const utilGetPageDir = require('../utils/util-get-page-dir');
const logUtil = require('../utils/util-log');

let writeHtmlDelayTimer = null;

const rewriteHtml = (dir, options) => {
    clearTimeout(writeHtmlDelayTimer);

    writeHtmlDelayTimer = setTimeout(() => {
        processHtmlContent(dir, options);
        checkUpdateInHtml(dir);
    }, 500);
};

function buildHtml(finalConfig) {
    const { srcFolder, buildFolder, replace, currentEnv, onHtmlBuild } = finalConfig;

    let pagesDir = utilGetPageDir(srcFolder);

    if (!pagesDir) {
        logUtil.error('\n\n项目中找不到页面入口 html 文件\n\n');
        return;
    }

    let stream = gulp.src([`!${path.join(pagesDir, '/**/*.tpl.html')}`, path.join(pagesDir, '/**/*.html')]);

    if (replace) {
        Object.keys(replace).forEach((key) => {
            stream = stream.pipe(gulpReplace(new RegExp(key.replace(/\$/g, '\\$'), 'g'), replace[key][currentEnv]));
        });
    }

    const buildPagesDir = path.join(buildFolder, 'pages');

    let pipeline = null;

    if (/build/.test(currentEnv)) {
        pipeline = stream.pipe(rename((_path) => {
            _path.basename = _path.dirname;
            _path.dirname = '';
        })).pipe(htmlmin({
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace: true,
            removeComments: false
            })).pipe(gulp.dest(buildPagesDir));
    } else {
        pipeline = stream.pipe(rename((_path) => {
            _path.basename = _path.dirname;
            _path.dirname = '';
        })).pipe(gulp.dest(buildPagesDir));
    }
    
    // build 目录的 html 文件生成后，添加一些通用脚本，比如埋点、jsbridge、flexible 等
    pipeline.on('end', () => {
        rewriteHtml(buildPagesDir, {
            ...finalConfig,
            CDN_URL: replace['$$_CDNURL_$$'][currentEnv],
            callback: () => {
                // 执行 onHtmlBuild 回调
                if (onHtmlBuild) {
                    if (fs.existsSync(path.join(buildFolder, 'pages'))) {
                        const htmlFiles = fs.readdirSync(path.join(buildFolder, 'pages')).filter(filename => /\.html$/.test(filename)).map(filename => path.join(buildFolder, 'pages', filename));
                        onHtmlBuild(htmlFiles);
                    }
                }
            }
        });
    });

}

function presetHtml(finalConfig) {
    const { srcFolder, watch } = finalConfig;

    buildHtml(finalConfig);

    const pageDir = utilGetPageDir(srcFolder);

    if (watch) {
        return htmlWatcher = gulp.watch([path.join(pageDir, '/**/*.html')], () => {
            buildHtml(finalConfig);
        });
    }

    return null;
}

module.exports = presetHtml;
