<template>
    <div class="container">
        <p>头部</p>
        <p class="content">
            <!-- 默认插槽 <slot></slot>-->
            <!-- 组件传值  -->
            <!-- 作用域插槽
            使用的场景：当使用组件的时候需要使用组件内部的数据。 -->
            <!-- 数据绑定到属性上 :num1="num1"
                用的时候需要scope对象接收scope.属性名-->
                <!--具名插槽 定义name="o"  用的时候slot="o" -->
            <slot name="o" :num1="num1"></slot>
            <slot name="t" :num2="num2"></slot>
        </p>
        <p>底部</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      num1: 1,
      num2: 2
    }
  }
}
// <my-test>
// 这是vue2.6.0之前的写法
//         <template slot="o" slot-scope="scope">o的内容 {{scope.num1}}</template>
// 这是新写法
//         <template v-slot:t="scope">t的内容{{scope.num2}}</template>
// </my-test>
</script>

<style>

</style>
