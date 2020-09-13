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
        <el-row :gutter="100">
            <el-col :span="15">
                <!--搜索区域-->
                <el-input v-model="car_vin" placeholder="请输入车架号" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>

                </el-input>
            </el-col>

        </el-row>

    </el-card>

    <!--编辑用户对话框-->
    <el-dialog title="修改状态" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">

        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCar">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="车架号查询" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!--内容主体区域-->
        <el-table :data="searchlist" style="width: 100%" border :stripe="true">
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
            <el-table-column prop="date_produce" label="出厂年份">
            </el-table-column>
            <el-table-column prop="date_buyin" label="入手年份">
            </el-table-column>
            <el-table-column prop="car_condition" label="损耗程度">
            </el-table-column>
            <el-table-column prop="check_data" label="年检信息">
            </el-table-column>
            <el-table-column prop="accident" label="车祸次数">
            </el-table-column>
            <el-table-column prop="kilometer" label="公里数">
            </el-table-column>
            <el-table-column width="185" prop="ifPass" label="审核状态">

            </el-table-column>
        </el-table>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">确定</el-button>

        </span>
    </el-dialog>

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
        <el-table-column prop="date_produce" label="出厂年份">
        </el-table-column>
        <el-table-column prop="date_buyin" label="入手年份">
        </el-table-column>
        <el-table-column prop="car_condition" label="损耗程度">
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
                    <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="ifPass1(scope.row)"></el-button>
                </el-tooltip>

                <!--删除按钮-->
                <el-tooltip class="item" effect="dark" content="审核未通过" placement="top" :enterable="false">
                    <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="ifPass0(scope.row)"></el-button>
                </el-tooltip>

                <!--分配角色-->
                <el-tooltip class="item" effect="dark" content="Car_id生成并传入后端" placement="top" :enterable="false">
                    <el-button type="warning" plain size="mini" icon="el-icon-setting" @click="showEditDialog(scope.row)"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>

</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            car_vin: '',
            // queryinfo: {
            //     query: '', // 用户输入的搜索条件
            //     pagenum: 1, // 当前请求的是第几页数据
            //     pagesize: 2 // 每页显示几条数据
            // },
            // total: 3,
            todayDate: "", //当前日期
            auditlist: [],
            editDialogVisible: false, // 控制修改用户信息对话框是否显示
            addDialogVisible: false, // 修改用户信息的表单数据
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

            searchlist: [],
        }
    },

    created() { // 生命周期函数
        this.getCarList()
    },
    methods: {
        // 监听 pageSize 改变的事件
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryInfo.pagesize = newSize
            // 重新发起请求用户列表
            this.getCarList()
        },
        // 监听 当前页码值 改变的事件
        handleCurrentChange(newPage) {
            // console.log(newPage)
            this.queryInfo.pagenum = newPage
            // 重新发起请求用户列表
            this.getCarList()
        },
        async getCarList() {

            // this.userList = res.data
            setInterval(this.nowTime, 1000);

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
        userStateChanged(carinfo) {
            console.log(carinfo)
        },
        // 监听 添加用户对话框的关闭事件
        addDialogClosed() {
            // 表单内容重置为空
            this.$refs.addFormRef.resetFields()
        },
        ifPass1(carinfo) {
            carinfo.ifPass = 1;
            console.log(carinfo);

        },
        ifPass0(carinfo) {
            carinfo.ifPass = 0;
            console.log(carinfo);

        },
        // 监听 修改用户状态
        async showEditDialog(carinfo) {
            carinfo.car_id = this.todayDate;
            // carinfo.car_id = 111;
            this.editForm = carinfo;
            console.log(this.editForm);
            this.editDialogVisible = true

        },
        editCar() {
            Vue.axios.post('/api/Audit/notaudit', this.editForm).then((response) => {
                //console.log(response);
                if (response.data.code == 1) {
                    this.$message.success('修改审核状态成功!');
                } else if (response.data.code == 0) {
                    this.$message.error('修改审核状态失败!');
                }
            }).catch((error) => {
                console.log(error);
            });
            this.getCarList();
            this.editDialogVisible = false

        },

        // 监听 修改用户信息对话框的关闭事件
        editDialogClosed() {
            // 表单内容重置为空
            this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
        },
        nowTime() {
            let myDate = new Date();
            let year = myDate.getFullYear();
            let month = myDate.getMonth() + 1;
            let date = myDate.getDate();
            let hours = myDate.getHours();
            let minutes = myDate.getMinutes();
            let seconds = myDate.getSeconds();
            var week = "星期" + "日一二三四五六".charAt(myDate.getDay());
            hours = this.check(hours);
            minutes = this.check(minutes);
            seconds = this.check(seconds);
            this.todayDate =
                hours + ":" + minutes + '  ' + seconds + '   ' + week + '  ' + month + '/' + date + '/' + year;
        },
        //  检验时间补零的方法
        check(i) {
            let num;
            i < 10 ? (num = "0" + i) : (num = i);
            return num;
        },

        //搜索单条车架号信息
        Search() {
            console.log(this.car_vin);
            Vue.axios.get('/api/Audit/audit/' + this.car_vin).then((response) => {
                if (response.data.code == 1) {
                    this.searchlist = response.data.data;
                    console.log(this.searchlist);
                    this.$message.success("查询车架号信息成功！");
                } else {
                    this.$message.error(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
            })

            this.addDialogVisible = true

        }

    },

}
</script>

<style lang="less" scoped>

</style>
