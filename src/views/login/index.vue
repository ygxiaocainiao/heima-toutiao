<template>
    <div class="login-container">
        <el-card class="login_box">
            <img src="../../assets/images/logo_index.png" alt="log">
            <el-form class="fm" ref="loginForm" status-icon  :model="loginForm" :rules="loginRules">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:200px"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checkbox" style="margin-right:6px"></el-checkbox>
                    我已阅读并同意 <el-link type="primary" >用户协议</el-link> 和 <el-link type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { async } from 'q'
export default {
  data () {
    // 校验逻辑
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      // 表单对应对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      checkbox: true,
      loginRules: {
        mobile: [
          // 具体的检验规则  比如是否必填 长度 格式..
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // // 整体表单的校验
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     // 校验成功
      //     this.$http
      //       .post('authorizations', this.loginForm)
      //       .then(res => {
      //         // res是响应对象 包含响应数据
      //         const data = res.data
      //         // 后台的返回的json内容 已将转换成了对象
      //         console.log(data)
      //         // 登录成功后:做什么事情?
      //         // 1.跳转页面
      //         // 2.保存登录状态
      //         // 2.1保存登录后返回的用户信息,包含token
      //         // 2.2使用sessionStorage来存储  关闭浏览器会话失效
      //         window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 提示错误  使用组件 消息提示组件
      //         this.$message.error('用户名或密码错误')
      //       })
      //   }
      // })

      // axios-结合async与await使用
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
    .login-container {
        width: 100%;
        height: 100%;
        position:absolute;
        left: 0;
        top:0;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        .login_box {
            width: 400px;
            height: 320px;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            img {
                display: block;
                width: 200px;
                margin: 0px auto 10px;

            }
            .fm {
                width:320px;
                // text-align: center;
                margin: auto;

            }
        }
    }
</style>
