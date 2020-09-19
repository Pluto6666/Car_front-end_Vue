<template>
  <div class="home">
    <header1></header1>
    <template>
  <div class="title">
  <template>
  <div class="area">
  <span class="tag">个人中心</span>
    </div>
    </template>
    </div>
    </template>
    <el-col :span="4" style="margin-left:50px; margin-top:30px;">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['basic']" router>
      <template>
      <div style="text-align:center">
      <img :src="image1" alt="未找到图片" 
      style="width:80px;
      margin-top:20px;
      align:center"></img>
      </div>
      </template>
     <p style="text-align:center;color:white;margin-bottom:30px">{{user_id}}</p>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>我发布的信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/check">求购信息</el-menu-item>
          <el-menu-item index="/home/check-template">出售信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item index="/home/cart">
        <i class="el-icon-menu"></i>
        <span slot="title">我的购物车</span>
      </el-menu-item>
      <el-menu-item index="/home/order">
        <i class="el-icon-setting"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  <router-view></router-view>
  <template>
    <div class="bottoms">
      <bottom1></bottom1>
    </div>
  </template>
</div>
</template>

<script>
import Header from "./Header.vue";
import image from "../img/timg.png";
import Bottom from "./bottom.vue";
 export default {
    data(){
      return{
         image1:image,
         user_id:'',
      }
    },
    name: 'home',
    created:function(){
        this.user_id=window.sessionStorage.getItem("userid");
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      header1:Header,
      bottom1:Bottom,
    }
  };
</script>

<style scoped>
.home{
   width:100%;
}
.title{
  width:auto;
  height:50px;
  background-color: #113a63;
  margin-top: 5px;
}
.area{
  background-color: white;
  width:200px;
  height: 50px;
  margin-left: 50px;
  text-align: center;
}
.tag{
   color:#ed9537;
   font-size:30px;
   font-weight: bolder;
}
.bottoms{
  margin-top:250px;
}
</style>