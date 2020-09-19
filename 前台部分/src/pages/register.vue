<template>
<div class="back">
  <img :src="img2" alt="未找到图片" class="logo">
  <span style="margin-left:70%; font-size:13px;">已有账号？<el-link href="/#/login" style="margin-left:10px;font-size:15px; color:#ff6c09;margin-top:-5px">直接登录
   </el-link></span>
<template>
<div style="margin-top:30px;width:100%;height:530px">
<template>
<div class="logs">
<span class="titles">快速注册</span>
<div class="user_logon_develop_ym">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="position:absolute;margin-top:40px">
<el-form-item label=" 用 户 名 : " prop="user_id">
<el-input type="text" v-model="ruleForm.user_id" placeholder="请输入用户名:"
autocomplete="off"></el-input>
</el-form-item>
<el-form-item label=" 密 码 : " prop="password">
<el-input type="password" v-model="ruleForm.password" placeholder="请输入密码:"
autocomplete="off"></el-input>
</el-form-item>
<el-form-item label=" 昵 称: " prop="user_name">
<el-input type="text" v-model="ruleForm.user_name" placeholder="请输入昵称:"></el-input>
</el-form-item>

 <el-form-item label="性别" prop="gender">
    <el-radio-group v-model="ruleForm.gender">
      <el-radio label="男" ></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
<el-form-item label=" 所 在 地: " prop="city">
<el-input type="text" v-model="ruleForm.city" placeholder="请输入所在地:"></el-input>
</el-form-item>

<el-form-item class="buttons">
<el-button type="primary" @click="submitForm('ruleForm')" >立即注册</el-button>
<el-button @click="resetForm('ruleForm')"> 重 置</el-button>
</el-form-item>
</el-form>

</div>
  <img :src="img1" alt="未找到图片" class="side">

</div>
</template>

</div>
</template>
<bottom1></bottom1>
</div>
</template>

<script>
import logo from "../img/logo.png";
import side from "../img/jinrong.png";
import Bottom from "./bottom.vue";
import axios from 'axios'
export default {
name: "LogonDevelop",
components:{
   bottom1:Bottom,
},
data() {
var checkUsername = (rule, value, callback) => {
if (!value) {
return callback(new Error('昵称不能为空!'));
}
};
var checkUserid = (rule, value, callback) => {
if (!value) {
return callback(new Error('用户名不能为空!'));
}
};
var checkCity = (rule, value, callback) => {
if (!value) {
return callback(new Error('所在地不能为空!'));
}
};
var validatePass = (rule, value, callback) => {
if (!value) {
callback(new Error('请输入密码'));
} else {
if (this.ruleForm.checkPass !== '') {
this.$refs.ruleForm.validateField('checkPass');
}
callback();
}
};



return {
  img1:side,
  img2:logo,
ruleForm: {
user_id: '',
password:'',
user_name:'',
gender:'',
city: ''

},
rules: {
user_name: [
{validator: checkUsername, trigger: 'blur'}
],
password: [
{validator: validatePass, trigger: 'blur'}
],
city: [
{validator: checkCity, trigger: 'blur'}
],
user_id: [
{validator: checkUserid, trigger: 'blur'}
]
}
};
},
methods: {

    // submitForm(formName) {
    //    console.log(this.ruleForm)
    //   },
submitForm(formName) {
   console.log(this.ruleForm);
   var that=this;
  //  axios.post('/apiregister',{
  //    query:'',
  //    page_num: 2,
  //    page_size:2
  //  })
  //  .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

   axios.post('/apiregister',this.ruleForm)
   .then(function (response) {
    console.log(response);
     that.$message({
          type: 'success',
          message: '注册成功!'
    });
    setTimeout(()=>{that.$router.push('/login')},1000);

  })
  .catch(function (error) {
    console.log(error);
  });
  //  that.$axios({
  //    methods:"post",
  //    url:"api/register",
  //    data: this.ruleForm
  //  }).then(response =>{
  //    console.log(response);
  //  })

// this.$refs.ruleForm.validateField(
//   async valid =>{
//     console.log(valid)
//     console.log(this.ruleForm)
//     if (!valid) return;

//   Vue.axios.post('/apiregister',this.ruleForm).then(
//     (
//       response
//     )=>{
//       console.log(response);
//       console.log(response.data);
//       this.postData=response.data;
//       if (this.postData.code==1){
//         this.$message.success('注册成功');
//       }
//       else if (this.postData.code==0){
//         this.$message.error('注册失败');
//       }
//     }
//   ).catch((error)=>{
//     console.log(error);
//   });

//   }
// )
this.$refs[formName].resetFields();
},


resetForm(formName) {
this.$refs[formName].resetFields();
}
}
};
</script>

<style scoped>
.back{
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
.grid-content {
position: absolute;
left:45%;
}

body > .el-container {
margin-bottom: 30px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}

.user_logon_develop_ym {
width: 300px;
margin-left:10px;
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
    width:60%;
    height:480px;
    margin-left:20%;
    margin-top: 20px;
    border: 3px solid #17459e;
    position: absolute;
}
.titles{
  margin-left: 30px;
  color: red;
  font-size: 20px;
  margin-top:30px;
  display: inline-block;
}
.buttons{
  margin-top: 20px;
}
.side{
  float: right;
  margin-right: 20px;
  margin-top: 50px;
}
</style>