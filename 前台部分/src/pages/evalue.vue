<template>
  <div class="eval">
  <header1></header1>
  <template>
  <div class="background">
  <img :src="image1" alt="未找到图片" 
      style="width:100%;height:300px;margin-top:10px"></img>
  </div>
  </template>
  <template>
  <div class="info">
  <h3 style="text-align:center; white-space:pre">——   填写您的爱车信息   ——</h3>
  <span class="des">车型</span>
  <el-input
  placeholder="品牌"
  v-model="brand"
  clearable
  style="width:35%; margin-left:80px">
  </el-input>
  <el-input
  placeholder="车型"
  v-model="name"
  clearable
  style="width:35%">
  </el-input>
  <br>
  <span class="des">上牌时间</span>
  <el-date-picker type="date" placeholder="选择日期" v-model="date" style="width:70%; margin-left:40px" value-format="yyyy-MM-dd"></el-date-picker>
  <br>
  <span class="des">行驶里程</span>
  <el-input placeholder="" v-model.number="distance"
  style="width:70%; margin-left:40px"
  clearable>
    <template slot="append">公里</template>
  </el-input>
  <br>
  <span class="des" v-if="seen">估价</span>
  <span class="des" style="color:red">{{value}}</span>
  <br>
  <el-button type="primary" class="button" @click.native='evaluate'>开始估价</el-button>
  <el-button type="primary" class="button1" @click.native='jmp'>我要卖车</el-button>
  </div>
  </template>
  <bottom1></bottom1>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Bottom from "./bottom.vue";
import image from "../img/background.jpg";
 export default {
    data(){
      return{
         image1:image,
         value:'',
         seen:false,
         brand:'',
         name:'',    
         date:'',    
         month:'',  
         distance:null,              
      }
    },
    name: 'home',
    components: {
      header1:Header,
      bottom1:Bottom,
    },
    methods:{
       evaluate(){
           this.seen=true;
           var that=this;
           //console.log(formdata);
           this.$axios({
              method:'get',
              url:'/api/value/'+this.distance,
              headers:{"Content-Type":'application/x-www-form-urlencoded;charset=UTF-8','X-Requested-With': 'XMLHttpRequest'},
           }).then(function(res){
                if(res.data.length==0){
                     that.value= "暂无明确估价";
                }
                else{
                  that.value="￥"+res.data['code'];
                }
     });
       },
       jmp(){
          this.$router.push('/carsell');
       }
    }
  };
</script>

<style scoped>
.eval{
  height:100%;
   width:100%;
}
.background{
    width:100%;  
    height:300px;
    z-index:-1;
    position: absolute;
}
.info{
  width:80%;
  height:480px;
  background-color:#f5f5f5;
  margin:0 auto;
  margin-top:280px;
  padding-top:40px;
}
.des{
  display:inline-block;
  font-size:20px;
  margin-left:100px;
  margin-top:30px;
}
.button{
  margin-top:80px;
  margin-left:300px;
  width:200px;
}
.button1{
  margin-top:80px;
  width:200px;
}
</style>