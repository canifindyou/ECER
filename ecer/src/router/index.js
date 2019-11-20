import Vue from 'vue'
import Router from 'vue-router'
import shouye from '../page/shouye'
import manageUsers from '../page/manageUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shouye,
      childNode:false
    },
    {
      path: '/setting',
      name: '设置',
      childNode:true,
      children: [
        { path: '/setting/manageUsers', component: manageUsers, name: '用户管理', menuShow: true },
      ]
    }
  ]
})
