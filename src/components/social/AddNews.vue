<template>
<div>
  <!--面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增新闻</el-breadcrumb-item>
  </el-breadcrumb>
  <!--卡片视图区域-->
  <el-card>
    <!--警告提示区域-->
    <el-alert title="编辑新闻并新增" type="info" center show-icon :closable="false"></el-alert>
    <!--步骤条区域-->
	<el-steps :space="230" :active="active - 0" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="内容编辑"></el-step>
      <el-step title="确认上传"></el-step>
	</el-steps>
	<!--tab栏区域-->
	<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
		<el-tabs :tab-position="'top'" type="border-card" v-model="active">
      		<el-tab-pane label="基本信息" name="0">
      			<el-form-item label="新闻id" prop="news_id">
          			<el-input v-model="addForm.news_id"></el-input>
        		</el-form-item>
      			<el-form-item label="新闻标题" prop="title">
          			<el-input v-model="addForm.title"></el-input>
        		</el-form-item>
        		<el-form-item label="新闻分区" prop="part">
          			<el-input v-model="addForm.part"></el-input>
        		</el-form-item>
        		<el-form-item label="作者id" prop="author_id">
          			<el-input v-model="addForm.author_id"></el-input>
        		</el-form-item>
        		<el-form-item label="作者用户名" prop="author_name">
          			<el-input v-model="addForm.author_name"></el-input>
        		</el-form-item>
        		<el-form-item label="新闻日期" prop="post_date">
          			<el-input v-model="addForm.post_date"></el-input>
        		</el-form-item>
      		</el-tab-pane>
      		<el-tab-pane label="编辑内容" name="1">
      			<quill-editor v-model="addForm.content"></quill-editor>
      			<el-button type="primary" @click="addNews" class="btnAdd">确认上传</el-button>
      		</el-tab-pane>
      		
		</el-tabs>
	</el-form>
  </el-card>
</div>
</template>

<script>
	import Vue from 'vue'
export default {
	data() {
    return {
      // 当前激活的索引
      active: 0, 
      // 添加新闻的表单数据对象
      addForm: {
      	news_id:'',
      	title:'',
      	post_date:'',
      	author_id:'',
      	author_name:'',
      	content:'',
      	part:''
      },
      // 添加新闻表单的验证规则对象
      addFormRules: {
      	news_id:[
      	{
      		required: true, message: '请输入新闻id', trigger: 'blur' 
      	},
      	{ 
      		min: 7, max: 7, message: '长度必须为7位', trigger: 'blur' 
      	}],
      	title:[
      	{
      		required: true, message: '请输入新闻标题', trigger: 'blur' 
      	}],
      	part:[
      	{
      		required: true, message: '请选择新闻分区', trigger: 'blur' 
      	}],
      	author_id:[
        { 
        	required: true, message: '请输入7位用户id', trigger: 'blur' 
        },
        { 
        	min: 7, max: 7, message: '长度必须为7位', trigger: 'blur' 
        }],
        author_name:[
        { 
        	required: true, message: '请输入用户名（昵称）', trigger: 'blur' 
        },
        { 
        	min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' 
        }],
        post_date:[
      	{
      		required: true, message: '请输入日期', trigger: 'blur' 
      	}]
      }
    }
  },
  methods:{
  	addNews(){
  		this.$refs.addFormRef.validate(async valid => {
        // 预校验
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        }
        // 执行添加的业务逻辑
        console.log(this.addForm);
        Vue.axios.post('/api/news/add',this.addForm).then((response)=>{
        	if(response.data.code==1){
        		this.$message.success('新闻上传成功！');
        	}
        	else{
        		this.$message.error('新闻上传失败！');
        	}
        }).catch((error)=>{
        console.log(error);
  		});
  		this.$router.push('/news');
  	})
  }
}
}
</script>

<style lang="less" scoped>
.btnAdd{margin-top: 15px;}
</style>