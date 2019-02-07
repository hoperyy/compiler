/*
 * @bio.config.js
 */
const path = require('path');

module.exports = ({ userDir, srcDir, distDir, taskName, webpack, webpackDevServer }) => {
    return {
        distDir: './dist', // dist dir; default is './dist'

        // port: 9000, // debug port; default is 9000

        replace: {
            $$_CDNURL_$$: {
                'dev-daily': '../static',
                'dev-pre': '../static',
                'dev-prod': '../static',
                'build-daily': '../static',
                'build-pre': '../static',
                'build-prod': '../static',
            },
        },

        // webpack config to be merged; webpack config style required
        webpackConfig: {
            plugins: [
                new webpack.ProvidePlugin({
                    hljs: path.join(srcDir, 'src/website/assets/js/highlight/highlight.pack.js')
                }),
            ]
        },
    };
};
