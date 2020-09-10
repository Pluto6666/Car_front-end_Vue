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
      			<el-form-item label="新闻标题" prop="title">
          			<el-input v-model="addForm.title"></el-input>
        		</el-form-item>
        		<el-form-item label="新闻分区" prop="part">
          			<el-select v-model="addForm.part" clearable placeholder="选择新闻分区">
              			<el-option
                			v-for="item in partList"
                			:key="item.value"
                			:label="item.label"
                			:value="item.value">
              			</el-option>
            		</el-select>
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
        post_date:[
      	{
      		required: true, message: '请输入日期', trigger: 'blur' 
      	}]
      },
      partList:[
        {value:"选车导购",label:"选车导购"},
        {value:"行情分析",label:"行情分析"},
        {value:"二手车实拍",label:"二手车实拍"}
      ]
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

        this.addForm.news_id=this.randomString(7);
        
        //先默认作者
        this.addForm.author_name="二手车编辑小雷";
        this.addForm.author_id="3120216";

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
  },
  //日期时间处理
	convert(val) {
  		return val < 10 ? '0' + val : val
	},
	//随机生成七位数
	randomString(length){
		var tmp="0123456789",
		a=tmp.length,
		res="";
		for(var i=0;i<length;i++){
			res+=tmp.charAt(Math.floor(Math.random() * a));
		}
		return res;
	}
 }
}
</script>

<style lang="less" scoped>
.btnAdd{margin-top: 15px;}
</style>