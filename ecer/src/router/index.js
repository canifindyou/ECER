import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/page/homePage'
import titleNav from '@/page/nav/header'
import leftNav from '@/page/nav/leftNav'
import shouye from '@/page/shouye'
import mySet from '@/page/mySet'
import manageUsers from '@/page/setting/manageUsers'

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
          childNode: true
        },
        {
          path: '/adminSet',
          name: '设置',
          childNode: true,
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
          ]
        }
      ]
    },
  ]
})
