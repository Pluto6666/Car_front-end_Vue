<template>
  <div>
    <el-container>
      <el-main>
        <el-table :data="carsList" style="width: 100%">
          <el-table-column prop="car_id" label="车辆ID" width="180"></el-table-column>
          <el-table-column prop="car_vin" label="车架号" width="180"></el-table-column>
          <el-table-column prop="car_condition" label="新旧情况" width="150"></el-table-column>
          <el-table-column prop="price" label="价格" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-plus"   @click="placeOrder( scope.row )">下单</el-button>


              <el-button
                size="mini"
                type="danger"
                icon="el-icon-plus"
                @click="deleteGood( scope.row )"
              >删除</el-button>
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
      carsList: [],
      checkAll: false,
      isIndeterminate: true,
      deleteGoods:{
          car_vin: "",
            user_id: ""
      },
      orderData:{
        car_vin:"",
        seller_id:"",
        buyer_id:"",
        date_order:"",
        price:0

      },
      todayDate:"",
      allPrice: 0,
      buyer_id:"1853802",
    };
  },
  mounted() {
    //自动加载
    this.getCarsList();
    setInterval(this.nowTime, 1000);
  },
  methods: {
    deleteGood(val) {
      console.log(val.car_vin);
      console.log(val.user_id);
      this.deleteGoods.car_vin=val.car_vin;
      this.deleteGoods.user_id=val.user_id;
     
      console.log(this.deleteGoods);
      this.$confirm('确认要删除此宝贝吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that=this;
      this.$axios
        .delete("/api/cart/"+val.car_vin+"/"+window.sessionStorage.getItem("userid")
        )
        .then(function (response) {
          console.log(response);
          that.$message({
                type: 'success',
                message: '删除成功!'
            });
          setTimeout(()=>{location.reload()},1000);
        })
        .catch(function (error) {
          console.log(error);
          that.$message({
                       type: 'error',
                       message: error
              });
        });
    }).catch(() => {
            this.$message({
                    type: 'info',
                    message: '感谢您的支持'
                });          
          }); 
    },
    getCarsList() {
      //  console.log(abc);
      this.$axios
        .get("/api/cart/" + window.sessionStorage.getItem("userid"))
        .then((response) => {
          console.log(response);
          this.carsList = response.data.data;
          // console.log(this.carsList);
        })
        .catch(function (error) {
          console.log(error);
        });
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
       year+'/'+month+'/'+date;
    },
//  检验时间补零的方法
check(i) {
      let num;
      i < 10 ? (num = "0" + i) : (num = i);
      return num;
    },
     placeOrder(val){

   console.log(this.todayDate);
   this.orderData.car_vin=val.car_vin;
   this.orderData.seller_id=val.user_id;
   this.orderData.buyer_id= window.sessionStorage.getItem("userid");
   this.orderData.price=val.price;
   this.orderData.date_order=this.todayDate;
    console.log(this.orderData);
    var that=this;
      axios
        .post("/api/order", this.orderData)
        .then(function (response) {
          console.log(response);
           that.$message({
                       type: 'success',
                       message: '订单创建成功！'
          });
          setTimeout(()=>{that.$router.push('/home/order')},1000);
        })
        .catch(function (error) {
          console.log(error);
          that.$message({
                type: 'error',
                message: error
          });
        });
  }
  },
 
};
</script>
<style lang="postcss" scoped>
.bbb {
  margin-left: 40px;
  margin-top: 80px;
}
.aaa > label {
  display: block;
  text-align: left;
  margin-top: 20px;
}
.el-checkbox {
  display: block;
  text-align: left;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>