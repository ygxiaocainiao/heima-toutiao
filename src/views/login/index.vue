<template>
    <div class="login-container">
        <el-card class="login_box">
            <img src="../../assets/images/logo_index.png" alt="log">
        </el-card>
    </div>
</template>

<script>
export default {

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
            width: 450px;
            height: 350px;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            img {
                display: block;
                width: 200px;
                margin: 0 auto;
            }
        }
    }
</style>
