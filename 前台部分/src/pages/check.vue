<template>
<div class="empty" v-if="seen">
<img :src="image1" alt="未找到图片" class="pic">
<p>您还没有想卖的车</p>
</div>
 <div class="model" v-else>
 <template>
 <div v-for="(item,index) in info">
 <template>
 <div class="message">
 <template>
  <div class="topics">
    <template>
      <div class="logo">
        <span>急求</span>
      </div>
    </template>
    <template>
      <div class="date">
        <span>{{item.buy_id}}</span>
        <span class="line">|</span>
        <a style="color:red" @click="sends(index)" href="javascript:void(0);">不买了</a>
      </div>
    </template>
  </div>
 </template>
 <ul class="details" style="margin-left:50px; width:350px">
 <li>所求车辆:<span class="infos">{{item.brand+" "+item.car_name+" "+item.color+" "+item.displacement+"L"}}</span></li>
 <br>
 <li>事故情况:<span>{{item.accident}}</span></li>
 <li>我的电话:<span>{{item.phone}}</span></li>
 </ul>
 <ul class="details" style="width:350px">
 <br>
 <br>
 <li>期望价格:<span style="color:red">{{"￥"+item.price}}</span></li>
 </ul>
 <ul class="details" style="width:100px">
 <br>
 <br>
 <li>已发布</li>
 </ul>
 </div>
 </template>
 </div>
 </template>
 </div>
</template>

<script>
import image from "../img/cart.png";
export default {
    data(){
      return{
         image1:image,
         user_id:"",
         seen:false,
         info:[{
       buy_id:"",
       car_name:"",
       brand:"",
       price:"",
       color:"",
       date_produce:"",
       displacement:"",
       accident:"",
       phone:"",
      },
      ],           
      }
    },
created:function(){
  this.user_id=window.sessionStorage.getItem("userid");
  var that=this;
  this.$axios({
         method:'get',
         url:'/api/MyInformation/mybuy/'+this.user_id,
        }).then(function(res){
            if(res.data['code']==0){
              that.seen=true;
            }
            else{
              that.info=res.data['data'];
              }
     });
},

methods:{
    sends:function(index){
      this.$confirm('此操作将永久删除该求购信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             var that=this;
             this.$axios({
                 method:'delete',
                 url:'/api/MyInformation/mybuy/'+this.info[index]['buy_id'],
             }).then(function(res){
                if(res.data['code']==0){
                   that.$message({
                      type: 'info',
                      message: res.data['message'],
                   });          
            }
                else{
                   that.$message({
                       type: 'success',
                       message: '删除成功!'
                   });
                   setTimeout(()=>{location.reload()},1000);
            }
            });
          }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
          }); 
    }
},

};
</script>

<style scoped>
a{
  text-decoration: none;
}
.model{
  width: 75%;
  margin: 0 auto;
  margin-left: 300px;
}
.message{
  border:solid #f8f8f8;
  border-width: 2px;
  margin-top:30px;
  height:150px;
}
.topics{
  height:30px;
  width:100%;
  background-color: #f8f8f8;
  padding: 1px;
}
.details{
    list-style-type: none;
    padding: 5px;
    float:left;
}
.infos{
  white-space: pre;
}
.logo{
  width:15px;
  background-color: orange;
  color: white;
  font-size: 11px;
  height: 100%;
  float: left;
  text-align: center;
}
.date{
  margin-left: 55px;
  margin-top: 5px;
  width:300px;
}
.line{
  margin-left: 10px;
  margin-right: 10px;
}
.empty{
  background-color: #f8f8f8;
  height:500px;
  width:75%;
  margin-left: 300px;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  color: #708090;
}
.pic{
  margin-top: 100px;
  width: 150px;
  height: 150px;
}
</style>