<template>
<div class="news">
<header1></header1>
<template>
  <div class="title">
<template>
  <div class="area">
  <span class="logo">二手车.</span>
  <span class="tag">新闻</span>
  </div>
</template>
  </div>
</template>
<img :src="image2" alt="未找到图片" class="side">
<template>
<div class="image">
<img :src="image1" alt="未找到图片" style="width:100%">
</div> 
</template>

<details1></details1>

<bottom1></bottom1>
  
<router-view></router-view>
</div>
</template>

<script>
import Header from "./Header.vue";
import Detail from "./detailNews.vue";
import image from "../img/source.png";
import img from "../img/side.jpg";
import Bottom from "./bottom.vue"
 export default {
    data(){
      return{
         image1:image,
         image2:img,
         activeName:'first'
      }
    },
    name: 'news',
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      header1:Header,
      details1:Detail,
      bottom1:Bottom,
    }
  };
  </script>

<style scoped>
  .background{
    width:100%;  
    height:300px;
    z-index:-1;
    position: absolute;
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
.logo{
   color:#3e4348;
   font-size:30px;
   font-weight: bolder;
   font-style: italic;

}
.tag{
   color:#ed9537;
   font-size:30px;
   font-weight: bolder;
}
.image{
  margin:0 auto;
  width:70%;
  margin-top:10px;
}
.side{
  float:right;
  width:13%;
  position: fixed;
  right: 0;
  margin-top: 10px;
}
</style>

