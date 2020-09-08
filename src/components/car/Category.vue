<!--
 * @Author: your name
 * @Date: 2020-08-15 12:19:30
 * @LastEditTime: 2020-09-08 19:21:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \firstApp\src\pages\car\Category.vue
-->
<template>
<div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card class="box-card">
        <el-row :gutter="30">
            <el-col :span="15">
                <!--搜索区域-->
                <el-input placeholder="请输入订单ID">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>

        </el-row>
        <!--修改用户信息的对话框-->
        <el-dialog title="修改订单信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <!--内容主体区域-->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="订单ID" prop="ORDER_ID">
                    <el-input v-model="editForm.ORDER_ID"></el-input>
                </el-form-item>
                <el-form-item label="买家ID" prop="BUYER_ID">
                    <el-input v-model="editForm.BUYER_ID"></el-input>
                </el-form-item>
                <el-form-item label="卖家ID" prop="SELLER_ID">
                    <el-input v-model="editForm.SELLER_ID"></el-input>
                </el-form-item>
                <el-form-item label="二手车ID" prop="CAR_ID">
                    <el-input v-model="editForm.CAR_ID"></el-input>
                </el-form-item>
                <el-form-item label="卖家标价" prop="PRICE_SELLER">
                    <el-input v-model="editForm.PRICE_SELLER"></el-input>
                </el-form-item>
                <el-form-item label="买家出价" prop="PRICE_BUYER">
                    <el-input v-model="editForm.PRICE_BUYER"></el-input>
                </el-form-item>
                <el-form-item label="下单时间" prop="DATA_ORDER">
                    <el-input v-model="editForm.DATA_ORDER"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" prop="STATUS">
                    <el-input v-model="editForm.STATUS"></el-input>
                </el-form-item>
            </el-form>
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
        <el-table :data="userlist" style="width: 100%" border :stripe="true">
            <el-table-column type="index" label="">
            </el-table-column>
            <el-table-column prop="ORDER_ID" label="订单ID" width="120">
            </el-table-column>
            <el-table-column prop="BUYER_ID" label="买家ID">
            </el-table-column>
            <el-table-column prop="SELLER_ID" label="卖家ID">
            </el-table-column>
            <el-table-column prop="CAR_ID" label="二手车ID">
            </el-table-column>
            <el-table-column prop="PRICE_SELLER" label="卖家标价">
            </el-table-column>
            <el-table-column prop="PRICE_BUYER" label="买家出价">
            </el-table-column>
            <el-table-column prop="DATA_ORDER" label="下单时间">
            </el-table-column>
            <el-table-column label="订单状态">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column width="185" label="操作">
                <template slot-scope="scope">
                    <!--修改按钮-->
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                    <!--删除按钮-->
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
                    <!--分配角色-->
                    <el-tooltip class="item" effect="dark" content="置顶订单" placement="top" :enterable="false">
                        <el-button type="warning" plain size="mini" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!--分页区域-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryinfo.pagenum" :page-sizes="[2, 5, 10, 15]" :page-size="queryinfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            queryinfo: {
                query: '', // 用户输入的搜索条件
                pagenum: 1, // 当前请求的是第几页数据
                pagesize: 2 // 每页显示几条数据
            },
            total: 3,
            userlist: [
                ////////////////////////////////////////////////
                {
                    ORDER_ID: '',
                    BUYER_ID: '',
                    SELLER_ID: '',
                    CAR_ID: '',
                    PRICE_SELLER: '',
                    PRICE_BUYER: '',
                    DATA_ORDER: '',
                    STATUS: '',
                }
            ],
            // addDialogVisible: false, // 控制添加用户对话框是否显示
            editDialogVisible: false, // 控制修改用户信息对话框是否显示
            // 添加用户的表单数据
            addForm: {
                ORDER_ID: '',
                BUYER_ID: '',
                SELLER_ID: '',
                CAR_ID: '',
                PRICE_SELLER: '',
                PRICE_BUYER: '',
                DATA_ORDER: '',
                STATUS: '',

            },
            // 修改用户信息的表单数据
            editForm: {
                ORDER_ID: '',
                BUYER_ID: '',
                SELLER_ID: '',
                CAR_ID: '',
                PRICE_SELLER: '',
                PRICE_BUYER: '',
                DATA_ORDER: '',
                STATUS: '',
            },
            // 添加用户表单的验证规则对象
            addFormRules: {
                ORDER_ID: [{
                        required: true,
                        message: '请输入订单ID',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                BUYER_ID: [{
                        required: true,
                        message: '请输入买家ID',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
                SELLER_ID: [{
                    required: true,
                    message: '请输入卖家ID',
                    trigger: 'blur'
                }],
                CAR_ID: [{
                    required: true,
                    message: '请输入汽车ID',
                    trigger: 'blur'
                }],
                PRICE_SELLER: [{
                    required: true,
                    message: '请输入卖家标价',
                    trigger: 'blur'
                }],
                PRICE_BUYER: [{
                    required: true,
                    message: '请输入买家出价',
                    trigger: 'blur'
                }],
                DATA_ORDER: [{
                    required: true,
                    message: '请输入下单时间',
                    trigger: 'blur'
                }],
                STATUS: [{
                    required: true,
                    message: '请输入订单状态',
                    trigger: 'blur'
                }],
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
            const {
                data: res
            } = await this.$http.get('users', {
                params: this.queryInfo
            })
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.userList = res.data.users
            this.total = res.data.total
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
        },
        // 监听 修改用户信息对话框的关闭事件
        editDialogClosed() {
            // 表单内容重置为空
            this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
        },
        // 点击按钮 修改用户信息
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return
                // 可以发起修改用户信息的网络请求
                const {
                    data: res
                } = await this.$http.put(
                    'users/' + this.editForm.id, {
                        email: this.editForm.email,
                        mobile: this.editForm.mobile
                    }
                )
                if (res.meta.status !== 200) {
                    return this.$message.error('修改订单信息失败！')
                }
                this.$message.success('修改订单信息成功！')
                // 关闭对话框
                this.editDialogVisible = false
                // 重新发起请求用户列表
                this.getUserList()
            })
        },
        // 根据ID删除对应的用户信息
        removeUserById(id) {
            this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },

    }

}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
