<template>
	<div class="aaa">
		
		<el-card>
			<!--面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
      	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      	<el-breadcrumb-item>车友广场</el-breadcrumb-item>
      	<el-breadcrumb-item>讨论专区</el-breadcrumb-item>
    	</el-breadcrumb>
			<el-row :gutter="4">
          		<el-col :span="15">
              		<el-input placeholder="请输入关键词" v-model="input1"  clearable>
            			<el-button slot="append" icon="el-icon-search" @click.native="getPostList"></el-button>
          			</el-input>
      			</el-col>
      			<el-col :span="4">
              		<el-button type="primary" @click="hasLoginIn">我要发帖</el-button>
          		</el-col>
      		</el-row>
      		<br><br>
      		<template>
  				<div class="topic">
     				<span class="word">主题论坛</span>
  				</div>
			</template>
			<br>
			<el-table
      	:data="postDataList" 
      	style="width: 100%" 
      	:stripe="true"
        v-loading="loading"
        header-row-class-name="tableHead">
      	<el-table-column 
        	type="index"
        	label="#">
        </el-table-column>
      	<el-table-column 
        	prop="title" 
        	label="主题帖"
          	width=750>
          <template slot-scope="scope">
            <div>
            	<span style="font-size: 15px;">【主题帖】</span>
              <a href="javascript:void(0)" style="font-size: 15px;" @click="getPostDetail(scope.row.post_id)">{{scope.row.title}}</a>
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


	</div>

</template>

<style scoped>
.el-submenu__title .el-menu-item {
  font-size: 13px;
}

.el-breadcrumb {
  margin-bottom: 20px;

}

.el-card {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2) !important;
  width:1250px;
  height: 1000px;
  margin: 0 auto;
}

.el-table {
  font-size: 12px;
  margin-top: 15px;
}

.el-pagination  {
  margin-top: 15px;
}

.el-steps {
  margin: 15px 500px;
}

.el-step__title {
  font-size: 11px;
}
  .topic{
  height:50px;
  width:auto;
  background-color: #f8f8f8;
}
.tableHead{
	font-size: 17px;
}
.word{
  color:black;
  font-size: 20px;
  margin-left:15px;
  display: inline-block;
  margin-top: 12px;
  font-family:"楷体"; 
}
</style>

<script>
import Vue from 'vue'
export default {
	data(){
		return {
			loading:true,
			labelPosition:'top',
      input1:'',
			queryinfo: {
				keyword:'',
				isOnlyPost:true,
				user_id:''
			},
			postDataList:[],
			//控制添加对话框显示隐藏
        addDialogVisible: false,
        cur_userid:"",
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
        }
	}
  },
  created(){
  	this.getPostList();
  	if(window.sessionStorage.getItem("userid")){
  		this.cur_userid=window.sessionStorage.getItem("userid");
  	}
  	//console.log(this.cur_userid);
  },
  methods:{
  	hasLoginIn(){
  		if(this.cur_userid){
  			this.addDialogVisible=true;
  		}
  		else{
  			this.$message.warning('请先进行用户登录');
  		}
  	},
  	getPostDetail(id){
  		this.$router.push({
  			name:'postDetail',
  			params:{
  				post_id:id
  			}
  		})
  	},
  	//获取所有主题帖
    getPostList(){
      this.loading=true;
      this.queryinfo['keyword']=this.input1;
      Vue.axios.post('/api/forumSearch/get',this.queryinfo).then((response)=>{
        if(response.data.code==1){
          this.postDataList=response.data.data;
          this.loading=false;
        }
        else{
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
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

        this.addForm.user_id = this.cur_userid;

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
        setTimeout(()=>{this.getPostList();},1000);
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
    }
  }
};
</script>