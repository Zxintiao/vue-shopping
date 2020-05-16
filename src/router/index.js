import Vue from 'vue'
import Router from 'vue-router'
let Index = () => import('@/pages/index')
let detail = () => import('@/pages/detail')
let login = () => import('@/pages/login')
let register = () => import('@/pages/register')
let search = () => import('@/pages/search')
let goodList = () => import('@/pages/goodList')
let shopping = () => import('@/pages/shopping')
// let getCar = () => import('@/pages/getCar')
Vue.use(Router)   

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        type_flag: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        type_flag: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    // {
    //   path: '/getCar',
    //   name: 'getCar',
    //   component: getCar
    // },
    {
      path: '/list',
      name: 'list',
      component: goodList
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: shopping
    },
  ]
})
