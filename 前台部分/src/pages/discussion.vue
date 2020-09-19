<template>
<div class="discussion">
<header1></header1>
<template>
  <div class="title">
<template>
  <div class="area">
  <span class="logo">二手车.</span>
  <span class="tag">论坛</span>
  </div>
</template>
  </div>
</template>
<template>
<div class="image">
<img :src="image1" alt="未找到图片" style="width:100%">
<img :src="image2" alt="未找到图片" style="width:100%">

</div> 
</template>

<details1></details1>
<div class="image">
  <img :src="image3" alt="未找到图片" style="width:100%">
</div>

<bottom1></bottom1>
  
<router-view></router-view>
</div>
</template>

<script>
import Header from "./Header.vue";
import Detail from "./disDetail.vue";
import image1 from "../img/brand.jpg";
import image2 from "../img/brand2.jpg";
import image3 from "../img/brand3.jpg";
import Bottom from "./bottom.vue"
 export default {
    data(){
      return{
         image1:image1,
         image2:image2,
         image3:image3,
         activeName:'first'
      }
    },
    name: 'discussion',
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
  margin-top:20px;
  margin-bottom: 30px;
}
.side{
  float:right;
  width:13%;
  position: fixed;
  right: 0;
  margin-top: 10px;
}
</style>