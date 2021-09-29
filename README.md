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

### vue.config.js配置
https://cli.vuejs.org/zh/config/#devserver-proxy

### 环境变量
https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F
.env.development  //开发环境变量
.env.production   //生产环境变量
.env.test         //测试环境变量
"build-test": "vue-cli-service build --mode test",  //添加配置测试环境包

### 请求头坑 X-Custom-Header为自定义请求头！！！需要改成后端可以接受的请求头！！！不能乱写


### vueRouter 路由跳转
https://next.router.vuejs.org/zh/api/#replace-1
需要用户返回上一个历史记录，就用push
不让用户返回上一个历史记录，就用replace
replace({
    name:"Login"
})


### slot-scop 改成 v-slot！！！

### ElementPlusError: [ElPagination] 你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档 问题时
！！！检查类型！！！
用数字的就不能用字符串

### 获取dom方法 compontView/threejs/mythreedome

### 富文本工具
https://vueup.github.io/vue-quill/

图片上传
https://vueup.github.io/vue-quill/guide/modules.html#example

案例  news/addNews

### THREE.js

使用geometry来创建模型 three内搜索geometry

利用BufferGeometry来创建模型 three内搜索BufferGeometry

three内搜索light 添加光照

使用 GLTFLoader 导入外部模型

md知道了前几天scene.gltf模型加载不出来的原因！！！
因为他本身就不能用是模型问题！！！使用之前做过的案例就可以正常显示！！！

修改模型状态   three内搜索object
https://threejs.org/docs/index.html?q=object#api/en/core/Object3D

！！！摄像机！！！
three内搜索controls 添加自由摄像机
https://threejs.org/docs/index.html?q=controls#examples/en/controls/OrbitControls

材质
materials
https://threejs.org/docs/index.html?q=ma#api/en/materials/MeshBasicMaterial


点击事件 Raycaster /  raycast
https://threejs.org/docs/index.html?q=ray#api/en/core/Raycaster
raycaster.intersectObjects(scene.children,true)  !!!一定要加true
instanceof
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof


动画  npm i stats-js
https://www.npmjs.com/package/stats-js

一定要放animate()方法中！！！
!!!!animactionMixer.update(clock.getDelta())!!!!
参考文档 https://blog.csdn.net/lin5165352/article/details/81571930

官方文档才是yyds
