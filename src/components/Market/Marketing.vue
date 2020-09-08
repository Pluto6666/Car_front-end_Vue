<template>
<div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人气推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户访问信息列表</el-breadcrumb-item>
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
            <el-col :span="4">
                <el-button type="primary">添加访问信息</el-button>
            </el-col>
        </el-row>

        <!--表格区域-->
        <el-table :data="userlist" style="width: 100%" border :stripe="true">
            <el-table-column type="index" label="">
            </el-table-column>
            <el-table-column prop="USER_ID" label="用户ID" width="120">
            </el-table-column>
            <el-table-column prop="PARATITION" label="常看分区">
            </el-table-column>
            <el-table-column prop="VISIT_TIMES" label="阅读常看分区次数">
            </el-table-column>
            <el-table-column prop="DEMAND" label="当前需求">
            </el-table-column>
            <el-table-column prop="HABIT" label="浏览习惯">
            </el-table-column>
            <el-table-column width="185" label="操作">
                <template slot-scope="scope">
                    <!--修改-->
                    <el-tooltip class="item" effect="dark" content="修改信息" placement="top" :enterable="false">
                        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                    </el-tooltip>
                    <!--删除-->
                    <el-tooltip class="item" effect="dark" content="删除访问信息" placement="top" :enterable="false">
                        <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                    </el-tooltip>
                    <!--分配角色-->

                    <el-tooltip class="item" effect="dark" content="访问信息置顶" placement="top" :enterable="false">
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
                pagesize: 10 // 每页显示几条数据
            },
            total: 3,
            userlist: [{
                    num: 1,
                    USER_ID: "DADAS",
                    PARATITION: "SDADA",
                    VISIT_TIMES: "DASDAD",
                    DEMAND: "SDAD",
                    HABIT: "SDAD"
                },
                {
                    num: 2,
                    USER_ID: "DADAS",
                    PARATITION: "SDADA",
                    VISIT_TIMES: "DASDAD",
                    DEMAND: "SDAD",
                    HABIT: "SDAD"
                },
                {
                    num: 3,
                    USER_ID: "DADAS",
                    PARATITION: "SDADA",
                    VISIT_TIMES: "DASDAD",
                    DEMAND: "SDAD",
                    HABIT: "SDAD"
                }
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
        }
    }

}
</script>

<style lang="less" scoped>

</style>
