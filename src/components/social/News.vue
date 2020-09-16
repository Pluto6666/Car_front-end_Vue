<template>
<div>
  <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社交管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻资讯列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
     
      <!--表格区域-->
      <!--搜索区域-->
      <el-row :gutter="4">
          <el-col :span="2">
              <el-button @click="clearFilter">清除过滤器</el-button>
          </el-col>
          <el-col :span="8">
              <el-input placeholder="请输入关键词" v-model="queryinfo.keyword" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getNewsList()"></el-button>
          </el-input>
          </el-col>
          <el-col :span="8">
              <el-button type="primary" @click="goAddpage">新增新闻</el-button>
          </el-col>
      </el-row>
      <el-table
      	ref="filterTable"
      	:data="newlist" 
      	style="width: 100%" 
      	border 
      	:stripe="true"
      	 :default-sort = "{prop: 'post_date', order: 'descending'}"
         v-loading="loading">
      	 <el-table-column 
           type="index"
          label="">
        </el-table-column>
         <el-table-column 
        	 prop="news_id"
        	label="新闻ID"
          width=130>
        </el-table-column>
      	<el-table-column 
        	prop="post_date" 
        	label="发布时间"
        	sortable>
        </el-table-column>
      	<el-table-column 
        	prop="title" 
        	label="新闻标题">
        </el-table-column>
        <el-table-column 
        	prop="author_name" 
        	label="作者">
        </el-table-column>
        <el-table-column 
        	prop="part" 
        	label="所属分区"
        	:filters="[{text:'行情分析',value:'行情分析'},{text:'选车导购',value:'选车导购'},{text:'二手车实拍',value:'二手车实拍'}]"
        	:filter-method="filterPt"
        	filter-placement="bottom-end"
          width=260>
        </el-table-column>
        <el-table-column 
        	label="操作">
			<template slot-scope="scope">
				<!--查看内容-->
				<el-tooltip class="item" effect="dark" content="查看内容" placement="top" :enterable="false">
     				<el-button type="primary" plain size="mini" icon="el-icon-view" @click="showContent(scope)"></el-button>
				</el-tooltip>
				<!--删除-->
				<el-tooltip class="item" effect="dark" content="删除新闻" placement="top" :enterable="false">
					<el-button type="danger" plain size="mini" icon="el-icon-delete" @click="remove(scope)"></el-button>
				</el-tooltip>
      		</template>
        </el-table-column>
    </el-table>


     <!--分页区域-->
    <el-pagination
      	@size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.page_num"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryinfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
	</el-pagination>
    </el-card>

    <el-dialog 
            :title="newsInfo.title" 
            :visible.sync="contentVisible" 
            width="50%" 
            height="80%" 
            center
            style="font-size: 50px">
      <span style="font-size: 14px;color:#686868">
       发布时间：{{newsInfo.post_date}}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       类型：{{newsInfo.part}}&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; 
       作者：{{newsInfo.author_name}}
      </span>
    <p></p>
    <p></p>
    <hr style="height:1px;border:none;border-top:1px solid #B0B0B0;" />
    <p><span v-html="newsInfo.content"></span></p>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
	data(){
		return {
			loading:true,
      queryinfo: {
        		keyword: '', // 用户输入的搜索条件
            author_id:'',
        		page_num: 1, // 当前请求的是第几页数据
        		page_size: 5 // 每页显示几条数据
      			},
      			total : 0 ,
			newlist:[],

      //新闻内容对话框显示或隐藏
      contentVisible:false,
      newsContent:'',
      newsInfo:{}
		}
	},
  created(){
    this.getNewsList();
  },
	methods: {
    //分页获取新闻列表
    getNewsList(){
      this.loading=true;
      Vue.axios.post('/api/news/get_pageNews',this.queryinfo).then((response)=>{
        
        if(response.data.code==1){
          this.loading=false;
           this.$message.success(response.data.message);
           this.newlist=response.data.data.newsSet;
            this.total=response.data.data.total;
        }
        else {
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      });
     
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
       // console.log(newSize)
      this.queryinfo.page_size = newSize;
      this.getNewsList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
       // console.log(newPage)
      this.queryinfo.page_num = newPage;
      this.getNewsList();
    } ,
    filterPt(value,row){
    	return row.part===value;
    },
    clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
    //删除一条新闻
    async remove(scope){
      const confirmResult = await this.$confirm('您确定要删除该条新闻吗?', '删除新闻', {
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
      await Vue.axios.post('/api/news/delete',null,{params:{
        news_id:scope.row.news_id
      }}).then((response)=>{
        if(response.data.code==1){
          this.$message.success(response.data.message);
        }
        else {
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      })
      this.getNewsList();
    },

    //查看新闻内容
    showContent(scope){
      Vue.axios.post('/api/news/getNews',null,{params:{
        news_id:scope.row.news_id
      }}).then((response)=>{
        this.newsInfo=response.data.data;
        if(response.data.code==1){
          this.$message.success(response.data.message+'!');
        }
        else {
          this.$message.info(response.data.message+'!');
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.contentVisible=true;
    },
    //跳转新闻添加界面
    goAddpage(){
      this.$router.push('news/AddNews');
    }
  }
}
</script>

<style lang="less" scoped>

</style>