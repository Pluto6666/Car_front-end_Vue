<template>
<div class="aaa">
  <el-container>
  <el-header height=40>
    <span style="font-weight:bold;">【主题帖】{{postdata.title}}</span>
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
  <el-divider content-position="left">回 复 区</el-divider>
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
          <span>回复于：&nbsp;&nbsp;&nbsp;{{postdata.title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>回复帖ID：&nbsp;&nbsp;&nbsp;{{replyInfo.reply_id}}</span>
        </p>
        
        <hr>
        <p v-html="replyInfo.content"></p>
        <el-tooltip class="item" effect="dark" content="删除该回复帖" placement="top" :enterable="false">
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="remove(replyInfo.reply_id)"></el-button>
        </el-tooltip>
      </el-main>
    </el-container>
  </el-container>
  <el-divider></el-divider>
  <!--<el-footer>
    <el-alert
    title="快 速 回 复"
    type="success"
    show-icon
    :closable="false"
    center>
    </el-alert>
    <el-container>
    <el-aside width="250px"><div class="user_info">
          <p style="line-height: 20px;color:#3399FF">游客</p>
          <img src="https://x.autoimg.cn/club/v1Content/images/Detail/user120_default.gif">
        </div>
      </el-aside>
    <el-container>
      <el-main>
        <quill-editor v-model="addForm.content"></quill-editor>
      </el-main>
      <el-footer>
        <el-button type="primary" @click="addReply">发表回复</el-button>
      </el-footer>
    </el-container>
  </el-container>
    
  </el-footer>-->
 
</el-container>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'postDetail',
  data () {
    return {
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
  created() {
      this.getPostData();
      this.getAllReply();
    },
  methods:{
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
        else{
          this.$message.error(res.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
    },

    async addReply(){
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
      this.addForm.user_id = "1852999";
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
    },

    //删除回复帖
    async remove(id){
      const confirmResult = await this.$confirm('您确定要删除该回复吗?', '删除回复', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      await Vue.axios.post('/api/forumReply/delete',null,{params:{
        reply_id:id
      }}).then((response)=>{
        if(response.data.code==1){
          this.$message.success('删除回复帖成功!');
        }
        else{
          this.$message.warning(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.getAllReply();
    }
  }
}
</script>

<style scoped>
 div.aaa .el-header .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 30px;
  }
  
  div.aaa .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  div.aaa .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .item{
      position: relative;
      top: 135px;
      left: 1250px;
  }  
</style>