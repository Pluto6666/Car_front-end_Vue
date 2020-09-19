<template>
<div>
<div class="back">
  <header1></header1>
<template>
  <div class="title">
<template>
  <div class="area">
  <span class="logo">二手车.</span>
  <span class="tag">交易平台</span>
  </div>
</template>
  </div>
</template>
<div class="index">
  <!-- 左侧 -->
  <div class="index-left">
    <!-- 所有产品 -->
    <div class="index-left-allProducts">
      <h3>个人求购</h3>

      <!-- 定义一个组件 -->
      <template v-for="(product,index) in productList">
        <div>
          <ul>
            <li>
              <a @click="look(index)" href="javascript:void(0);">{{product.car_name + " " + product.color}}</a>
              <span v-show="product.hot" class="hotTag">HOT</span>
            </li>
          </ul>
        </div>
      </template>
    </div>

    <!-- 最新消息 -->
    <a @click="jmp" href="javascript:void(0);">
    <div class="index-left-news">
      <h3>最新新闻</h3>
      <ul>
        <li v-for="item in newsList">
          {{item.title}}
        </li>
      </ul>
    </div> 
  </a>
  </div>


  <!-- 右侧 -->
  <div class="index-right">
    <!-- 轮播幻灯片组件 -->
    <slideShow :slides="slideImgs" :interval="time"></slideShow>
    <div class="index-board-list">
      <div class="index-board-item" v-for="(item,index) in carList"
           :class="[{ 'item-even' : index % 2 !== 0}, 'board-item-'+item.current+'-'+(index+1)]">
        <div class="index-board-item-inner">
           <h3 style="white-space:pre">{{item.car_name+" "+item.brand+" "+item.displacement+"L"}}</h3>
           <p style="color:red">{{"￥"+item.price}}</p>
           <!-- 点击立即购买路由 -->
             <button @click="jmps(index)">点击查看</button>
        </div>
      </div><template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="4"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
</div>
</template>
    </div>
  </div>
  </div>
  


<el-dialog
  title="详细信息"
  :visible.sync="dialogVisible"
  width="70%">
<span class="left">求购id:</span>
<span class="font">{{buy_id}}</span>
<span class="right">期望车型:</span>
<span class="font">{{car_name}}</span>
<br>
<span class="left">期望颜色:</span>
<span class="font">{{color}}</span>
<span class="right">期望车况:</span>
<span class="font">{{car_condition}}</span>
<br>
<span class="left">买家id:</span>
<span class="font">{{user_id}}</span>
<span class="right">买家姓名:</span>
<span class="font">{{user_name}}</span>
<br>
<span class="left">卖家电话:</span>
<span class="font">{{phone}}</span>
<span class="right">期望价格:</span>
<span class="font">{{price}}</span>

</el-dialog>
</div>

<template>
  <div style="margin-top:-30px">
    <bottom1></bottom1>
  </div>
</template>
</div>
</template>

<script>
import Header from './Header.vue'
import slideShow from './slideShow.vue'
import Bottom from './bottom.vue'
export default {
  components: {
    slideShow: slideShow,
    header1:Header,
    bottom1:Bottom,
  },
   created:function(){
            var that=this;
            var sends={};
            sends["keyword"]="";
            sends["author_id"]="";
            sends["page_num"]="1";
            sends["page_size"]="10";
             this.$axios({
              method:'post',
              url:'/api/news/get_pageNews',
              data:sends,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.newsList=res.data['data']['newsSet'];
               }
            });
            
            this.$axios({
              method:'post',
              url:'/api/carSearch/getBuy',
              params:{
                "searchkey":"奥迪",
              },
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.productList=res.data['data'];
                   for(let i=0;i<res.data['data'].length;i++){
                       if(res.data['data'][i]['user_id']=="1853806"){
                          that.productList[i]['hot']=true;
                       }
                   }
               }
            });

            this.$axios({
              method:'get',
              url:'/api/carsell/1',
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.carList=res.data['data'];
                  for(let i=0;i<res.data['data'].length;i++)
                   {
                      that.carList[i]['current']=1;
                   }    
                   that.total=res.data['code'];
               }
            });
      },
  methods:{
    jmp:function(){
     this.$router.push('/news');
    },
    jmps:function(index){
      this.$router.push({path:'/product',query:{'car_vin':this.carList[index]["car_vin"]}});
    },
    look: function(index){
            this.buy_id=this.productList[index]['buy_id'];
            this.car_name=this.productList[index]['car_name'];
            this.color=this.productList[index]['color'];
            this.car_condition=this.productList[index]['car_condition'];
            this.price=this.productList[index]['price'];
            this.user_id=this.productList[index]['user_id'];
            this.user_name=this.productList[index]['user_name'];
            this.phone=this.productList[index]['phone'];
            this.dialogVisible=true;
            
        },
     handleCurrentChange(val) {
          var that=this;
             this.$axios({
              method:'get',
              url:'/api/carsell/'+val,
           }).then(function(res){
               if(res.data['code']==0)
               {
                   alert(res.data['message']);
               }
               else{
                   that.carList=res.data['data'];
                   for(let i=0;i<res.data['data'].length;i++)
                   {
                      that.carList[i]['current']=val;
                   }    
               }
            });

      },
  },
  data () {
    return {
     /* 轮播间隔时间 */
      time: 1500,
      currentPage1: 1,
      total:10,
      dialogVisible: false,
      buy_id:'',
      car_name:'',
      color:'',
      car_condition:'',
      price:'',
      user_id:'',
      user_name:'',
      phone:'',
     /* 全部产品数据 */
      productList: [{
        buy_id:'',
        car_name:'',
        color:'',
        car_condition:'',
        price:'',
        user_id:'',
        user_name:'',
        phone:'',
        hot:false,
      }],
      /* 最新消息数据 */
      newsList: [
        {
          title:''
        }
      ],
      /* 主要产品数据 */
      carList: [
        {
          car_vin:'',
          car_name: '',
          brand: '',
          displacement:'',
          price: '',
          current:'',
        },
      ],
      /* 轮播图片资源 */
      slideImgs: [
        {
          src: require('../assets/slideShow-images/pic1.jpg'),
          description: '轻奢格调之选，宝马Z4对比捷豹F-TYPE',
          href: '#/news'
        },
        {
          src: require('../assets/slideShow-images/pic2.jpg'),
          description: '真男人的皮卡梦',
          href: '#/discussion'
        },
        {
          src: require('../assets/slideShow-images/pic3.jpg'),
          description: '全新奥迪 灵动驾驭',
          href: ''
        },
        {
          src: require('../assets/slideShow-images/pic4.jpg'),
          description: '选车，来二手车交易平台就对了',
          href: ''
        }
      ]
    }
  }
};
</script>

