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
        <el-row :gutter="100">
            <el-col :span="15">
                <!--搜索区域-->
                <el-input v-model="order_id" placeholder="请输入订单ID" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="Search"></el-button><!-- unfinished -->

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

    <el-dialog title="价格范围筛选" :visible.sync="rangeDialogVisible" width="50%" @close="rangeDialogClosed">
        <!--内容主体区域-->
        <el-table :data="rangeList" style="width: 100%" border :stripe="true">
            <el-table-column type="index" label="">
            </el-table-column>
            <el-table-column prop="order_id" label="订单ID" width="120">
            </el-table-column>

            <el-table-column prop="car_vin" label="车架号" width="120">
            </el-table-column>

            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="buyer_id" label="买家ID">
            </el-table-column>
            <el-table-column prop="seller_id" label="卖家ID">
            </el-table-column>
            <el-table-column prop="date_order" label="订单日期">
            </el-table-column>
            <el-table-column prop="status" label="审核状态">

            </el-table-column>
        </el-table>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
            <el-button @click="rangeDialogVisible = false">确定</el-button>

        </span>
    </el-dialog>

    <!--表格区域-->
    <el-container class="opin_header">
        <el-header style="margin-left: -20px;">
            <span>价格</span>
            <el-select v-model="value" placeholder="请选择价格范围">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @change="selectChanged">
                </el-option>
            </el-select>
            <span class="demonstration opin_header_timer">时间</span>
            <el-date-picker v-model="formatDate" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button class="opin_header_btn" type="primary" @click="handleQuery">查询</el-button>
        </el-header>
        <el-main style="margin-left: -20px;">
            <el-table :data="orderList" border style="width: 100%;margin-top:-20px;">
                <el-table-column prop="date_order" label="交易日期" align="center" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm" :formatter="dateFormat" width="160">
                </el-table-column>
                <el-table-column prop="order_id" align="center" label="订单ID" width="160">
                </el-table-column>
                <el-table-column prop="buyer_id" align="center" label="买家ID">
                </el-table-column>
                <el-table-column prop="seller_id" align="center" label="卖家ID">
                </el-table-column>
                <el-table-column prop="car_id" align="center" label="汽车ID">
                </el-table-column>
                <el-table-column prop="price" align="center" label="价格">
                </el-table-column>
                <el-table-column width="185" prop="status" label="订单状态">
                    <template slot-scope="scope">
                        <!--修改按钮-->
                        <el-tooltip class="item" effect="dark" content="订单已完成" placement="top" :enterable="false">
                            <el-button type="primary" plain size="mini" icon="el-icon-success" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>

                        <!--删除按钮-->
                        <el-tooltip class="item" effect="dark" content="订单已取消" placement="top" :enterable="false">
                            <el-button type="danger" plain size="mini" icon="el-icon-error" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>

                        <!--分配角色-->
                        <el-tooltip class="item" effect="dark" content="订单未完成" placement="top" :enterable="false">
                            <el-button type="warning" plain size="mini" icon="el-icon-setting" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>
        <el-footer>
            <el-pagination align="right" background layout="prev, pager, next" :total="total" :current-page="currentPage" @current-change="current_change">
            </el-pagination>
        </el-footer>
    </el-container>

</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            //
            imgVisible: false,
            dialogImgUrl: null,
            total: 0,
            pagesize: 10,
            currentPage: 1,
            currentAppName: null,
            formatDate: null,
            loading: false,
            options: [],
            optRecord: {
                name: null,
                date: null
            },
            feedbasks: Array,

            //订单ID查询
            order_id: '',
            //价格范围选择器
            range: {
                highprice: '',
                lowprice: ''
            },
            rangeList: [],
            value: '',
            options: [{
                    value: '选项1',
                    label: '1w~20w            RMB'

                },
                {
                    value: '选项2',
                    label: '20w~30w            RMB'

                },
                {
                    value: '选项3',
                    label: '30w~40w            RMB'

                },
                {
                    value: '选项4',
                    label: '40w~50w            RMB'

                }, {
                    value: '选项5',
                    label: '50w~60w            RMB'

                },

            ],
            // queryinfo: {
            //     query: '', // 用户输入的搜索条件
            //     pagenum: 1, // 当前请求的是第几页数据
            //     pagesize: 2 // 每页显示几条数据
            // },
            // total: 3,
            todayDate: "", //当前日期
            orderList: [],
            editDialogVisible: false, // 控制修改用户信息对话框是否显示
            searchDialogVisible: false, // 修改用户信息的表单数据
            rangeDialogVisible: false, //范围筛选
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
        // // 监听 pageSize 改变的事件
        // handleSizeChange(newSize) {
        //     // console.log(newSize)
        //     this.queryInfo.pagesize = newSize
        //     // 重新发起请求用户列表
        //     this.getCarList()
        // },
        // // 监听 当前页码值 改变的事件
        // handleCurrentChange(newPage) {
        //     // console.log(newPage)
        //     this.queryInfo.pagenum = newPage
        //     // 重新发起请求用户列表
        //     this.getCarList()
        // },
        async getCarList() {

            // this.userList = res.data
            setInterval(this.nowTime, 1000);

            Vue.axios.get('/api/order').then((response) => {
                // console.log(response);
                // console.log(response.data);
                this.orderList = response.data.data;
                // console.log(this.orderList);
                if (response.data.code == 1) {
                    this.$message.success('查询成功！');

                } else {
                    this.$message.error('查询失败，' + response.data.message + '！')
                }
            })
        },
        // 监听 当前状态值 改变事件/////////
        userStateChanged(carinfo) {
            console.log(carinfo);
            if (carinfo.ifPass == 1) {
                carinfo.ifPass = 0;

            } else {
                carinfo.ifPass = 1;
            }
        },
        // 监听 添加用户对话框的关闭事件
        rangeDialogClosed() {
            // 表单内容重置为空
            this.$refs.addFormRef.resetFields()
        },
        // ifPass1(carinfo) {
        //     carinfo.ifPass = 1;
        //     console.log(carinfo);

        // },
        // ifPass0(carinfo) {
        //     carinfo.ifPass = 0;
        //     console.log(carinfo);

        // },
        // 监听 修改用户状态
        async showEditDialog(carinfo) {
            carinfo.car_id = this.todayDate;
            // carinfo.car_id = 111;
            this.editForm = carinfo;
            console.log(this.editForm);
            this.editDialogVisible = true

        },
        //修改订单状态接口
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
        //当前时间
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

        //搜索单条订单ID信息
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

            this.searchDialogVisible = true

        },

        //价格范围筛选
        selectChanged() {
            console.log(this.options)
        },
        handleQuery() {
            if (this.options == null) {
                return
            } else if (this.value == '选项1') {
                this.range.highprice = 200000;
                this.range.lowprice = 10000;
                Vue.axios.post('/api/orderprice', this.range).then((response) => {
                    if (response.data.code == 1) {
                        this.$message.success('价格范围筛选成功!');
                        this.rangeList = response.data.data;
                    } else if (response.data.code == 0) {
                        this.$message.error('价格范围筛选失败!');
                    }

                }).catch((error) => {
                    console.log(error);
                })
                this.rangeDialogVisible = true

            }

        }

    },

}
</script>

<style lang="less" scoped>

</style>
