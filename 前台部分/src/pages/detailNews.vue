<template>
  <div>
    <span class="title">欢迎访问！</span>
    <el-input
  placeholder="请输入新闻关键词"
  v-model="input10"
  clearable
  class="search">
</el-input>
<el-button type="primary" icon="el-icon-search" @click="searching">搜索</el-button>
<template>
<div class="main">
<template>
  <div class="topic">
     <span class="word">最新资讯</span>
  </div>
</template>
<template>
<div class="details">
<br>
<br>
<ul v-for="(item,index) in info">
  <li class="line">
    <a @click="look(index)" href="javascript:void(0);">{{item.title}}</a>
    <span class="date">{{item.post_date}}</span>
  </li>
</ul>

<el-dialog
  title="详细信息"
  :visible.sync="dialogVisible"
  width="70%">
<span class="left">新闻id:</span>
<span class="font">{{news_id}}</span>
<span class="right">所属模块:</span>
<span class="font">{{part}}</span>
<br>
<span class="left">作者id:</span>
<span class="font">{{author_id}}</span>
<span class="right">作者姓名:</span>
<span class="font">{{author_name}}</span>
<br>
<span class="text">新闻内容:</span>
<br>
<span class="content" v-html="content"></span>

</el-dialog>
<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="8"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
</div>
</template>
</div>
</template>
</div>

</template>

<script>
export default {
    data() {
      return {
        input10:'',
        dialogVisible: false,
        currentPage1: 1,
        total:0,
        part:"",
        content:"",
        author_id:"",
        author_name:"",
        post_date:"",
        news_id:"",
        info: [{
          title: '',
          part: '',
          news_id: '',
          author_id: '',
          author_name: '',
          post_date: '',
          content: '',
        }, 
        ]
      }
    },
    created:function(){
            var that=this;
            var sends={};
            sends["keyword"]="";
            sends["author_id"]="";
            sends["page_num"]="1";
            sends["page_size"]="8";
             this.$axios({
              method:'post',
              url:'/api/news/get_pageNews',
              data:sends,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.info=res.data['data']['newsSet'];
                   that.total=res.data['data']['total'];
               }
            });

      },
    methods:{
        //查看详细信息
        look: function(index){
            var that = this;
            var id={};
            id["news_id"]=this.info[index]['news_id'];
            this.part=this.info[index]['part'];
            this.news_id=this.info[index]['news_id'];
            this.author_name=this.info[index]['author_name'];
            this.author_id=this.info[index]['author_id'];
            this.post_date=this.info[index]['post_date'];
            this.$axios({
              method:'post',
              url:'/api/news/getNews',
              params:id,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.content=res.data['data']['content'];
               }
            });
            this.dialogVisible=true;
            
        },
      handleCurrentChange(val) {
          var that=this;
            var sends={};
            sends["keyword"]=this.input10;
            sends["author_id"]="";
            sends["page_num"]=val;
            sends["page_size"]="8";
             this.$axios({
              method:'post',
              url:'/api/news/get_pageNews',
              data:sends,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.info=res.data['data']['newsSet'];    
               }
            });
      },
      //搜索
      searching: function(){
        var that=this;
        var key={};
            key["keyword"]=this.input10;
            key["author_id"]="";
            key["page_num"]=1;
            key["page_size"]="8";
        this.$axios({
              method:'post',
              url:'/api/news/get_pageNews',
              data:key,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.info=res.data['data']['newsSet'];
                   that.total=res.data['data']['total'];
                   that.currentPage1=1;
               }
         });

      }
    },
  };
</script>

<style scoped>
a{
  text-decoration: none;
}
a:link{
   color:#306294;
}
a:visited{
  color:#306294;
}
a:hover{
  color:red;
}
.title{
  margin-left:15%;
}

.line{
  margin-top:15px;
}
.left{
  font-size: 18px;
  font-family: "楷体";
  margin-left:50px;
  display: inline-block;
  margin-bottom: 30px;
}
.right{
  font-size: 18px;
  font-family: "楷体";
  margin-left:100px;
}
.font{
  font-size: 18px;
  font-family: "楷体";
  width:200px;
  display: inline-block;
}
.text{
  font-size: 18px;
  font-family: "楷体";
  margin-left:50px;
  display: inline-block;
  margin-bottom: 10px;
}
.content{
  font-size: 18px;
  font-family: "楷体";
  display:inline-block;
  margin-left: 50px;
  width: 80%;
  text-indent: 2em;
}
.date{
  font-family: "楷体";
  float: right;
  margin-right: 5%;
}
.block{
  text-align: center;
  margin-top: 50px;
}
.main{
  margin:0 auto;
  width:900px;
  height:1000px;
  margin-top: 10px;
  border:solid green;
  border-width: 2px;
}
.topic{
  height:50px;
  width:auto;
  background-color: #f8f8f8;
}
.word{
  color:red;
  font-size: 20px;
  margin-left:15px;
  display: inline-block;
  margin-top: 12px;
  font-family:"楷体"; 
}
.input{
  width: 200px;
  margin-left: 100px;
}
.search{
  width:200px;
  margin-top: 30px;
  margin-left: 40%;
}
</style>