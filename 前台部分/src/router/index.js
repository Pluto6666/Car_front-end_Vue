import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import News from '@/pages/News';
import Evalue from '@/pages/evalue';
import Login from '@/pages/Login';
import Sale from '@/pages/releaseSale';
import Purchase from '@/pages/releaseOrder';
import Index from '@/pages/Index';
import Product from '@/pages/product';
import HelloWorld from '@/pages/register';

 import cart from '@/pages/carts';
 import order from '@/pages/order';
// 导入自己的全局样式
import '../assets/css/global.css'
//导入讨论区列表组件
const Discussion = () =>
  import('@/pages/discussion')
//导入查看主题帖具体内容组件
const PostDetail = () =>
  import ('@/pages/PostDetail')

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/check',
       meta:{
        needLogin:true,
      },
      children: [{
        path: 'check-template',
        name: 'check-template',
        component: () => import('@/pages/check-template'),
        meta: {
          title: '查看模板',
          keepalive:true,
        }
      },
      {
        path: 'check',
        name: 'check',
        component: () => import('@/pages/check'),
        meta: {
          title: '查看素材',
          keepalive:true,
        }
    },
    {
         path:'order',
        name:'order',
        component:order,
        meta:{
        needLogin:true,
      },
    },
    {
      path: 'cart',
      name:'cart',
      component:cart,
       meta:{
        needLogin:true,
      },
    }]
},
    {
      path: '/news',
      name: 'News',
      component: News,
       meta:{
        needLogin:false,
      },
    },
    {
      path: '/evalue',
      name: 'evalue',
      component: Evalue,
       meta:{
        needLogin:false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
       meta:{
        needLogin:false,
      },
    },
    {
      path: '/carsell',
      name: 'carsell',
      component: Sale,
       meta:{
        needLogin:true,
      },
    },
    {
      path: '/carbuy',
      name: 'carbuy',
      component: Purchase,
       meta:{
        needLogin:true,
      },
    },
    {
        path: '/',
        name: 'index',
        component: Index,
         meta:{
        needLogin:false,
      },
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
         meta:{
        needLogin:false,
      },
    },
    {
      path: '/register',
      name: 'HelloWorld',
      component: HelloWorld,
       meta:{
        needLogin:false,
      },
    },
    {
      path: '/cart',
      name:'cart',
      component:cart,
       meta:{
        needLogin:true,
      },
    },
    {
      path:'/discussion',
      name:'Discussion',
      component:Discussion,
       meta:{
        needLogin:false,
      },
    },
    {
        path:'/discussion/:post_id',
        name:'postDetail',
        component:PostDetail,
        meta:{
          title:'主题帖内容',
          needLogin:false,
        }
      },
      {
         path:'/order',
        name:'order',
        component:order,
      }
  ],

});
