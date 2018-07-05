// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'

// 导入组件
import Goods from "./components/Goods/Goods"
import Ratings from "./components/Ratings/Ratings"
import Seller from "./components/Seller/Seller"

Vue.config.productionTip = false

// 安装vue-router插件 ∂
Vue.use(VueRouter)
// 在其他组件中使用axios，需要改写原型
Vue.prototype.$axios = Axios;

// 定义路由
const routes = [
  {
    path:'/',
    redirect:'/goods'
  },
  {
    path:'/goods',
    component: Goods
  },
  {
    path:'/ratings',
    component: Ratings
  },
  {
    path:'/seller',
    component: Seller
  }
]

// 创建路由实例
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
