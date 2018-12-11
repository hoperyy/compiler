const fs = require('fs');
const path = require('path');
const isrelative = require('is-relative');

const getDefaultReplace = require('./util-get-default-replace');
const logUtil = require('./util-log');

module.exports = function* ({ userFolder, srcFolder, buildFolder, currentEnv, debugPort, webpack, WebpackDevServer, mode }) {
    // 开放到 qute.config.js 中的 API，设置了一些默认值
    let mergedUserConfig = {
        buildFolder,
        debugPort,
        replace: null,
        afterBuild: null,
        webpackConfig: {},
        onHtmlBuild: null,
        commonEntry: null,
        hashStatic: false,
        publishWithoutVersion: false,
        noPolyfill: false,
        commonJs: true
    };

    const userConfigFile = path.join(srcFolder, 'qute.config.js');

    if (!fs.existsSync(userConfigFile)) {
        return;
    }

    let userConfig = require(userConfigFile);

    // 支持开发者的配置文件有两种格式：function / json object
    if (typeof userConfig === 'function') {
        // 这些是传递给使用者的参数
        userConfig = userConfig({ userFolder, srcFolder, buildFolder, currentEnv, webpack, WebpackDevServer });
    } else {
        throw new Error('qute.config.js 格式错误，必须是函数');
    }

    // 统一做 merge 处理
    Object.keys(mergedUserConfig).forEach(configName => {
        if (userConfig[configName] !== undefined) {
            mergedUserConfig[configName] = userConfig[configName];
        }
    });

    // 对 buildFolder 特殊处理
    if (mergedUserConfig.buildFolder) {
        if (typeof mergedUserConfig.buildFolder === 'string') {
            if (isrelative(mergedUserConfig.buildFolder)) {
                mergedUserConfig.buildFolder = path.join(userFolder, mergedUserConfig.buildFolder);
            }
        } else {
            throw new Error('./qute.config.js 中的 buildFolder 应该是字符串，请填写正确的格式');
        }
    }

    // 对 hashStatic 特殊处理
    if (mergedUserConfig.hashStatic && mode === 'development') {
        mergedUserConfig.hashStatic = false;
        logUtil.warn('本地开发环境下不支持资源 hash');
    }

    // 针对 replace 字段单独处理
    const defaultReplace = yield getDefaultReplace();

    mergedUserConfig.replace = Object.assign(defaultReplace, mergedUserConfig.replace);

    // 单独获取是否有 commonJs
    if (mergedUserConfig.webpackConfig && mergedUserConfig.webpackConfig.entry && mergedUserConfig.webpackConfig.entry.vendor === null) {
        logUtil.warn('过段时间不再支持 webpackConfig 配置项中 "webpackConfig.entry.vendor === null" 设置，若不希望生成 common.js，请直接配置 commonJs: false');
        mergedUserConfig.commonJs = false;
    }

    // 单独对 config.js 中的配置进行处理
    if (require('../process-configed-project/index').isConfigedProject({ userFolder })) {
        const configValue = require('../process-configed-project/index').getFormattedConfigValue({ srcFolder });
        const oldReplace = configValue.vars;

        if (oldReplace) {
            // 格式化
            const newReplace = {};

            Object.keys(oldReplace).forEach(keyword => {
                newReplace[keyword] = {};
                if (!/mock/.test(keyword)) {
                    const keywordObj = oldReplace[keyword];

                    Object.keys(keywordObj).forEach(envPartLeftKeyword => {
                        if (/(build)|(dev)/.test(envPartLeftKeyword)) {
                            const envPartLeftObj = keywordObj[envPartLeftKeyword];

                            Object.keys(envPartLeftObj).forEach(envPartRightKeyword => {
                                newReplace[keyword][`${envPartLeftKeyword}-${envPartRightKeyword}`] = envPartLeftObj[envPartRightKeyword];
                            });
                        }
                    });
                }

                // todo mock
            });

            Object.assign(mergedUserConfig.replace, newReplace);
        }
    }

    return mergedUserConfig;
};
