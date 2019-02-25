function* getDefaultReplace() {
    return {
        '$$_CDNURL_$$': {
            'h5-dev': `../static`,
            'h5-dev-daily': `../static`,
            'h5-dev-pre': `../static`,
            'h5-dev-prod': `../static`,

            'h5-build': `../static`,
            'h5-build-daily': `../static`,
            'h5-build-pre': `../static`,
            'h5-build-prod': `../static`,

            'xcx-dev': `../static`,
            'xcx-dev-daily': `../static`,
            'xcx-dev-pre': `../static`,
            'xcx-dev-prod': `../static`,

            'xcx-build': `../static`,
            'xcx-build-daily': `../static`,
            'xcx-build-pre': `../static`,
            'xcx-build-prod': `../static`,
        }
    };
}

module.exports = getDefaultReplace;
