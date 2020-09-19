<template>
<div class="header">
    
    <el-header style="font-size: 12px">
              <img :src="img1" alt="未找到图片" class="logo">
                  <el-link href="/"><i class="el-icon-s-home el-icon--left"></i>首页 
              </el-link>

                  <el-link href="/#/carbuy"><i class="el-icon-s-shop el-icon--left"></i>我要买车 
              </el-link>
              
                  <el-link href="/#/carsell"><i class="el-icon-s-goods el-icon--left"></i>我要卖车 
              </el-link>

                  <el-link href="/#/news"><i class="el-icon-info el-icon--left"></i>新闻资讯 
              </el-link>

                  <el-link href="/#/discussion"><i class="el-icon-star-on el-icon--left"></i>车友广场
              </el-link>

                  <el-link href="/#/evalue"><i class="el-icon-s-goods el-icon--left"></i>在线估值
              </el-link>

                <el-dropdown style="float:right" trigger="click" @command="handleCommand" v-if="seen">
                    <span class="el-dropdown-link">
                         <i class="el-icon-setting el-icon--left"></i>
                         {{user_id}}
                         <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/home">个人中心</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
                <el-link href="/#/register" class="login" v-if="!seen">注册</el-link>
                <el-link href="/#/login" class="login" v-if="!seen">登录</el-link>
    </el-header>
</div>
</template>

<script>
import logo from "../img/logo.png";
export default{
  data(){
    return{
      user_id:"",
      seen:false,
      img1:logo,
    }
  },
	name:'header1',

  created:function(){
      if(window.sessionStorage.getItem("userid")){
        this.user_id=window.sessionStorage.getItem("userid");
        this.seen=true;
      }
  },

  methods:{
      handleCommand(command) {
        if(command=="logout"){
          window.sessionStorage.removeItem("userid");
          this.$message({
              type: 'success',
              message: '您已成功退出',
          }); 
          setTimeout(()=>{this.$router.push('/');},1000);
        }
        else{
          this.$router.push(command);
        }
        
    }
  },

};
</script>

<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    width:100%;
  }
  .el-link {
    margin-left:40px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .login{
    float: right;
  }
  .logo{
    width: 60px;
    height:60px;
    float: left;
  }
</style>