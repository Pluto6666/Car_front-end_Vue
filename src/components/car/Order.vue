<!--
 * @Author: your name
 * @Date: 2020-08-15 12:19:30
 * @LastEditTime: 2020-09-08 19:22:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \firstApp\src\pages\car\Category.vue
-->
<!--页面-->
<template>
<div class="opin" v-loading="loading">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container class="opin_header">
        <el-header style="margin-left: -20px;">
            <span>ID</span>
            <el-select v-model="currentAppName" placeholder="订单ID">
                <el-option v-for="item in options" :key="item.kid" :label="item.name" :value="item.name" @change="selectChanged">
                </el-option>
            </el-select>
            <span class="demonstration opin_header_timer">时间</span>
            <el-date-picker v-model="formatDate" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button class="opin_header_btn" type="primary" @click="handleQuery">查询</el-button>
        </el-header>
        <el-main style="margin-left: -20px;">
            <el-table :data="tableData" border style="width: 100%;margin-top:-20px;">
                <el-table-column prop="data_order" label="交易日期" align="center" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm" :formatter="dateFormat" width="160">
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
                <el-table-column width="185" prop="ifPass" label="订单状态操作">
                    <template slot-scope="scope">
                        <!--修改按钮-->
                        <el-tooltip class="item" effect="dark" content="订单已完成" placement="top" :enterable="false">
                            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>

                        <!--删除按钮-->
                        <el-tooltip class="item" effect="dark" content="订单已取消" placement="top" :enterable="false">
                            <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>

                        <!--分配角色-->
                        <el-tooltip class="item" effect="dark" content="订单未完成" placement="top" :enterable="false">
                            <el-button type="warning" plain size="mini" icon="el-icon-setting" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

                <el-table-column prop="fimageUrl" align="center" label="反馈截图">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.fimageUrl" lazy style="width: 50px;height:50px;" @click="openImg(scope.row.fimageUrl)">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination align="right" background layout="prev, pager, next" :total="total" :current-page="currentPage" @current-change="current_change">
            </el-pagination>
        </el-footer>
    </el-container>
    <el-dialog :append-to-body="true" width="400" :visible.sync="imgVisible" class="img-dialog" @close="handleCancel">
        <el-card :body-style="{ padding: '0px'}">
            <img :src="dialogImgUrl" width="100%" height="100%">
        </el-card>
    </el-dialog>
</div>
</template>

export default {
  name: 'OpinManager',
  mounted () {
    this.initOptions()
    this.initAllFeeds()
  },
  methods: {
    openImg (url) {
      if (url) {
        this.imgVisible = true
        this.dialogImgUrl = url
      }
    },
    handleCancel () {
      this.imgVisible = false
    },
    initOptions () {
      getRequest('/apps/appnames').then(resp => {
        if (resp) {
          this.options = resp.data
        }
      })
    },
    initAllFeeds () {
      let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize
      this.getFeeds(url)
    },
    getFeeds (url) {
      this.loading = true
      getRequest(url).then(resp => {
        if (resp) {
          this.tableData = resp.data
          this.total = resp.total
        }
        this.loading = false
      })
    },
    dateFormat (row, column, cellValue, index) {
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
      if (this.optRecord.name != null && this.optRecord.date == null) {
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&name=' + this.optRecord.name
        this.getFeeds(url)
      } else if (this.optRecord.name == null && this.optRecord.date != null) {
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&beginDateScope=' + this.optRecord.date
        this.getFeeds(url)
      } else if (this.optRecord.name != null && this.optRecord.date != null) {
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&name=' + this.optRecord.name + '&beginDateScope=' + this.optRecord.date
        this.getFeeds(url)
      } else {
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize
        this.getFeeds(url)
      }
    },
    selectChanged () {
      console.log(this.currentAppName)
    },
    handleQuery () {
      if (this.currentAppName == null && this.formatDate == null) {
        return
      }
      if (this.currentAppName != null && this.formatDate != null) {
        if (this.currentAppName === this.optRecord.name && this.formatDate === this.optRecord.date) {
          return
        }
        this.optRecord.name = this.currentAppName
        this.optRecord.date = this.formatDate
        this.currentPage = 1
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&name=' + this.currentAppName + '&beginDateScope=' + this.formatDate
        this.getFeeds(url)
      } else if (this.currentAppName != null) {
        this.optRecord.name = this.currentAppName
        this.currentPage = 1
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&name=' + this.currentAppName
        this.getFeeds(url)
      } else if (this.formatDate != null && this.formatDate !== this.optRecord.date) {
        this.optRecord.date = this.formatDate
        this.currentPage = 1
        let url = '/feedback/?page=' + this.currentPage + '&size=' + this.pagesize + '&beginDateScope=' + this.formatDate
        this.getFeeds(url)
      }
    }
  },
  watch: {
    formatDate (val) {
      if (val == null) {
        this.optRecord.date = null
      }
    }
  },
  data () {
    return {
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
    }
  }
}
</script>
