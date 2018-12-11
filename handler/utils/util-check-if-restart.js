module.exports = ({ webpackServer, finalConfig }) => {
    const fs = require('fs');
    const path = require('path');
    const logUtil = require('./util-log');

    const configFiles = ['qute.config.js'];

    let lastChangeTimeMap = {};
    configFiles.forEach((configFileName) => {
        const configFilePath = path.join(finalConfig.srcFolder, configFileName);

        // 初始化 map 对象
        if (fs.existsSync(configFilePath)) {
            lastChangeTimeMap[configFileName] = fs.statSync(configFilePath).mtime.toString();
        }
    });

    const check = () => {
        configFiles.forEach((configFileName) => {
            const configFilePath = path.join(finalConfig.srcFolder, configFileName);

            if (!fs.existsSync(configFilePath)) {
                return;
            }

            const curMtime = fs.statSync(configFilePath).mtime.toString();

            if (curMtime !== lastChangeTimeMap[configFileName]) {
                clearInterval(timer);
                webpackServer.close();
                require('kill-port')(finalConfig.debugPort).then(() => {
                    logUtil.log('项目配置有修改，重启项目编译');
                    process.send('restart');
                    process.exit(1000);
                }).catch();
            }
        });
    };

    const timer = setInterval(check, 2000);
};
