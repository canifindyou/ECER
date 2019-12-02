import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/page/homePage'
import titleNav from '@/page/nav/header'
import leftNav from '@/page/nav/leftNav'
import shouye from '@/page/shouye'
import mySet from '@/page/mySet'
import manageUsers from '@/page/setting/manageUsers'
import manageGroups from '@/page/setting/manageGroups'
import manageStrategies from '@/page/setting/manageStrategies'
import manageBrands from '@/page/setting/manageBrands'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      type: 'admin',
      name: 'admin',
      component: homePage,
      redirect: '/adminHome',
      children: [
        {
          path: '/adminHome',
          name: '设备管理',
          components: {
            default: shouye,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: true,
        },
        {
          path: '/adminSet',
          name: '设置',
          childNode: true,
          needData: false,
          components: {
            default: mySet,
            top: titleNav,
            aside: leftNav
          },
          children: [
            {
              path: '/adminSet/manageUsers',
              name: '用户管理',
              component: manageUsers
            },
            {
              path: '/adminSet/manageGroups',
              name: '分组管理',
              component: manageGroups
            },
            {
              path: '/adminSet/manageStrategies',
              name: '策略管理',
              component: manageStrategies
            },
            {
              path: '/adminSet/manageBrands',
              name: '设备品牌管理',
              component: manageBrands
            },
            {
              path: '/adminSet/manageUsers',
              name: '控制项设置',
              component: manageUsers
            },
            {
              path: '/adminSet/manageUsers',
              name: '全局配置',
              component: manageUsers
            },
          ]
        }
      ]
    },
  ]
})
