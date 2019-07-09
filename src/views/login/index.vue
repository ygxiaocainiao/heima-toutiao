<template>
    <div class="login-container">
        <el-card class="login_box">
            <img src="../../assets/images/logo_index.png" alt="log">
            <el-form class="fm">
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码" style="width:200px"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checkbox" style="margin-right:6px"></el-checkbox>
                    我已阅读并同意 <el-link type="primary" >用户协议</el-link> 和 <el-link type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checkbox: true
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
