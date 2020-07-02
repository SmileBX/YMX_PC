import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//解决在使用ElementUI中的导航时，默认情况下如果重复点击某选项，会报错。
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/start'
    },
    {
      path: '/start',
      name: '启动页',
      component: () => import(/* webpackChunkName: "about" */ '../views/start.vue')
    },
    {
      path: '/login',
      name: '登录',
      component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    },
    {
      path: '/register',
      name: '注册',
      component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
    },
    {
      path: '/index',
      name: '首页',
      component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
      children:[
        {
          path: '/',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/home/home.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'vip',
          name: 'vip',
          component: () => import('../views/home/vip.vue'),
          meta: {
            title: 'Vip'
          }
        },
        {
          path: 'add',
          name: 'addpro',
          component: () => import('../views/home/addpro.vue'),
          meta: {
            title: '新增产品'
          }
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('../views/home/notice.vue'),
          meta: {
            title: '消息'
          }
        },
        {
          path: 'order',
          name: 'orderlist',
          component: () => import('../views/home/orderlist.vue'),
          meta: {
            title: '订单列表'
          }
        },
        {
          path: 'detail',
          name: 'orderdetail',
          component: () => import('../views/home/orderdetail.vue'),
          meta: {
            title: '订单详情'
          }
        },
        {
          path: 'submit',
          name: 'submitorder',
          component: () => import('../views/pay/submit.vue'),
          meta: {
            title: '提交订单'
          }
        },
        {
          path: 'pay',
          name: 'payment',
          component: () => import('../views/pay/payment.vue'),
          meta: {
            title: '支付订单'
          }
        },
        {
          path: 'over',
          name: 'pausuccess',
          component: () => import('../views/pay/success.vue'),
          meta: {
            title: '支付完成'
          }
        }
      ]
    }
  ]
})
