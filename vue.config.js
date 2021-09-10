module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : '/',
    // 构建项目生成的目录
    outputDir: process.env.NODE_ENV === 'production' ?
        'dist' : 'devDist',
    // 关闭语法的自动检测
    lintOnSave: false,
    // 配置css
    // https://cli.vuejs.org/zh/config/#css-modules
    css: {
        loaderOptions: {
            // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            },

        }
    }
}