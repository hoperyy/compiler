function* getDefaultReplace({ userFolder }) {
    return {
        '$$_CDNURL_$$': {
            'dev-daily': `../static`,
            'dev-pre': `../static`,
            'dev-prod': `../static`,

            'build-daily': `../static`,
            'build-pre': `../static`,
            'build-prod': `../static`
        }
    };
}

module.exports = getDefaultReplace;
