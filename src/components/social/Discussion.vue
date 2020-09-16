<template>
<div>
  <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社交管理</el-breadcrumb-item>
      <el-breadcrumb-item>讨论区话题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--<el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>-->
      <!--表格区域-->
      <el-row :gutter="4">
          <!--<el-col :span="20">
              <el-button type="primary" @click="addDialogVisible=true">我要发帖</el-button>
          </el-col>-->
          <el-col :span="2">
              <el-button @click="clearFilter">清除过滤器</el-button>
          </el-col>
          
      </el-row>
      <el-table
      	ref="filterTable"
      	:data="postDataList" 
      	style="width: 100%" 
      	:stripe="true"
        v-loading="loading">
      	 <el-table-column 
        	type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="内容预览">
              <span v-html="scope.row.content"></span>
            </el-form-item>
            <p>
            <el-form-item label="发帖人">
              <span>{{scope.row.user_name}}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{scope.row.date}}</span>
            </el-form-item>
          </p>
          </el-form>
        </template>
      </el-table-column>
      	<el-table-column 
        	prop="title" 
        	label="新闻标题"
          width=850>
          <template slot-scope="scope">
            <div>
              <a href="javascript:void(0)" @click="getPostDetail(scope.row.post_id)">{{scope.row.title}}</a>
            </div>
          </template> 
        </el-table-column>
        <el-table-column 
        	prop="user_name" 
        	label="发帖人">
        </el-table-column>
        <el-table-column 
          prop="date" 
          label="发布日期">
        </el-table-column>
        <el-table-column 
          prop="isPost" 
          label="类型"
          :filters="[{text:'主题帖',value:true},{text:'回复帖',value:false}]"
          :filter-method="filterPt"
          filter-placement="bottom-end">
          <template slot-scope="scope" v-if="scope.row">
              <el-tag v-if="scope.row.isPost == true" type="success">主题帖</el-tag>
              <el-tag v-else-if="scope.row.isPost == false">回复帖</el-tag>
          </template>
        </el-table-column>
        <el-table-column 
        	label="操作">
			<template slot-scope="scope">
				<!--查看内容-->
				<el-tooltip class="item" effect="dark" content="查看内容" placement="top" :enterable="false">
     				<el-button type="primary" plain size="mini" icon="el-icon-view" @click="showContent(scope.row)"></el-button>
				</el-tooltip>
				<!--删除-->
				<el-tooltip class="item" effect="dark" content="删除主帖" placement="top" :enterable="false">
					<el-button type="danger" plain size="mini" icon="el-icon-delete" @click="deletePost(scope.row)"></el-button>
				</el-tooltip>
      		</template>
        </el-table-column>
    </el-table>



     
    </el-card>

    <!--发布主题帖的对话框-->

    <el-dialog 
      title="快来发布属于你的帖子吧! XD" 
      :visible.sync="addDialogVisible" 
      width="60%" 
      @close="addDialogClosed"
      center>
      <!--内容主体区域-->
      <el-form :label-position="labelPosition" :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="帖子标题" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
        <el-form-item label="" prop="content">
            <quill-editor v-model="addForm.content"></quill-editor>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPost">发 布</el-button>
      </span>
  </el-dialog>

      <!--查看主题帖内容对话框-->
      <el-dialog 
            :title="postInfo.title" 
            :visible.sync="contentVisible" 
            width="50%" 
            height="80%" 
            center
            style="font-size: 50px">
      <span style="font-size: 14px;color:#686868">
       发布时间：{{postInfo.post_date}}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       ID：{{postInfo.post_id}}&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; 
       楼主：{{postInfo.user_name}}
      </span>
    <p></p>
    <p></p>
    <hr style="height:1px;border:none;border-top:1px solid #B0B0B0;" />
    <p><span v-html="postInfo.content"></span></p>
    </el-dialog>


</div>
</template>

<style >
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import Vue from 'vue'
export default {
	data(){
		return {
			loading:true,
      labelPosition:'top',
      contentVisible:false,
      			

        //控制添加对话框显示隐藏
        addDialogVisible: false,

        addForm:{
          post_id:'',
          user_id:'',
          post_date:'',
          title:'',
          content:''
        },

        //添加表单的校验规则
        addFormRules:{
          title:[
            { required: true, message: '请输入帖子标题', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在1到20位之间', trigger: 'blur' }
          ]
        },
        queryinfo: {
          keyword:'',
          isOnlyPost:true,
          user_id:''    
        },
        postDataList:[],
        postInfo:{}

		}
	},
  created(){
    this.getPostList();
  },
	methods: {
    getPostDetail(id){
      //console.log(id);
      this.$router.push({
        name:'postDetail',
        params:{
          post_id:id
        }
      })
    },

     // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
       // console.log(newSize)
      this.queryinfo.pagesize = newSize
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
       // console.log(newPage)
      this.queryinfo.pagenum = newPage
    } ,
    filterPt(value,row){
    	return row.isPost===value;
    },
    clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
    // 监听发布帖子对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    } ,
    addPost(){
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项');
        }
        var nowDate = new Date();
        var year=nowDate.getFullYear();
        var month=nowDate.getMonth()+1;
        var date=nowDate.getDate();
        var h=nowDate.getHours();
        var m=nowDate.getMinutes();
        var s=nowDate.getSeconds();

        this.addForm.post_date =
            year+'/'+
            this.convert(month)+'/'+
            this.convert(date)+' '+
            this.convert(h)+':'+
            this.convert(m)+':'+
            this.convert(s);

        this.addForm.post_id = 
            year+this.convert(month)+this.convert(date)+this.randomString(3);

        this.addForm.user_id = "1851202";

        Vue.axios.post('/api/forumPost/add',this.addForm).then((response)=>{
          if(response.data.code==1){
            this.$message.success(response.data.message);
          }
          else{
            this.$message.error(response.data.message);
          }
        }).catch((error)=>{
        console.log(error);
      });
        //console.log(this.addForm);
        this.addDialogVisible=false;
      })
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

    //获取所有主题帖
    getPostList(){
      this.loading=true;
      Vue.axios.post('/api/forumSearch/get',this.queryinfo).then((response)=>{
        if(response.data.code==1){
          this.loading=false;
          this.postDataList=response.data.data;
          //console.log(this.postDataList);
        }
        else{
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
    },
    //删除主题帖
    async deletePost(scope){
      const confirmResult = await this.$confirm('您确定要删除该条主题帖吗?', '删除主帖', {
        confirmButtonText: '确认删除',
        cancelButtonText: '再想想',
        type: 'warning'
      }).catch(err => err)
      // 取消删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      await Vue.axios.post('/api/forumPost/delete',null,{
        params:{
          post_id:scope.post_id
        }
      }).then((response)=>{
        if(response.data.code==1){
          this.$message.success('成功删除主帖。');
        }
        else{
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.getPostList();
    },

    async showContent(scope){
      await Vue.axios.post('/api/forumSearch/getPost',null,{
        params:{
          post_id:scope.post_id
        }
      }).then((response)=>{
        this.postInfo=response.data.data;
        if(response.data.code==0){
          this.$message.info(response.data.message+'!');
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.contentVisible=true;
    }
  }
}
</script>
