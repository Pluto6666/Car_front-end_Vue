import Vue from 'vue'
import Router from 'vue-router'

// 导入自己的全局样式
import '../assets/css/global.css'

//导入欢迎组件
const Welcome = () =>
  import ('@/components/Welcome')

//导入后台管理首页
const Home = () =>
  import ('@/components/Home')

//导入会员列表组件
const Vip = () =>
  import ('@/components/user/Vip')

//导入用户列表组件
const Users = () =>
  import ('@/components/user/Users')

//导入新闻列表组件
const News = () =>
  import ('@/components/social/News')

//导入讨论区列表组件
const Discussion = () =>
  import('@/components/social/Discussion')

 //导入订单列表组件
const Order = () =>
  import ('@/components/car/Order')

  //导入汽车类别列表组件
const Category = () =>
  import ('@/components/car/Category')

  //导入审核列表组件
const Review = () =>
  import ('@/components/car/Review')

  //导入人气推荐列表组件
const Marketing = () =>
  import ('@/components/Market/Marketing')

  //导入列表组件
const wz = () =>
import ('@/components/car/wz')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [ // 子路由
      {
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/vip',
        component: Vip
      },{
        path: '/news',
        component: News
      },{
        path:'/discussion',
        component:Discussion
      }, {
        path: '/order',
        component: Order
      }, {
        path: '/review',
        component: Review
      }, {
        path: '/category',
        component: Category
      }, {
        path: '/marketing',
        component: Marketing
      }, {
        path: '/wz',
        component: wz
      }
    ]
  } ]
})