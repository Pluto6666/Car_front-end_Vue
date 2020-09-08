<template>
<div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审核管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
        <el-row :gutter="30">
            <el-col :span="15">
                <!--搜索区域-->
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>

                </el-input>
            </el-col>
        </el-row>

        <!--修改用户信息的对话框-->
        <el-dialog title="修改订单信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <!--内容主体区域-->

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <el-row :gutter="30">
            <el-col :span="15" lg="3">
                <span>价格范围</span>
                <el-select v-model="selectfinish" placeholder="请选择">
                    <el-option v-for="item in finish" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <span>时间范围</span>
                <el-select v-model="selectcity" placeholder="请选择">
                    <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <!--表格区域-->
        <el-table :data="auditlist" style="width: 100%" border :stripe="true">
            <el-table-column type="index" label="">
            </el-table-column>
            <el-table-column prop="car_id" label="车号" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="120">
            </el-table-column>
            <el-table-column prop="user_id" label="用户id" width="120">
            </el-table-column>
            <el-table-column prop="car_vin" label="车架号" width="120">
            </el-table-column>
            <el-table-column prop="brand" label="品牌">
            </el-table-column>
            <el-table-column prop="car_name" label="车型">
            </el-table-column>
            <el-table-column prop="color" label="颜色">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="displacement" label="排量">
            </el-table-column>
            <el-table-column prop="data_produce" label="出厂年份">
            </el-table-column>
            <el-table-column prop="data_buyin" label="入手年份">
            </el-table-column>
            <el-table-column prop="carcondition" label="损耗程度">
            </el-table-column>
            <el-table-column prop="check_data" label="年检信息">
            </el-table-column>
            <el-table-column prop="accident" label="车祸次数">
            </el-table-column>
            <el-table-column prop="kilometer" label="公里数">
            </el-table-column>
            <el-table-column width="185" prop="ifPass" label="审核状态操作">
                <template slot-scope="scope">
                    <!--修改按钮-->
                    <el-tooltip class="item" effect="dark" content="审核通过" placement="top" :enterable="false">
                        <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                    </el-tooltip>

                    <!--删除按钮-->
                    <el-tooltip class="item" effect="dark" content="审核未通过" placement="top" :enterable="false">
                        <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="showEditDialog(scope.row)"></el-button>
                    </el-tooltip>

                    <!--分配角色-->
                    <el-tooltip class="item" effect="dark" content="暂未审核" placement="top" :enterable="false">
                        <el-button type="warning" plain size="mini" icon="el-icon-setting" @click="showEditDialog(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

    </el-card>
</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            // queryinfo: {
            //     query: '', // 用户输入的搜索条件
            //     pagenum: 1, // 当前请求的是第几页数据
            //     pagesize: 2 // 每页显示几条数据
            // },
            // total: 3,
            auditlist: [],
            editDialogVisible: false, // 控制修改用户信息对话框是否显示
            // 修改用户信息的表单数据
            editForm: {
                accident: '',
                car_vin: '',
                car_condition: '',
                date_buyin: '',
                date_produce: '',
                color: '',
                brand: '',
                price: '',
                check_data: '',
                car_name: '',
                displacement: '',
                ifPass: '',
                kilometer: '',
                car_id: '',
                phone: '',
                user_id: ''
            },

        }
    },

    created() { // 生命周期函数
        this.getUserList()
    },
    methods: {
        // 监听 pageSize 改变的事件
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryInfo.pagesize = newSize
            // 重新发起请求用户列表
            this.getUserList()
        },
        // 监听 当前页码值 改变的事件
        handleCurrentChange(newPage) {
            // console.log(newPage)
            this.queryInfo.pagenum = newPage
            // 重新发起请求用户列表
            this.getUserList()
        },
        async getUserList() {

            // this.userList = res.data

            Vue.axios.get('/api/Audit/audit').then((response) => {
                // console.log(response);
                // console.log(response.data);
                this.auditlist = response.data.data;
                // console.log(this.auditlist);
                if (response.data.code == 1) {
                    this.$message.success('查询成功！');

                } else {
                    this.$message.error('查询失败，' + response.data.message + '！')
                }
            })
        },
        // 监听 当前状态值 改变事件/////////
        userStateChanged(userinfo) {
            console.log(userinfo)
        },
        // 监听 添加用户对话框的关闭事件
        addDialogClosed() {
            // 表单内容重置为空
            this.$refs.addFormRef.resetFields()
        },
        // 监听 修改用户状态
        showEditDialog(userinfo) {
            this.editDialogVisible = true
            console.log(userinfo)
            this.editForm = userinfo
            //接口还未布置
            // Vue.axios.post('/api/Audit/option', this.editForm).then((response) => {
            //     if (response.data.code == 1) {
            //         this.$message.success('成功！');

            //     } else {
            //         this.$message.error('失败，' + response.data.message + '！')
            //     }
            // })
            // // 关闭对话框
            // this.editDialogVisible = false
            // // 重新发起请求用户列表
            // this.getUserList()

        },
        // 监听 修改用户信息对话框的关闭事件
        editDialogClosed() {
            // 表单内容重置为空
            this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
        },

    }

}
</script>

<style lang="less" scoped>

</style>
