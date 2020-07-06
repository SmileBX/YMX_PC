// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'swiper/css/swiper.css';
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { Message ,MessageBox } from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/jquery-3.4.1.min.js';
import './assets/js/set_rem.js';
import store from "./store/index";
// import {getToken} from './utils/auth.js'




Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to.meta.requireAuth,"to.meta.requireAuth")
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.token) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/start',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
