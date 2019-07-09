import Vue from 'vue'
import App from './App.vue'

// 导入element-ui包
import ElementUi from 'element-ui'
// 导入样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 默认回去加载索引文件  index.js  index.vue index.json
// 在vue-cli创建的项目中 @前缀代表的是根路径 src目录
import router from '@/router'
// 在全局范围注册组件(注册element-ui组件库)
Vue.use(ElementUi)
Vue.config.productionTip = false
// main.js的职责
// 职责1:依赖项目需要的资源(js模块 css资源 ...)
// 职责2:实例化跟实例 render()渲染App组件  然后 挂载到#app的容器内

new Vue({
  // 路由挂载到跟实例上
  router,
  render: h => h(App)
}).$mount('#app')
