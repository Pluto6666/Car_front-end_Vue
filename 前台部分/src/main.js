// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageBox } from 'element-ui'
import { Button, Form, FormItem, Input, Message, Container, Header, Aside, Main,
  Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials=true;

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(ElementUI)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.use(VueAxios, axios)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
router.afterEach((to,from,next) => {
      window.scrollTo(0,0);
 })
router.beforeEach((to,from,next) => {
      if(to.meta.needLogin && (!window.sessionStorage.getItem("userid"))){
        next('/login');
      }
      else{
      	next();
      }
 })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
