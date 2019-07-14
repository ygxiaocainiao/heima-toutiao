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
// 导入404组件
import Notfund from '@/views/404'
// 导入article组件
import Article from '@/views/article'
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
        { name: 'welcom', path: '/', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: Notfund }


  ]
})
// 注册一个全局的前置导航守卫
router.beforeEach(function (to, from, next) {
  // 如果不去主动的触发 resolve(next下一步) 会一直等待
  // console.log('ok')
  // 如果登录页面放行
  // if (to.path === '/login') return next()
  // // 判断登录状态
  // const user = window.sessionStorage.getItem('hm-toutiao')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }

  // 简写
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
