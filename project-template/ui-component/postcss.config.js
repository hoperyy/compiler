module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "Android >= 4",
                "iOS >= 5"
            ],
            cascade: true
        }),
        // require('postcss-px2rem')({ remUnit: 75 }),
        require('postcss-px2rem-exclude')({
            remUnit: 75,
            exclude: /node_modules|(src\/website)/i
        })
    ]
}
