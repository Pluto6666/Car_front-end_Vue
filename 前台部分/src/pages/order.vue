<template>
  <div style="margin-top:20px">
    <span style="float:right;margin-right:20px;">个人资金：<span style="color:red">{{'￥'+money}}</span></span>
    <el-container style="clear:right;">
      <el-main>
        <el-table :data="orderList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="订单编号" prop="order_id" width="150px"></el-table-column>
          <el-table-column label="订单价格" prop="price" width="150px"></el-table-column>
          <el-table-column label="订单状态" prop="status" width="150px">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 0">未付款</el-tag>
              <el-tag type="success" v-if="scope.row.status === 1">已付款</el-tag>
              <el-tag type="success" v-if="scope.row.status === 2">已撤回</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="买家id" prop="buyer_id" width="150px"></el-table-column>
          <el-table-column label="卖家id" prop="seller_id" width="150px"></el-table-column>
          <el-table-column label="下单时间" prop="date_order" width="140px"></el-table-column>
          <el-table-column label="操作" prop="status" width="250px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="pay( scope.row )" v-if="scope.row.status === 0">付款</el-button>

              <el-button
                type="success"
                size="mini"
                icon="el-icon-location"
                @click="withdraw( scope.row )"
              v-if="scope.row.status === 0">取消订单</el-button>

            <p v-if="scope.row.status === 1">订单已完成</p>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      seen:false,
      money: 0,
      // 获取订单列表的参数对象
      orderList: [], // 订单列表
      total: 0, // 订单总数
      withdraw_vin: "",
      payList: {
        car_vin: "",
        seller_id: "",
        buyer_id: "",
        price: 111000,
      },
    };
  },
  mounted() {
    //自动加载
    this.getorderList();
  },
  methods: {
    getorderList() {
      console.log(this.orderList);
      axios
        .post("/api/Myinformation/myorder/" + window.sessionStorage.getItem("userid"))
        .then((response) => {
          console.log(response);
          this.orderList = response.data.data;
          console.log(this.orderList);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("/api/money/" + window.sessionStorage.getItem("userid"))
        .then((response) => {
          console.log(response);
          this.money = response.data.data.money;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    pay(val) {
      // console.log(val);
      this.payList.car_vin = val.car_vin;
      this.payList.seller_id = val.seller_id;
      this.payList.buyer_id = val.buyer_id;
      this.payList.price = val.price;
      console.log(this.payList);
      this.$confirm('是否确认付款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      axios
        .post("/api/money", this.payList)
        .then((response) => {
          console.log(response);
          this.money=response.data.money;
          this.orderList.status=response.data.status;
           this.$message({
                       type: 'success',
                       message: '支付成功!'
                   });
          setTimeout(()=>{location.reload()},1000);
        })
        .catch(function (error) {
          console.log(error);
          this.$message({
                      type: 'error',
                      message: error,
            });  
        });
    }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '支付已取消'
                });          
          }); 
    },
    withdraw(val) {
      console.log(val);
      this.withdraw_vin = val.car_vin;
      this.$confirm('真的不买了吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      axios
        .delete("/api/order/" + this.withdraw_vin)
        .then((response) => {
          console.log(response);
          this.$message({
                       type: 'success',
                       message: '订单撤销成功!'
                   });
          setTimeout(()=>{location.reload()},1000);
        })
        .catch(function (error) {
          console.log(error);
           this.$message({
                      type: 'error',
                      message: error,
            });  
        });
    }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '感谢您的支持'
                });          
          }); 
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>