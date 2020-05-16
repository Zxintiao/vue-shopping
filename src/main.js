// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import scroll from './plugin/scroll'
import loading from  './plugin/loading'
// 导入重置样式
import '@/assets/css/comment.css'
import $axios from './plugin/axios'
import vuex from "vuex"
import store from "./store/store"

// 注册自定义指令 v-lazy 实现蓝懒加载 
import lazyload from "./plugin/lazyload";
Vue.directive("lazy",lazyload);


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(scroll)
Vue.use(loading)
Vue.use(vuex)


// 添加一个自定义方法 create 返回 axios 对象
Vue.prototype.$axios = $axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:new vuex.Store(store),
  components: { App },
  template: '<App/>',
  // 需求；记载任一的路由组件；都进行 loading 处理
  created(){

  },

})
