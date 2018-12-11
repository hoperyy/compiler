module.exports = ({ userFolder, srcFolder, buildFolder, currentEnv, debugPort }) => {
    require('co')(function*() {
        const VUE_PATH = 'vue/dist/vue.js';

        const path = require('path');
        const fs = require('fs');
        const fse = require('fs-extra');
        const webpack = require('webpack');

        // 监听 webpack 构建结束的插件
        const WebpackOnBuildPlugin = require('on-build-webpack');
        const merge = require('webpack-merge');
        const WebpackDevServer = require('webpack-dev-server');

        const logUtil = require('./utils/util-log');

        /* 引入的各类 webpack 插件 */

        // 解析包资源大小的插件
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        // 生成实体的构建结果文件的插件
        const WriteFilePlugin = require('write-file-webpack-plugin');
        // 创建空的 css 文件的插件
        const PluginCreateBlankCss = require('./plugins/plugin-create-blank-css');
        // 空插件
        const PluginNoop = require('./plugins/plugin-noop');

        function* getFinalConfig({ userFolder, srcFolder, buildFolder, currentEnv, debugPort, webpack, WebpackDevServer }) {
            // 合并用户配置
            const userConfig = yield require('./utils/util-get-user-config')({ userFolder, srcFolder, buildFolder, currentEnv, debugPort, webpack, WebpackDevServer, mode: 'development' });

            // 合并用户配置后的最终配置，包括：{ userFolder, srcFolder, buildFolder, currentEnv, debugPort } 和 userConfig
            const finalConfig = require('./utils/util-merge')({ userFolder, srcFolder, buildFolder, currentEnv, debugPort }, userConfig);

            return finalConfig;
        }

        const finalConfig = yield getFinalConfig({ userFolder, srcFolder, buildFolder, currentEnv, debugPort, webpack, WebpackDevServer });

        // 这里会完成从开发者看到的目录结构，到脚手架编译所需的目录结构的转变
        require('./process-configed-project/index').runProcessor({ watch: true, ...finalConfig  });

        const { cssLoaders, lessLoaders, sassLoaders } = require('./utils/util-get-style-loaders').getDev(finalConfig);

        const finalWebpackConfig = merge.smart(require('./webpack.common')(finalConfig), {
                resolve: {
                    alias: {
                        'vue$': VUE_PATH,
                    },
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
                        }, {
                            test: /\.vue$/,
                            use: [{
                                    loader: 'vue-loader',
                                    options: {
                                        loaders: {
                                            css: cssLoaders,
                                            less: lessLoaders,
                                            sass: sassLoaders,
                                        },
                                    },
                                },
                                segLoaderBody,
                            ],
                            include: [
                                finalConfig.srcFolder
                            ],
                        }]
                },
                plugins: [
                    new PluginCreateBlankCss({
                        entryObj: require('./utils/util-get-entry-obj')(finalConfig),
                        targetDir: path.join(finalConfig.buildFolder, 'static')
                    }),
                    new webpack.HotModuleReplacementPlugin(),
                    new WriteFilePlugin(),
                    new WebpackOnBuildPlugin(() => {
                        require('./utils/util-show-log-after-build-finished')(finalConfig);
                    }),
                    // new BundleAnalyzerPlugin({
                    //     analyzerPort: yield (function getPort(defaultPort) {
                    //         return done => {
                    //             require('get-port')({ port: defaultPort }).then(port => {
                    //                 done(null, port);
                    //             });
                    //         }
                    //     })(49253)
                    // }),
                    (finalConfig.commonJs && finalConfig.hashStatic) ? new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity, }) : new PluginNoop(),
                    (finalConfig.commonJs && finalConfig.hashStatic) ? new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }) : new PluginNoop(),
                    (finalConfig.commonJs && !finalConfig.hashStatic) ? new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'common.js', minChunks: Infinity, }) : new PluginNoop(),
                ]
            });

        logUtil.log(`webpack: Compiling...`);

        Object.keys(finalWebpackConfig.entry).forEach((key) => {
            if (key !== 'vendor' && typeof finalWebpackConfig.entry[key].unshift === 'function') {
                finalWebpackConfig.entry[key].unshift(`webpack-dev-server/client?http://localhost:${finalConfig.debugPort}`, 'webpack/hot/dev-server');
            }
        });

        // 启动 html 处理程序
        const htmlServer = require('./process-html/index')({ ...finalConfig, watch: true, });

        // 启动 webpack
        const webpackServer = new WebpackDevServer(webpack(finalWebpackConfig), {
            contentBase: finalConfig.buildFolder,
            // hot: true,
            historyApiFallback: true,
            quiet: false,
            noInfo: false,
            stats: 'errors-only',
            publicPath: finalWebpackConfig.output.publicPath,
            disableHostCheck: true,
            watchOptions: {
                ignored: /\/node_modules\//,
                poll: 300,
            },
        });

        webpackServer.listen(finalConfig.debugPort);

        require('./utils/util-check-if-restart')({ webpackServer, finalConfig });
    });
};
