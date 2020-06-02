import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
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
        }
      ]
    }
  ]
})
