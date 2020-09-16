<template>
  <div class="login_container">
    <h1 style="text-align: center;margin-top: 200px;">管理员登录</h1>
    <div class="login_box">
      <!--头像区域-->
      
      <div class="avatar_box">
        <img src="../assets/touming.png" alt />
      </div>
      <!--表单区域-->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <el-form-item prop="user_id">
          <el-input prefix-icon="el-icon-edit" v-model="loginForm.user_id" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-edit" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitLogin">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        user_id: '',
        password: ''
      },
      loginFormRules: {
        user_id: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 7, max: 7, message: '长度为7个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { trigger: 'blur' }
        ]
      }
   }
 },
  methods: {
    submitLogin(){
      this.$refs.loginFormRef.validate(valid => {
        if(this.loginForm.user_id=="1111111"){
          //console.log(this.loginForm);
          Vue.axios.post('/api/login',this.loginForm).then((response)=>{
            if(response.data.code==1){
              this.$message.success(response.data.message);
              // 将登录成功之后的token保存到客户端的sessionStorage中
                window.sessionStorage.setItem('admin', this.loginForm.user_id);
                this.$router.push('/home');
            }
            else{
              this.$message.error(response.data.message);
            }
          }).catch((error)=>{
            console.log(error);
          });
        }
        else{
          this.$message.error('请输入管理员账号登录！');
        }
      })
    },
    // 点击重置按钮 重置表单
    resetForm () {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    padding: 10px;
    width: 130px;
    height: 130;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #C0C0C0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>