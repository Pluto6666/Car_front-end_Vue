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
      <el-button @click="clearFilter">清除过滤器</el-button>
      <el-table
      	ref="filterTable"
      	:data="newlist" 
      	style="width: 100%" 
      	border 
      	:stripe="true"
      	 :default-sort = "{prop: 'date', order: 'descending'}">
      	 <el-table-column 
        	type="index" 
        	label="">
        </el-table-column>
      	<el-table-column 
        	prop="postDate" 
        	label="发布时间"
        	sortable>
        </el-table-column>
      	<el-table-column 
        	prop="title" 
        	label="新闻标题">
        </el-table-column>
        <el-table-column 
        	prop="author" 
        	label="作者">
        </el-table-column>
        <el-table-column 
        	prop="partition" 
        	label="所属分区"
        	:filters="[{text:'行情分析',value:'行情分析'},{text:'旅摄沪上',value:'旅摄沪上'},{text:'汽车测评',value:'汽车测评'}]"
        	:filter-method="filterPt"
        	filter-placement="bottom-end">
        </el-table-column>
        <el-table-column 
        	prop="readerNum" 
        	label="阅读人数"
        	sortable>
        </el-table-column>
        <el-table-column 
        	label="操作">
			<template slot-scope="scope">
				<!--查看内容-->
				<el-tooltip class="item" effect="dark" content="查看内容" placement="top" :enterable="false">
     				<el-button type="primary" plain size="mini" icon="el-icon-view"></el-button>
				</el-tooltip>
				<!--删除-->
				<el-tooltip class="item" effect="dark" content="删除新闻" placement="top" :enterable="false">
					<el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
				</el-tooltip>
      		</template>
        </el-table-column>
    </el-table>


     <!--分页区域-->
    <el-pagination
      	@size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
	</el-pagination>
    </el-card>
</div>
</template>

<script>
export default {
	data(){
		return {
			queryinfo: {
        		query: '', // 用户输入的搜索条件
        		pagenum: 1, // 当前请求的是第几页数据
        		pagesize: 10 // 每页显示几条数据
      			},
      			total : 3 ,
			newlist:[
				{num:1 ,postDate:'2020-08-07',title:"上海市行情周报",author:"小A",partition:"行情分析",readerNum:238},
				{num:2 ,postDate:'2020-08-08',title:"外滩夜景车拍打卡",author:"小B",partition:"旅摄沪上",readerNum:400},
				{num:3 ,postDate:'2020-08-06',title:"保时捷911测评",author:"小C",partition:"汽车测评",readerNum:333}
				]
		}
	},
	methods: {
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
    	return row.partition===value;
    },
    clearFilter() {
        this.$refs.filterTable.clearFilter();
      }
  }
}
</script>

<style lang="less" scoped>

</style>