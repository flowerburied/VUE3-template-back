const path = require("path")

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : './',
    // 构建项目生成的目录
    outputDir: process.env.NODE_ENV === 'production' ?
        'dist' : 'devDist',
    // 关闭语法的自动检测
    lintOnSave: false,
    // 配置svg
    chainWebpack: config => {
        config.module.rules.delete("svg") //重点，删除默认配置中处理svg
        config.module
            .rule('svg-sprite-loader').test(/\.svg$/) //引入svg-sprite-loader
            .include
            .add(path.resolve('./src/assets/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]' //为标签配置id
            })

    },
    // 配置css
    // https://cli.vuejs.org/zh/config/#css-modules
    css: {
        loaderOptions: {
            // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            },

        }
    },
    devServer: { //环境配置
        open: true, //运行项目后是否自动打开
        host: "0.0.0.0", //可以让外部访问
        port: 8080, //端口号配置
        proxy: { //配置本地跨域
            [process.env.VUE_APP_FLAG]: {
                target: process.env.VUE_APP_APIURL, //域名配置
                ws: true, //是否开启websocket
                changeOrigin: true, //*是否开区跨域
                pathRewrite: { //路径重写
                    [`^${process.env.VUE_APP_FLAG}`]: '' //查找开头为/api的字符替换成 "空字符串"
                }
            },

        }
    }
}