<style scoped>
/* 左侧 */
a{
  text-decoration: none;
}
a:link{
   color:grey;
}
a:visited{
  color:grey;
}
.back{
  width:100%;
  height:1100px;
  background-color: #f8f8f8;
}
.index {
  width:95%;
  margin:0 auto;
  padding:20px;
}
.index-left {
  width:25%;
  float:left;
  overflow:hidden;
}
.index-left-allProducts, .index-left-news{
  background:#fff;
}
.index-left-allProducts {
  padding-bottom:10px;
}
.index-left-news {
  margin-top:25px;
  height:500px;
}
.index-left-allProducts .hr {
  border-bottom:1px solid #999;
}
.index-left-allProducts h3, .index-left-news h3{
  height:40px;
  background:#55ca93;
  line-height:40px;
  padding-left:20px;
  color:#fff;
  letter-spacing:5px;
}
.index-left-allProducts p{
  margin:15px 0 8px 20px;
  font-size:20px;
  font-weight:bold;
}
.index-left-allProducts ul {
   margin:0 0 20px 3px;
}
.index-left-news ul {
  margin:15px 10px 0 0;
}
.index-left-allProducts ul li {
  font-size:14px;
  line-height:15px;
  margin-top: 5px;
}
.index-left-news ul li{
  font-size:14px;
  line-height:25px;
  margin-top: 3px;
}
.index-left-allProducts ul li  a, .index-left-news ul li a {
  text-decoration:none;
  color:#666;
}
.index-left-allProducts ul li  a:hover,  .index-left-news ul li a:hover {
  color:#6f0;
}
.hotTag {
  background:#f00;
  color:#fff;
}

/* 右侧 */
.index-right {
   width:75%;
   float:right;
}
.index-board-item {
  width:40%;
  height:110px;
  background:#fff;
  padding:30px;
  margin:20px 10px 10px 20px;
  float:left;
}
.item-even {
  margin-right:0;
}
.index-board-item-inner {
  padding:0 0 0 150px;
  margin-left: 10px;
  margin-top: -10px;
}
.index-board-item-inner h3{
  line-height:10px;
  margin-left: 30px;
}
.index-board-item-inner p {
  line-height:30px;
   margin-left: 30px;
}
.index-board-item-inner button {
  width:90px;
  height:40px;
  background:#55ca93;
  border:3px solid #ddd;
  border-radius:5px;
  font-size:15px;
   margin-left: 30px;
  cursor:pointer;
}
/* 右侧 通过 board-item-id 给每一个index-board-item 添加背景图片 */
.board-item-1-1 .index-board-item-inner{
  background: url(../assets/board-item-images/1.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-1-2 .index-board-item-inner {
  background: url(../assets/board-item-images/2.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-1-3 .index-board-item-inner {
  background: url(../assets/board-item-images/3.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-1-4 .index-board-item-inner {
  background: url(../assets/board-item-images/4.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-2-1 .index-board-item-inner {
  background: url(../assets/board-item-images/5.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-2-2 .index-board-item-inner {
  background: url(../assets/board-item-images/6.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-2-3 .index-board-item-inner {
  background: url(../assets/board-item-images/7.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-2-4 .index-board-item-inner {
  background: url(../assets/board-item-images/8.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-3-1 .index-board-item-inner {
  background: url(../assets/board-item-images/9.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-3-2 .index-board-item-inner {
  background: url(../assets/board-item-images/10.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-3-3 .index-board-item-inner {
  background: url(../assets/board-item-images/3.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}
.board-item-3-4 .index-board-item-inner {
  background: url(../assets/board-item-images/6.jpg) no-repeat;
  width: 0px;
  height: 100px;
  background-size: cover;
}

.title{
  width:auto;
  height:50px;
  background-color: #113a63;
  margin-top: 5px;
}
.area{
  background-color: #f8f8f8;
  width:300px;
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
.left{
  font-size: 18px;
  font-family: "楷体";
  margin-left:50px;
  display: inline-block;
  margin-bottom: 30px;
  width: 100px;
}
.right{
  font-size: 18px;
  font-family: "楷体";
  margin-left:100px;
  width: 100px;
}
.font{
  font-size: 18px;
  font-family: "楷体";
  width:200px;
  display: inline-block;
}
.block{
  text-align: center;
  margin-top: 50px;
  clear: both;
}
</style>
