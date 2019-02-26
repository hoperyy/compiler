const getReplaceLoader = (replace, taskName) => {
    // if (Object.keys(replace).length == 0) return null;

    const StringReplacePlugin = require('string-replace-webpack-plugin');
    const replacements = [];

    Object.keys(replace).forEach((key) => {
        replacements.push({
            pattern: new RegExp(key.replace(/\$/g, '\\$'), 'g'),
            replacement() {
                return replace[key][taskName];
            },
        });
    });

    return StringReplacePlugin.replace({ replacements });
};

module.exports = getReplaceLoader;
