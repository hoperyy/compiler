module.exports = ({ userDir, srcDir, distDir, taskName, watch }) => {
    require('co')(function* () {
        const webpack = require('webpack');
        const merge = require('webpack-merge');

        // 解析包资源大小的插件
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        const ExtractTextPlugin = require('extract-text-webpack-plugin');
        const StringReplacePlugin = require('string-replace-webpack-plugin');
        const NoopPlugin = require('../plugins/plugin-noop');

        const userConfig = yield require('../utils/util-get-user-config')({ userDir, srcDir, distDir, taskName, webpack, mode: 'production', defaultReplace: {
                '$$_CDNURL_$$': {
                    'xcx-dev': `../static`,
                    'xcx-dev-daily': `../static`,
                    'xcx-dev-pre': `../static`,
                    'xcx-dev-prod': `../static`,

                    'xcx-build': `../static`,
                    'xcx-build-daily': `../static`,
                    'xcx-build-pre': `../static`,
                    'xcx-build-prod': `../static`,
                }
            } });

        // 合并用户配置后的最终配置，包括：{ userDir, srcDir, distDir, taskName } 和 userConfig
        const finalConfig = require('../utils/util-merge')({ userDir, srcDir, distDir, taskName }, userConfig);

        const logUtil = require('../utils/util-log');

        const { cssLoaders, lessLoaders, sassLoaders } = require('../utils/util-get-style-loaders').getProd({ ...finalConfig, ExtractTextPlugin });

        const finalWebpackConfig = merge.smart(require('./webpack.common')(finalConfig), {
            watch,
            stats: {
                errors: true
            },
            module: {
                rules: [{
                    test: /\.css$/,
                    use: cssLoaders,
                }, {
                    test: /\.less$/,
                    use: lessLoaders,
                }, {
                    test: /\.(scss|sass)$/,
                    use: sassLoaders,
                }]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"',
                    },
                }),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: true,
                    },
                }),
                new ExtractTextPlugin({
                    filename: '[name].wxss',
                    disable: false,
                    allChunks: true // 将所有 css 全部抽离到 css 文件，包括异步组件中的 css
                }),
            ],
        });

        // 复制 wxconfig
        require('./utils/generate-xcx-files')({ ...finalConfig });

        // 启动 html 处理程序
        require('./utils/process-html/index')({ ...finalConfig, watch, compress: false });

        // 启动 webpack
        logUtil.log('webpack: Compiling...');
        webpack(finalWebpackConfig, (err, stats) => {
            if (err) {
                logUtil.error('Compilication failed.');

                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                process.exit(1);
                return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                let hasBuildError = false;

                for (let i = 0, len = info.errors.length; i < len; i++) {
                    if (!/from\s*UglifyJs/i.test(info.errors[i])) {
                        hasBuildError = true;
                        break;
                    }
                }

                if (hasBuildError) {
                    logUtil.error('Compilication failed.');
                    console.error(info.errors);
                    process.exit(1);
                }
            }

            if (stats.hasWarnings()) {
                // console.warn(info.warnings);
            }

            global.quteCompilicationDone = true;
            logUtil.log('Compilication done.');
        });
    });
};
