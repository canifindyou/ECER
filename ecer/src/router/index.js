import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/page/homePage'
import titleNav from '@/page/nav/header'
import leftNav from '@/page/nav/leftNav'
import waringInfoList from '@/page/waringInfo/waringInfo'
import mySet from '@/page/mySet'
import managePropertyPersonnel from '../page/setting/managePropertyPersonnel'
import deviceList from '@/page/deviceManage/adminHome'
import data from '@/page/dataHistory/data'
import historyData from '@/page/dataHistory/historyData'
import instructHistory from '@/page/dataHistory/instructControllerHistory.vue'
import selfControlStatus from '@/page/dataHistory/selfControlStatus.vue'
import userHome from '@/page/userHome'
import userDeviceList from '@/page/user/userHome'
import userStrategies from '@/page/setting/userStrategies'
import login from '@/page/login/login'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: login,
    },

    {
      path: '/admin',
      type: 'admin',
      name: 'admin',
      component: homePage,
      redirect: '/admin/adminHome',
      children: [{
        path: '/admin/adminHome',
        name: '设备管理',
        components: {
          default: deviceList,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: true,
      },
        {
          path: '/admin/waringInfo',
          name: '报警通知',
          components: {
            default: waringInfoList,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: false,
          children: [{
            path: '/admin/waringInfo',
            name: '通知详情',
            component: waringInfoList
          }]
        },
        {
          path: '/admin/data',
          name: '历史数据',
      
          components: {
            default: data,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: false,
          children: [{
       
            path: '/admin/dataHistory/dataHistory',
            name: '历史状态',
            component: historyData
          },
            {
          
              path: '/admin/dataHistory/instructHistory',
              name: '历史指令',
              component: instructHistory
            },
            {
        
              path: '/admin/dataHistory/selfControlStatus',
              name: '自控状态',
              component: selfControlStatus
            }]
        },
        {
          path: '/admin/adminSet',
          name: '系统管理',
      
          childNode: true,
          needData: false,
          needList: true,
          components: {
            default: mySet,
            top: titleNav,
            aside: leftNav
          },
          children: [{
         
            path: '/admin/adminSet/managePropertyPersonnel',
            name: '物业人员管理',
            component: managePropertyPersonnel
          }]
        }
      ]
    },
    {
      path: '/user',
      type: 'user',
      name: 'user',
      component: userHome,
      redirect: '/user/userHome',
      children: [
        {
          path: '/user/userHome',
          name: '实时数据',
          components: {
            default: userDeviceList,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: true
        },
        {
          path: '/user/waringInfo',
          name: '报警通知',
          components: {
            default: waringInfoList,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: false,
          children: [{
            path: '/user/waringInfo',
            name: '通知详情',
            component: waringInfoList
          }]
        },
        {
          path: '/user/data',
          name: '历史数据',
          components: {
            default: data,
            top: titleNav,
            aside: leftNav
          },
          childNode: true,
          needData: false,
          children: [{
            path: '/user/dataHistory/dataHistory',
            name: '历史状态',
            component: historyData
          },
            {
              path: '/user/dataHistory/instructHistory',
              name: '历史指令',
              component: instructHistory
            },
            {
              path: '/user/dataHistory/selfControlStatus',
              name: '自控状态',
              component: selfControlStatus
            }]
        },
        {
          path: '/user/manageStrategies',
          name: '策略管理',
          childNode: false,
          needData: false,
          components: {
            default: userStrategies,
            top: titleNav,
            aside: leftNav
          }
        }
      ]
    }]
})
