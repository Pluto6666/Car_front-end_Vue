<template>
<div class="back">
  <header1></header1>
<template>
  <div class="title">
<template>
  <div class="area">
  <span class="logo">二手车.</span>
  <span class="tag">购车</span>
  </div>
</template>
  </div>
</template>

<img :src="productImg" alt="未找到图片" class="car">
<template>
  <div class="details"> 
    <h3 style="margin-left:40px;white-space:pre">{{detail[0]['brand']+"   "+detail[0]['car_name']}}</h3>
    <div class="list">
        <ul style="list-style:none">
          <li class="lefts"><span style="font-size:15px">表显里程</span><h3>{{detail[0]['kilometer']+"公里"}}</h3></li>
          <div class="line"></div>
          <li class="left"><span style="font-size:15px">上牌时间</span><h3>{{detail[0]['date_buyin']}}</h3></li>
          <div class="line"></div>
          <li class="left"><span style="font-size:15px">汽车排量</span><h3>{{detail[0]['displacement']+'L'}}</h3></li>
          <div class="line"></div>
          <li class="left"><span style="font-size:15px">车身颜色</span><h3>{{detail[0]['color']}}</h3></li>
        </ul>
       </div>
       <p class="value">{{'￥'+detail[0]['price']}}</p>
       <button class="btn" @click="send">加入购物车</button>
  </div>
</template>
<h2 style="margin:30px;">车辆档案</h2>
<div class="des">
<ul style="margin-left:100px">
  <li>车架号:<span>{{detail[0]['car_vin']}}</span></li>
  <li>排量:<span>{{detail[0]['displacement']+'L'}}</span></li>
  <li>出厂日期:<span>{{detail[0]['date_produce']}}</span></li>
  <li>卖家id:<span>{{detail[0]['user_id']}}</span></li>
</ul>
<ul>
  <li>品牌:<span>{{detail[0]['brand']}}</span></li>
  <li>颜色:<span>{{detail[0]['color']}}</span></li>
  <li>买入日期:<span>{{detail[0]['date_buyin']}}</span></li>
  <li>卖家电话:<span>{{detail[0]['phone']}}</span></li>
</ul>
<ul>
  <li>车型:<span>{{detail[0]['car_name']}}</span></li>
  <li>事故情况:<span>{{detail[0]['accident']}}</span></li>
  <li>车辆评估:<span>{{detail[0]['car_condition']}}</span></li>
</ul>
</div>
<bottom1></bottom1>
</div>
</template>

<script>
import Header from "./Header.vue";
import car from "../img/background_1.jpg";
import Bottom from "./bottom.vue";
export default {
  data(){
      return{
        img1:car,
        car_name:"1",
        detail:[
        {
          car_vin:'',
          car_name: '',
          brand: '',
          displacement:'',
          price: '',
          date_produce:'',
          date_buyin:'',
          car_condition:'',
          check_data:'',
          accident:'',
          color:'',
          kilometer:'',
          user_id:'',
          phone:'',
        }
       ],
       imgMap:{
        's10089': require('../assets/board-item-images/1.jpg'),
        's10450': require('../assets/board-item-images/2.jpg'),
        's11230': require('../assets/board-item-images/3.jpg'),
        's12934': require('../assets/board-item-images/4.jpg'),
        's19223': require('../assets/board-item-images/5.jpg'),
        's19289': require('../assets/board-item-images/6.jpg'),
        's19989': require('../assets/board-item-images/7.jpg'),
        's10920': require('../assets/board-item-images/8.jpg'),
        's11080': require('../assets/board-item-images/9.jpg'),
        's19263': require('../assets/board-item-images/10.jpg'),
        's12345': require('../assets/board-item-images/3.jpg'),
       },
      }
  },
  created:function(){
    console.log(this.$route.query.car_vin);
    var that=this;
             this.$axios({
              method:'get',
              url:'/api/carsellbyid/'+this.$route.query.car_vin,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.detail=res.data['data'];    
               }
            });
  },
  methods:{
    send:function(){
      var that=this;
      if(!window.sessionStorage.getItem("userid")){
        alert("请先登录");
        this.$router.push('/login');
      }
      else{
            var sends={};
            sends["user_id"]=window.sessionStorage.getItem("userid");
            sends["car_vin"]=this.$route.query.car_vin;
             this.$axios({
              method:'post',
              url:'/api/cart',
              data:sends,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   that.$message({
                       type: 'info',
                       message: res.data['message'],
                   });
               }
               else{
                   that.$message({
                       type: 'success',
                       message: res.data['message'],
                   });  
               }
            });
       }
    }
  },
   components:{
    header1:Header,
    bottom1:Bottom,
   },
  computed: {
    productImg () {
      return this.imgMap[this.$route.query.car_vin];
    }
  }
};
</script>

<style scoped>
.back{
  background-color: #f8f8f8;
  width: 100%;
  height: 900px;
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
.car{

  width:540px;
  height:350px;
  margin: 30px;
}
.details{
  width: 600px;
  float:right;
  margin:30px;
  background-color: white;
  height: 350px;
}
.left{
  float:left;
  margin-left: 30px;
  margin-top: 20px;
  display: inline-block;
}
.lefts{
  float:left;
  margin-top: 20px;
  display: inline-block;
}
.list{
  background-color:#f8f9fc; 
  width:99%; 
  height: 100px;
  color:black;
  margin: 0 auto;
}
.line{
  border:1px solid;
  border-color: #e2e7f4;
  float:left;
  height:60px;
  margin-top: 20px;
  margin-left: 20px;
}
.value{
  font-size: 36px;
  color:#f9712c;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 40px;
}
.btn{
  width:200px;
  height:40px;
  background:#55ca93;
  border:3px solid #ddd;
  border-radius:5px;
  font-size:15px;
  cursor:pointer;
  margin-top: 5px;
  margin-left: 40px;
}
.des{
  border:1px solid #55ca93;
  width: 95%;
  height:200px;
  margin:0 auto;
  background-color: white;
}
.des ul{
  list-style-type: none;
    padding: 5px;
    float:left;
    width:350px;
    margin-top: 20px;
    font-size: 20px;
}
.des li{
  margin-top: 10px;
}
.des span{
  margin-left: 10px;
}
</style>