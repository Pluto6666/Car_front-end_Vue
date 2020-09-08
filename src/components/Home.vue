<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
       <router-link to="/welcome" style="text-decoration: none;">

       <div class="logo_tile">
        <img src="../assets/adminlogo.jpg" alt="" height="70px">
        <h2>二手车后台管理系统</h2>
      </div>
      </router-link>
      <el-button type="info" >退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--左侧导航菜单-->
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="$route.path"
      >

     

      <!--循环创建一级菜单-->
      <el-submenu
            :index="item.num + ''"
            v-for="(item, i) in navData"
            :key="item.num"
            :class="isCollapse ? 'el_submenu_small': 'el_submenu_large'">
            <template slot="title">
              <!-- 左侧的小图标 -->
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            



            <!-- 循环创建 二级菜单 -->
            <el-menu-item :index="subItem.path + ''" v-for="(subItem,index) in item.evens" :key="index">
              <template slot="title">
              <i :class="subItem.icon"></i>
              <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>



        </el-menu>
      </el-aside>
      

      <!-- 右侧内容主体 -->
      <el-main>
      <!-- 添加路由占位符 -->
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script >
  export default {
    data(){
      return {
        navData:[
          { num: 1 , name: "用户管理", icon: 'el-icon-s-custom' , 
              evens: [  { name:'会员列表', icon:'el-icon-s-custom', path: 'vip' }, 
                        { name: '用户列表', icon:'el-icon-user-solid' ,path: 'users' }
                        ] 
          },
          { num: 2 , name: "汽车信息", icon: 'el-icon-truck' , 
              evens: [  { name:'订单列表', icon:'el-icon-notebook-2', path: 'order' }, 
                        { name: '审核列表', icon:'el-icon-s-check' ,path: 'review' },
                        { name: '汽车类别', icon:'el-icon-menu' ,path: 'category' }
                        ] 
          },
          { num: 3 , name: "社交管理", icon: 'el-icon-chat-dot-round' , 
              evens: [  { name:'新闻资讯列表', icon:'el-icon-news', path: 'news' }, 
                        { name: '讨论区话题列表', icon:'el-icon-view' ,path: 'discussion' }
                        ] 
          },
          { num: 4 , name: "营销管理", icon: 'el-icon-collection-tag' , 
              evens: [  { name:'人气推荐', icon:'el-icon-sunny', path: 'marketing' }
                        ] 
          }
        ],
        isCollapse:false
      }
    },
    methods:{
      toggleCollapse() {
         this.isCollapse = !this.isCollapse
      }
    }
  }


</script>>



<style lang="less" scoped>
.home-container {
  
  height:995px;
}
.el-header {
  background: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  .logo_tile {
    display: flex;
    align-items: center;
    color: white;
    h2 {
      font-weight: 200;
      margin-left: 15px;
    }
  }
  > div {
      display: flex;align-items: center;
      span {margin-left: 15px;}
  }
}
.el-aside {
  background: #333744;
  /*el-menu边框线*/
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background: #eaedf1;
}
.toggle-button {
  background: #4a5064;
  color:#fff;
  font-size: 10px;
  line-height:24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
