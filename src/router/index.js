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

//导入新增新闻列表组件
const AddNews = () =>
  import ('@/components/social/AddNews')

//导入查看主题帖具体内容组件
const PostDetail = () =>
  import ('@/components/social/PostDetail')

const Login = () =>
  import('@/components/login')


Vue.use(Router)

const router = new Router({
  routes: [
  { path: '/', redirect: '/login' }, // 重定向
  { path: '/login', component: Login },
  {
    path: '/home',
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
      },{
        path:'/news/AddNews',
        component:AddNews
      },{
        path:'/discussion/postDetail/:post_id',
        name:'postDetail',
        component:PostDetail,
        meta:{
          title:'主题帖内容'
        }
      }
    ]
  } ]
})

// 路由导航守卫的语法   router对象.beforeEach((to, from, next) => {})
router.beforeEach((to, from, next) => {
  // to：将要访问的路径
  // from：代表从那个路径跳转而来
  // next是一个函数,表示放行;  next() 放行    next('/login') 强制跳转

  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next();
  // 从sessionStorage中获取到保存的token值
  const cur_userid = window.sessionStorage.getItem('admin');
  // 没有token 强制跳转到登录页
  if (!cur_userid) return next('/login');
  next();
})

export default router