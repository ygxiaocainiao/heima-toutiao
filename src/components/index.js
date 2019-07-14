// 导入筛选头部组件
import MyBread from '@/components/my-bread.vue'
// 封装成插件的形式Vue.use(插件) 执行插件的配置对象中install函数且传入Vue对象
export default {
  install (Vue) {
    // 注册所有组件在Vue下
    Vue.component(MyBread.name, MyBread)
  }
}
