<template>
 <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="15">
          <!--搜索区域-->
          <el-input placeholder="请输入要查询的会员" v-model="queryinfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getVipList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">新增会员</el-button>
        </el-col>
      </el-row>

      <!--表格区域-->
      <el-table 
      	:data="viplist" 
      	style="width: 100%" 
      	border 
      	:stripe="true">
        <el-table-column 
        	type="index" 
        	label="">
        </el-table-column>
        <el-table-column 
        	prop="user_name" 
        	label="用户名"
        	width="120">
        </el-table-column>
        <el-table-column 
        	prop="vip_id" 
        	label="会员ID">
        </el-table-column>
        <el-table-column 
        	prop="vip_level" 
        	label="会员等级"
          sortable>
        	<template slot-scope="scope" v-if="scope.row">
              <el-tag v-if="scope.row.vip_level == 1">一级</el-tag>
            	<el-tag v-else-if="scope.row.vip_level == 2" type="success">二级</el-tag>
            	<el-tag v-else-if="scope.row.vip_level == 3" type="warning">三级</el-tag>
        	</template>
        </el-table-column>
        <el-table-column 
        	prop="start_time" 
        	label="起始时间">
        </el-table-column>
        <el-table-column 
          prop="end_time" 
          label="结束时间">
        </el-table-column>

        <el-table-column 
        	width="185"
        	label="操作">
			<template slot-scope="scope">
            	<!--修改-->
            	<el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false" >
					<el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
				</el-tooltip>
				<!--删除-->
				<el-tooltip class="item" effect="dark" content="删除会员" placement="top" :enterable="false">
					<el-button type="danger" plain size="mini" icon="el-icon-delete" @click="remove(scope)"></el-button>
				</el-tooltip>
				<!--分配角色-->
				<el-tooltip class="item" effect="dark" content="会员权限" placement="top" :enterable="false">
     				<el-button type="warning" plain size="mini" icon="el-icon-bell" @click="showPermission(scope)"></el-button>
				</el-tooltip>
      		</template>
        </el-table-column>
     </el-table>


     <!--分页区域-->
    <el-pagination
      	@size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.page_num"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryinfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
	</el-pagination>
</el-card>


      <!--新增会员的对话框-->
  <el-dialog 
      title="新增会员" 
      :visible.sync="addDialogVisible" 
      width="40%" 
      @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" :label-position="labelPosition">
          <el-form-item label="会员ID" prop="vip_id">
            <el-input v-model="addForm.vip_id"></el-input>
          </el-form-item>
          <el-form-item label="会员等级" prop="vip_level">
            <el-select v-model="addForm.vip_level" clearable placeholder="选择会员等级">
              <el-option
                v-for="item in vipLevelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addVip">确 定</el-button>
      </span>
  </el-dialog>

