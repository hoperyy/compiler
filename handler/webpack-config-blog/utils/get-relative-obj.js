const path = require('path');

module.exports = (filePath, rootPath) => {
    let relativeDirPath = path.dirname(filePath).replace(rootPath, '').replace(/^\//, '').replace(/\/$/, '');
    
    // relativeDirPath = relativeDirPath.split('/').slice(1).join('/');

    const level = relativeDirPath.split('/').length;

    let preDot = '';

    for (let i = 0; i < level; i++) {
        preDot += '../';
    }

    return {
        preDot,
        relativeDirPath
    };
};
