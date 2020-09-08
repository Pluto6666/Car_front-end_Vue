<template>
 <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="15">
          <!--搜索区域-->
          <el-input placeholder="请输入内容" v-model="queryinfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!--表格区域-->
      <el-table 
      	:data="userlist" 
      	style="width: 100%" 
      	border 
      	:stripe="true">
        <el-table-column 
        	type="index" 
        	label="">
        </el-table-column>
        <el-table-column 
        	prop="user_name" 
        	label="用户姓名"
          sortable>
        </el-table-column>
        <el-table-column 
        	prop="user_id" 
        	label="用户id"
          sortable>
        </el-table-column>
        <el-table-column 
        	prop="gender" 
        	label="性别">
        </el-table-column>
        <el-table-column 
        	prop="city" 
        	label="城市">
		</el-table-column>
        <!--<el-table-column 
        	label="登录状态">
        	<template slot-scope="scope">
          	<el-switch 
          		v-model="scope.row.mg_state">
          	</el-switch>
     		</template>
        </el-table-column>-->
        <el-table-column 
        	width="185"
        	label="操作">
			<template slot-scope="scope">
            	<!--修改-->
            	<el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false" >
					<el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
				</el-tooltip>
				<!--删除-->
				<el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
					<el-button type="danger" plain size="mini" icon="el-icon-delete" @click="remove(scope)"></el-button>
				</el-tooltip>
				<!--分配角色-->
				<el-tooltip class="item" effect="dark" content="设为会员" placement="top" :enterable="false">
     				<el-button type="warning" plain size="mini" icon="el-icon-setting" @click="setVip(scope.row)"></el-button>
				</el-tooltip>
      		</template>
        </el-table-column>
     </el-table>


     <!--分页区域-->
    <el-pagination
      	@size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.page_num"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryinfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
	</el-pagination>
</el-card>



    <!--添加用户的对话框-->
  <el-dialog 
      title="添加用户" 
      :visible.sync="addDialogVisible" 
      width="50%" 
      @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :label-position="labelPosition" :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户id" prop="user_id">
            <el-input v-model="addForm.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="addForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <!--<el-input v-model="addForm.gender"></el-input>-->
            <el-select v-model="addForm.gender" clearable placeholder="选择用户性别">
              <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <!--<el-input v-model="addForm.city"></el-input>-->
            <v-distpicker :placeholders="placeholders" @selected="onSelectedCity2" hide-area></v-distpicker>
          </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
  </el-dialog>


  <!--编辑用户对话框-->
  <el-dialog 
      title="修改用户" 
      :visible.sync="editDialogVisible" 
      width="50%" 
      @close="editDialogClosed">
      <!-- 编辑用户的表单 -->
      <el-form :label-position="labelPosition"
               :model="editForm" 
               :rules="editFormRules" 
               ref="editFormRef" 
               label-width="70px">
          <el-form-item label="用户id" prop="user_id">
            <el-input v-model="editForm.user_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="editForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="editForm.gender" clearable placeholder="选择用户性别">
              <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <!--<el-input v-model="editForm.city"></el-input>-->
            <v-distpicker :placeholders="placeholders" @selected="onSelectedCity" hide-area></v-distpicker>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
  </el-dialog>

  <!--分配会员对话框-->
  <el-dialog 
    title="会员设置" 
    :visible.sync="setVipDialogVisible" 
    width="30%"
    @close="setVipDialogClosed">
    <div>
        <p>当前的用户：{{vipInfo.user_name}}</p>
        <p>当前用户id：{{vipInfo.user_id}}</p>
        <p>分配会员等级：
          <el-select v-model="selectedVipLevel" placeholder="请选择会员等级">
              <el-option v-for="item in vipLevelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </p>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="setVipDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVip">确 定</el-button>
      </span>
  </el-dialog>



    
  </div>
</template>

<script>
  import Vue from 'vue'
  import VDistpicker from 'v-distpicker'
