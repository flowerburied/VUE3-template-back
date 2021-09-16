# my-template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 配置CSS
https://cli.vuejs.org/zh/config/#css-modules
### 框架
https://element-plus.gitee.io/#/zh-CN/component/installation

### vue3 bug
把文件vue3bug中的theme-chalk放入node_modules/element-plus/lib 中
解决import 'element-plus/lib/theme-chalk/display.css'文件没有的bug

更新解决办法 删除vue3bug文件21/9/14
import 'element-plus/theme-chalk/display.css'
### 国际化
https://kazupon.github.io/vue-i18n/zh/

### SVG
https://www.npmjs.com/package/svg-sprite-loader
npm i svg-sprite-loader -D 依赖到开发环境

配饰vue.config.js教程
https://cli.vuejs.org/zh/config/#chainwebpack
https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7

const path=require("path")
解决resolve没方法的问题