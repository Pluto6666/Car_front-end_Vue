<template>
<div class="bottom">
<span class="logo">二手车交易平台</span>
<span class="des">二手车交易平台，买卖二手车更放心。全国二手车频道，为您提供海量全国二手车出售、转让的信息。力求资讯真实、车源可靠。在审核全国二手车车辆信息过程中严格、公正、周密，为您在网上买卖二手车时提供贴心服务。</span>
<template>
<div class="pics">
	<img :src="image1" alt="未找到图片" class="pic">
	<p>工商网监</p>
</div>
</template>

</div>
</template>

<script>
import image from "../img/super.png";
export default{
	name:'bottom1',
	data(){
     return{
         image1:image,
      }
	},
};
</script>

<style scoped>
.bottom{
	background-color: #404350;
	width:100%;
	height:100px;
	margin-top: 50px;
}
.logo{
    margin-left: 30px;
	color:white;
	font-size: 25px;
	font-weight: bolder;
	font-family: "楷体";
	line-height: 100px;
	float: left;
}
.des{
    display: inline-block;
	margin-left: 30px;
	margin-top:25px;
	font-size: 13px;
    color:#b8b8b8;
    width:500px;
}
.pics{
	width:50px;
	height: 50px;
	margin-left: 80%;
	margin-top: -60px;
	font-size: 10px;
	text-align: center;
	color: white;
}
.pic{
    width:100%;
    height: 100%;
    margin:0 auto;
}	
</style>