export default {
	components: { VDistpicker },
  data(){
    return {
      labelPosition:'top',
			queryinfo: {
        		query: '', // 用户输入的搜索条件
        		page_num: 1, // 当前请求的是第几页数据
        		page_size: 5 // 每页显示几条数据
      			},
      total : 0 ,
			userlist:[],
      genderList:[
        {value:"男",label:"男"},
        {value:"女",label:"女"}
      ],
      vipLevelList:[
        {value:1 ,label:'一级'},
        {value:2 ,label:'二级'},
        {value:3 ,label:'三级'}
      ],
        resData:[],
        postData:[],
        // 控制添加用户对话框的显示和隐藏
        addDialogVisible: false, 
        //添加用户的表单数据
        addForm:{
          user_id:'',
          password:'',
          user_name:'',
          gender:'',
          city:''
        },
        //添加表单的校验规则
        addFormRules:{
          user_id:[
            { required: true, message: '请输入7位用户id', trigger: 'blur' },
            { min: 7, max: 7, message: '长度必须为7位', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          user_name:[
            { required: true, message: '请输入用户名（昵称）', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          gender:[
            { required: true, message: '请输入用户性别', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          city:[
            { required: true, message: '请输入用户城市', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },


        // 控制修改用户对话框显示和隐藏
        editDialogVisible: false,
         // 修改用户信息的表单数据
        editForm: {
          user_id:'',
          password:'',
          user_name:'',
          gender:'',
          city:''
        },
        // 编辑的表单验证规则
        editFormRules: {
          user_id:[
            { required: true, message: '请输入7位用户id', trigger: 'blur' },
            { min: 7, max: 7, message: '长度必须为7位', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          user_name:[
            { required: true, message: '请输入用户名（昵称）', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          gender:[
            { required: true, message: '请输入用户性别', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          city:[
            { required: true, message: '请输入用户城市', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },

        //控制分配会员对话框显示与隐藏
        setVipDialogVisible:false,
        vipInfo:{},
        selectedVipLevel: '', // 已选中的会员等级

        //城市选择器相关
        placeholders: {
              province: '------- 省 --------',
              city: '--- 市 ---'
              
          }
		}
	},
  created(){
    this.getUserList();
  },
	methods: {
    //根据查询参数获取用户列表
  getUserList(){
      //console.log(this.queryinfo)
      //发起get请求并携带查询参数
      Vue.axios.post('/api/users',this.queryinfo).then((response)=>{
          //console.log(response);
          //console.log(response.data);
          this.userlist=response.data.data.users;
          
          this.total=response.data.data.total;

          if(response.data.code==1){
            this.$message.success('查询用户列表成功！');

          }
          else if(response.data.code==0){
            this.$message.error('查询用户列表失败！');
          }
        }).catch((error)=>{
        console.log(error);
      });
    },
     // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
       // console.log(newSize)
      this.queryinfo.page_size = newSize;
      this.getUserList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
       // console.log(newPage)
      this.queryinfo.page_num = newPage;
      this.getUserList();
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    } ,
    addUser() {
     this.$refs.addFormRef.validate(async valid => {
        //console.log(valid)
        //console.log(this.addForm)
        if (!valid) return
        // 可以发起添加用户的网络请求
      /*Vue.axios.get('/api/uid/1851202',{   
          params:{
            uid:"1851202"
          }
      }).then((response)=>{
        console.log(response);
        console.log(response.data);
        this.resData = response.data;
      }).catch((error)=>{
        console.log(error);
      });*/

      Vue.axios.post('/api/register',this.addForm
        ).then((response)=>{
        //console.log(response);
        //console.log(response.data);
        this.postData = response.data;
        if(this.postData.code==1){
          this.$message.success('添加用户成功！');
        }
        else if(this.postData.code==0){
          this.$message.error('添加用户失败,'+this.postData.message+'!');
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.getUserList();
      this.addDialogVisible = false
     })
    },
   // 监听 编辑用户信息对话框的关闭事件
    editDialogClosed() {
      // 重置表单
      this.$refs.editFormRef.resetFields() 
    },
    // 监听 编辑用户状态
    async showEditDialog(userInfo) {
      //console.log(userInfo)
      await Vue.axios.get('/api/uid/'+userInfo.user_id,{
        params:{
          uid:userInfo.user_id
        }
      }).then((response)=>{
        //console.log(response);
        //console.log(response.data);
        if(response.data.code==0){
          this.$message.error('查询用户失败!');
        }
        else{
          this.editForm=response.data.data;
          //console.log(this.editForm);
        }
      }).catch((error)=>{
        console.log(error);
      });
      this.editDialogVisible = true
    } ,
    editUser(){
      this.$refs.editFormRef.validate(async valid => {
        //console.log(valid)
        //console.log(this.editForm)
        if (!valid) return
        // 可以发起修改用户信息的网络请求
        Vue.axios.put('/api/uid',this.editForm
          ).then((response)=>{
            //console.log(response);
            if(response.data.code==1){
              this.$message.success('修改用户信息成功!');
            }
            else if (response.data.code==0){
              this.$message.error('修改用户信息失败!');
            }
          }).catch((error)=>{
            console.log(error);
          });
          this.getUserList();
        this.editDialogVisible = false
     })
    },
    //删除用户
    async remove(scope){
      const confirmResult = await this.$confirm('您确定要永久删除该用户吗?', '删除用户', {
        confirmButtonText: '是的',
        cancelButtonText: '再想想',
        type: 'warning'
      }).catch(err => err)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      //管理员用户不能删除
      if(scope.row.user_name=='admin'){
        return this.$message({
          type:'info',
          message:'不允许删除管理员用户，已取消删除'
        })
      }
      await Vue.axios.delete('/api/uid/'+scope.row.user_id,{
        params:{
          uid:scope.row.user_id
        }
      }).then((response)=>{
        if(response.data.code==0){
          this.$message.error(response.data.message+'，删除失败');
        }
        else if(response.data.code==1){
          this.$message.success('用户删除成功！');
        }
      }).catch((error)=>{
        console.log(error);
      })
      this.getUserList()
    },
    //展示会员设置对话框
    setVip(userInfo){
      this.vipInfo=userInfo;
      this.setVipDialogVisible=true;
    },
    // 监听 会员设置对话框的关闭事件
    setVipDialogClosed(){
      this.selectedVipLevel='';
      this.vipInfo={};
    },
    //添加会员函数
    async addVip(){
      if(!this.selectedVipLevel){
        return this.$message.warning('请选择会员等级!');
      }
      Vue.axios.post('/api/vip',{
          vip_id:this.vipInfo.user_id,
          vip_level:this.selectedVipLevel
      }).then((response)=>{
        //console.log(response.data);
        if(response.data.code==1){
          this.$message.success('添加会员成功!');
        }
        else if(response.data.code==0){
          this.$message.info('该用户已是会员。');
        }
      }).catch((error)=>{
        console.log(error);
      })
      this.getUserList();
      this.setVipDialogVisible=false;
    },

    //城市选择函数
    onSelectedCity(data) {
      this.editForm.city=data.province.value+'-'+data.city.value;
    },
    onSelectedCity2(data) {
      this.addForm.city=data.province.value+'-'+data.city.value;
    }
  }

}
</script>

<style lang="less" scoped>


</style>