<!--编辑用户对话框-->
  <el-dialog 
      title="修改会员信息" 
      :visible.sync="editDialogVisible" 
      width="40%" 
      height="60%"
      @close="editDialogClosed">
      <!-- 编辑用户的表单 -->
      <el-form :model="editForm" 
               :rules="editFormRules" 
               ref="editFormRef" 
               label-width="70px"
               :label-position="labelPosition">
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="editForm.user_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="会员ID" prop="vip_id">
            <el-input v-model="editForm.vip_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="会员等级" prop="vip_level">
            <el-select v-model="editForm.vip_level" clearable placeholder="选择会员等级">
              <el-option
                v-for="item in vipLevelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="剩余天数" prop="surplus">
            <el-input v-model="editForm.surplus"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
  </el-dialog>
  
  <!--会员权限对话框-->
  <el-dialog 
      title="会员权限" 
      :visible.sync="perDialogVisible" 
      width="40%" 
      height="60%">
      <el-table
        :data="permissionList" 
        style="width: 100%" 
        border 
        :stripe="true">
        <el-table-column 
          type="index" 
          label="#">
        </el-table-column>
        <el-table-column 
          prop="permissions" 
          label="权限名称">
        </el-table-column>
        <el-table-column 
          prop="vip_level" 
          label="权限等级">
          <template slot-scope="scope" v-if="scope.row">
              <el-tag v-if="scope.row.vip_level == 1">一级</el-tag>
              <el-tag v-else-if="scope.row.vip_level == 2" type="success">二级</el-tag>
              <el-tag v-else-if="scope.row.vip_level == 3" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="perDialogVisible = false">关 闭</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
	data(){
		return {
			labelPosition: 'top',
      queryinfo: {
        		query: '', // 用户输入的搜索条件
        		page_num: 1, // 当前请求的是第几页数据
        		page_size: 5 // 每页显示几条数据
      			},
      			total : 0,
			viplist:[],
      vipLevelList:[
        {value:1 ,label:'一级'},
        {value:2 ,label:'二级'},
        {value:3 ,label:'三级'}
      ],

      // 控制新增会员对话框的显示和隐藏
        addDialogVisible: false, 
      //添加会员的表单数据
        addForm:{
          vip_id:'',
          vip_level:''
        },
        //添加表单的校验规则
        addFormRules:{
          vip_id:[
            { required: true, message: '请输入用户ID', trigger: 'blur' },
            { min: 7, max: 7, message: '长度为7个字符', trigger: 'blur' }
          ],
          vip_level:[
            {required: true,message:'请选择会员等级', trigger:'blur'},
          ]
        },

        // 控制修改用户对话框显示和隐藏
        editDialogVisible: false,
        // 修改用户信息的表单数据
        editForm: {
          user_name: '',
          vip_id:'',
          vip_level:'',
          surplus:''
        },
        // 编辑的表单验证规则
        editFormRules: {
          vip_level:[
            {required: true, message:'请选择会员等级',trigger:'blur'}
          ],
          surplus:[
            {required:true, message:'请输入剩余天数',trigger:'blur'}
          ]
        },
        perDialogVisible:false,
        permissionList:[]
		}
	},
  created(){
    this.getVipList();
  },
	methods: {
    //根据查询参数获取用户列表
    getVipList(){
      Vue.axios.post('/api/vippage',this.queryinfo).then((response)=>{
          //console.log(response);
          //console.log(response.data);
          this.viplist=response.data.data.vip_data;
          
          this.total=response.data.data.total;

          if(response.data.code==1){
            this.$message.success('查询会员列表成功！');

          }
          else if(response.data.code==0){
            this.$message.error('查询会员列表失败！');
          }
        }).catch((error)=>{
        console.log(error);
      });
    },

     // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
       // console.log(newSize)
      this.queryinfo.page_size = newSize;
      this.getVipList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
       // console.log(newPage)
      this.queryinfo.page_num = newPage;
      this.getVipList();
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    } ,
    addVip() {
     this.$refs.addFormRef.validate(valid => {
        //console.log(valid)
        if (!valid) return
        // 可以发起添加用户的网络请求
        Vue.axios.post('/api/vip',this.addForm).then((response)=>{
          if(response.data.code==1){
          this.$message.success('添加会员成功!');
        }
        else if(response.data.code==0){
          this.$message.error(response.data.message+'。');
        }
        }).catch((error)=>{
        console.log(error);
      });
      this.getVipList();
      this.addDialogVisible = false
     })
    },
    //计算时间相减函数
    divTime(time1,time2){
      time1=Date.parse(new Date(time1));
      time2=Date.parse(new Date(time2));
      //console.log(time1);
      //console.log(time2);
      return Math.abs(parseInt((time2 - time1) / 1000 / 3600));
    },
    // 监听 编辑用户状态
    async showEditDialog(userInfo) {
      //console.log(userInfo)
      await Vue.axios.get('/api/vip/'+userInfo.vip_id,{
        params:{
          vid:userInfo.vip_id
        }
      }).then((response)=>{
        //console.log(response.data);
        if(response.data.code==1){
          this.editForm.user_name=response.data.data.user_name;
          this.editForm.vip_id=response.data.data.vip_id;
          this.editForm.vip_level=response.data.data.vip_level;
          var time1=response.data.data.start_time;
          var time2=response.data.data.end_time;
          var timediff=this.divTime(time1,time2)/24;
          //console.log(timediff);
          this.editForm.surplus=timediff;
        }
        else{
          this.$message.error('查询用户失败!');
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.editDialogVisible = true
    } ,
    // 监听 编辑用户信息对话框的关闭事件
    editDialogClosed() {
      // 重置表单
      this.$refs.editFormRef.resetFields() 
    },
    editUser(){
      this.$refs.editFormRef.validate(async valid => {
        //console.log(valid)
        if (!valid) return
        // 可以发起修改用户信息的网络请求
      await Vue.axios.put('/api/vip',{
        vip_id:this.editForm.vip_id,
        vip_level:this.editForm.vip_level,
        surplus:this.editForm.surplus
      }).then((response)=>{
        if(response.data.code==1){
              this.$message.success('修改会员信息成功!');
            }
            else if (response.data.code==0){
              this.$message.error('修改会员信息失败!');
            }
      }).catch((error)=>{
        console.log(error);
      });
      this.getVipList();
      this.editDialogVisible = false
     })
    },
    //删除会员
    async remove(scope){
      const confirmResult = await this.$confirm('您确定要永久删除该会员信息吗?', '删除会员', {
        confirmButtonText: '确定',
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
      await Vue.axios.delete('/api/vip/'+scope.row.vip_id,{
        params:{
          vid:scope.row.vip_id
        }
      }).then((response)=>{
        if(response.data.code==0){
          this.$message.error(response.data.message+'，删除失败');
        }
        else if(response.data.code==1){
          this.$message.success('删除会员成功！');
        }
      }).catch((error)=>{
        console.log(error);
      })
      this.getVipList()
    },

    //会员权限查看
    async showPermission(scope){
      Vue.axios.get('/api/permission/'+scope.row.vip_level).then((response)=>{
        if(response.data.code==1){
          this.permissionList=response.data.data;
          console.log(this.permissionList);
          this.$message.success('查询权限成功');
        }
        else{
          this.$message.error(response.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      })
      this.perDialogVisible=true;
    }
  }  

}
</script>

<style lang="less" scoped>


</style>