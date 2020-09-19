<template>
<div>
  <img :src="img1" alt="未找到图片" class="logo">
  <el-link href="/" style="margin-left:90%"><i class="el-icon-s-home el-icon--left"></i>返回首页
  </el-link>
<template>
<div style="margin-top:30px;width:100%;height:530px">
<img :src="img2" alt="未找到图片" class="background">
<template>
<div class="logs">
<span class="titles">密码登录</span>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="position:absolute;margin-top:30px">
  <el-form-item label="用户名" prop="user_id" class="label">
    <el-input v-model="ruleForm.user_id"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pw1" class="label">
    <el-input v-model="ruleForm.pw1"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="code" class="label">
    <el-input v-model="ruleForm.code" class="code" id="code"></el-input>
  </el-form-item>
    <div class="login-code" @click="refreshCode">
   <SIdentify :identifyCode="identifyCode" style="margin-left:100px"></SIdentify>
   </div>
   <el-link href="/#/register" style="margin-left:300px">立即注册
   </el-link>
  <el-form-item class="label">
    <el-button type="primary" @click="blogin('ruleForm')" id="log">登录</el-button>
  </el-form-item>
</el-form>
</div>
</template>
</div>
</template>
<bottom1></bottom1>
</div>

</template>

<script>
import logo from "../img/logo.png";
import background from "../img/background_1.jpg";
import SIdentify from './sidentify';
import Bottom from './bottom.vue';
  export default {
      components: { SIdentify,bottom1:Bottom },
    data() {
      return {
        img1:logo,
        img2:background,
        identifyCodes: '1234567890',
        identifyCode: '',
        ruleForm: {
          err: null,
          user_id: null,
          pw1: null,
          code: ''
        },
        rules: {
          user_id: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pw1: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        }
      };
    },
  created () {
    this.refreshCode()
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
    methods: {
      blogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.identifyCode !== this.ruleForm.code) {
            this.ruleForm.code = ''
            this.refreshCode()
            this.$message({
              type: 'error',
              message: '验证码错误',
            });  
            return
            }
            this.login()
          } else {
            return false;
          }
        });
      },
      login: function () {
      var that=this
      this.$axios.post('/api/login', {user_id: this.ruleForm.user_id, password: this.ruleForm.pw1})
        .then(function (response) {
          if (response.data.code === 1) { 
            that.$message({
              type: 'success',
              message: response.data['message'],
          });  
            var sess=window.sessionStorage;
            sess.setItem('userid',that.ruleForm.user_id);
            setTimeout(()=>{that.$router.push('/');},1000);
          } else {
            this.$message({
              type: 'error',
              message: response.data.message,
            });  
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
      this.refreshCode()
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
    }
  };
</script>

<style scoped>
#log
{
    width:200px;
    font-size: 16px;
    margin-top: 30px;
}
.label
{
    width:300px;
}
.login-code{
  cursor: pointer;
}
.logo{
  width:100px;
  height:100px;
  margin-left: 5%;
}
.background{
    width:100%;  
    height:100%;
    z-index:-1;
    position: absolute;

}
.logs{
    float: left;
    background-color: white;
    width:400px;
    height:450px;
    margin-left: 800px;
    margin-top: 50px;
    position: absolute;
}
.titles{
  margin-left: 30px;
  color: red;
  font-size: 20px;
  margin-top:50px;
  display: inline-block;
}
</style>
