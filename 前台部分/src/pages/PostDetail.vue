<template>
<div class="discussion">
<header1></header1>
<template>
  <div class="title">
<template>
  <div class="area">
  <span class="logo">二手车.</span>
  <span class="tag">论坛</span>
  </div>
</template>
  </div>
</template>
<template>
<div class="image">
<img :src="image1" alt="未找到图片" style="width:100%">
<img :src="image2" alt="未找到图片" style="width:100%">
</div> 
</template>

<!--中心主体部分-->

<div class="aaa">
  <el-container>
  <el-header height=40>
  	<br>
    <span style="font-weight:bold;font-size: 20px;">【主题帖】{{postdata.title}}</span>
    <br>
  </el-header>
  <el-container>
    <el-aside width="250px">
        <div class="user_info">
          <p style="line-height: 20px;color:#3399FF">{{postdata.user_name}}</p>
          <img src="https://x.autoimg.cn/club/v1Content/images/Detail/user120_default.gif">
        </div>
    </el-aside>
    <el-container>
      <el-main>
        <p style="font-size:12px;color:blue;margin-top: 0px;">发表于 &nbsp;&nbsp; {{postdata.post_date}}</p>
        <hr>
        <p v-html="postdata.content"></p>
      </el-main>
    </el-container>
  </el-container>
  <hr>
  <el-divider content-position="left">回 复 帖 ：</el-divider>
  <hr>
  <el-container v-for="(replyInfo,index) in replyList" :key="index">
    <el-aside width="250px">
        <div class="user_info">
          <p style="line-height: 20px;color:#3399FF">{{replyInfo.user_name}}</p>
          <img src="https://x.autoimg.cn/club/v1Content/images/Detail/user120_default.gif" >
        </div>
    </el-aside>
    <el-container>
      <el-main>
        <p style="font-size:12px;color:blue;margin-top: 0px;">
          <span>发表于 &nbsp;&nbsp; {{replyInfo.reply_date}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>回复于：&nbsp;&nbsp;&nbsp;{{postdata.title}}</span>
        </p>
        <hr>
        <p v-html="replyInfo.content"></p>
      </el-main>
    </el-container>
  </el-container>
  <el-alert
    title="快 速 回 复"
    type="success"
    show-icon
    :closable="false"
    center
    style="margin-top: 15px;margin-bottom: 15px;">
    </el-alert>
  <el-container>
    <el-container>
    <el-aside width="250px"><div class="user_info">
          <p style="line-height: 20px;color:#3399FF">{{cur_username}}</p>
          <img src="https://x.autoimg.cn/club/v1Content/images/Detail/user120_default.gif">
        </div>
      </el-aside>
    <el-container>
      <el-main>
        <quill-editor v-model="addForm.content"></quill-editor>
      </el-main>
      <el-footer>
        <el-button style="margin-top: 10px;" type="primary" @click="addReply">发表回复</el-button>
      </el-footer>
    </el-container>
  </el-container>
    
  </el-container>
 
</el-container>
</div>


<!--footer-->
<div class="image">
  <img :src="image3" alt="未找到图片" style="width:100%">
</div>

<bottom1></bottom1>
  
<router-view></router-view>
</div>
</template>

<script>
	import Vue from 'vue'
	import Header from "./Header.vue";
	import image1 from "../img/brand.jpg";
	import image2 from "../img/brand2.jpg";
	import image3 from "../img/brand3.jpg";
	import Bottom from "./bottom.vue"
export default {
    name: 'postDetail',
    data(){
      return{
         image1:image1,
         image2:image2,
         image3:image3,
         activeName:'first',
         cur_userid:"",
         cur_username:"",
         post_id:this.$route.params.post_id,

		 postdata:{},
      	 replyList:[],
      	 addForm:{
        reply_id:'',
        user_id:'',
        post_id:'',
        reply_date:'',
        content:''
      }

      }
    },
    created(){
    	this.getPostData();
    	this.getAllReply();
    	if(window.sessionStorage.getItem("userid")){
  			this.cur_userid=window.sessionStorage.getItem("userid");
  			this.getUserInfo();
  		}
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取主题帖信息
      async getPostData(){
      await Vue.axios.post('/api/forumSearch/getPost',null,{
        params:{
          post_id:this.post_id
        }
      }).then((response)=>{
        if(response.data.code==1){
          this.postdata = response.data.data;
          this.$message.success(response.data.message);
        }
        else{
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
      //console.log(this.postdata);
    },
    async getAllReply(){
      await Vue.axios.post('/api/forumSearch/getReplys',null,{
        params:{
          post_id:this.post_id
        }
      }).then((res)=>{
        if(res.data.code==1){
          this.$message.success(res.data.message);
          this.replyList=res.data.data;
          //console.log(this.replyList);
        }
      }).catch((error)=>{
        console.log(error);
      });
      //console.log(this.replyList);
    },
    async getUserInfo(){
    	await Vue.axios.get('/api/uid/'+this.cur_userid).then((response)=>{
    		if(response.data.code==1){
    			this.cur_username=response.data.data.user_name;
    		}
    	}).catch((error)=>{
        console.log(error);
      });
    },
    async addReply(){
      if(!this.cur_userid){
      	this.$message.warning('请先进行用户登录');
      	return
      }
      var nowDate = new Date();
      var year=nowDate.getFullYear();
      var month=nowDate.getMonth()+1;
      var date=nowDate.getDate();
      var h=nowDate.getHours();
      var m=nowDate.getMinutes();
      var s=nowDate.getSeconds();

      this.addForm.post_id=this.post_id;
      this.addForm.reply_date =
            year+'/'+
            this.convert(month)+'/'+
            this.convert(date)+' '+
            this.convert(h)+':'+
            this.convert(m)+':'+
            this.convert(s);
      this.addForm.user_id = this.cur_userid;
      this.addForm.reply_id = 
            year+this.convert(month)+this.convert(date)+this.randomString(3);


      await Vue.axios.post('/api/forumReply/add',this.addForm).then((response)=>{
        
        if(response.data.code==1){
          this.$message.success('回复成功！');
        }
        else{
          this.$message.warning(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.addForm.content='';
      this.getAllReply();
    },

    //日期时间处理
    convert(val) {
      return val < 10 ? '0' + val : val
    },
    //随机生成n位数
    randomString(length){
      var tmp="0123456789abcdefghijklmnopqrstuvwxyz",
      a=tmp.length,
      res="";
      for(var i=0;i<length;i++){
        res+=tmp.charAt(Math.floor(Math.random() * a));
      }
      return res;
    }
    },
    components: {
      header1:Header,
      bottom1:Bottom
    }
  };
</script>

<style scoped>
.background{
    width:100%;  
    height:300px;
    z-index:-1;
    position: absolute;
}
.title{
  width:auto;
  height:50px;
  background-color: #113a63;
  margin-top: 5px;
}
.area{
  background-color: white;
  width:200px;
  height: 50px;
  margin-left: 50px;
  text-align: center;
}
.logo{
   color:#3e4348;
   font-size:30px;
   font-weight: bolder;
   font-style: italic;

}
.tag{
   color:#ed9537;
   font-size:30px;
   font-weight: bolder;
}
.image{
  margin:0 auto;
  width:70%;
  margin-top:20px;
  margin-bottom: 20px;
}
.side{
  float:right;
  width:13%;
  position: fixed;
  right: 0;
  margin-top: 10px;
}
.aaa{
	width:1250px;
	margin:0 auto;
}
.el-header {
    background-color: #CCEEFF;
    color: #333;
    text-align: left;
    line-height: 30px;
  }
  .el-footer{
  	background-color: #CCEEFF;
    color: #333;
    text-align: left;
  }
 .el-aside {
    background-color: #77DDFF;
    color: #333;
    text-align: center;
    line-height: 150px;
    border-top-style:solid;
    border-left-style:solid;
    border-right-style:solid;
    border-color: black;
    border-width: 1px;
  }
  
 .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    border-top-style:solid;
    border-right-style:solid;
    border-width:1px;
    border-color: black;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 260px;
  }
</style>