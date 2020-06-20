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




Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
