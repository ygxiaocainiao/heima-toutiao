// 导入vue
import Vue from 'vue'
// 导入vue-router 包
import VueRouter from 'vue-router'
// 导入login组件
import Login from '@/views/login'
// 导入Home组件
import Home from '@/views/home'
// 导入welcome组件
import Welcome from '@/views/welcome/index.vue'
// 注册全局
Vue.use(VueRouter)
// 初始化router对象(配置路由规则)
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'welcom', path: '/', component: Welcome }
      ]

    }

  ]
})

export default router
