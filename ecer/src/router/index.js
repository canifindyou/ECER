import Vue from "vue";
import Router from "vue-router";
import homePage from "@/page/homePage";
import titleNav from "@/page/nav/header";
import leftNav from "@/page/nav/leftNav";
import shouye from "@/page/shouye";
import waringInfoList from "@/page/waringInfo/waringInfo"
import mySet from "@/page/mySet";
import manageUsers from "@/page/setting/manageUsers";
import deviceList from "@/page/deviceManage/adminHome";
import data from "@/page/dataHistory/data"
import historyData from "@/page/dataHistory/historyData"
import instructHistory from "@/page/dataHistory/instructControllerHistory.vue"
import selfControlStatus from "@/page/dataHistory/selfControlStatus.vue"
import userHome from "@/page/userHome"
import manageGroups from '@/page/setting/manageGroups'
import manageStrategies from '@/page/setting/manageStrategies'
import manageBrands from '@/page/setting/manageBrands'
import userDeviceList from "@/page/user/userHome"
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
    path: "/admin",
    type: "admin",
    name: "admin",
    component: homePage,
    redirect: "/admin/adminHome",
    children: [{
        path: "/admin/adminHome",
        name: "设备管理",
        components: {
          default: deviceList,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: true
      },
      {
        path: "/admin/waringInfo",
        name: "报警通知",
        components: {
          default: waringInfoList,
          top: titleNav,
          aside: leftNav
        },
        childNode: false,
        needData: false,
        children: [{
          path: "/admin/waringInfo",
          name: "通知详情",
          component: manageUsers
        }]

      },
      {
        path: "/admin/data",
        name: "数据统计",
        components: {
          default: data,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: false,
        children: [{
          path: "/admin/dataHistory/dataHistory",
          name: "历史数据",
          component: historyData
        },
        {
          path: "/admin/dataHistory/instructHistory",
          name: "历史指令",
          component: instructHistory
        },
        {
          path: "/admin/dataHistory/selfControlStatus",
          name: "自控状态",
          component: selfControlStatus
        }]

      },
      {
        path: '/admin/adminSet',
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
            path: '/admin/adminSet/manageUsers',
            name: '用户管理',
            component: manageUsers
          },
          {
            path: '/admin/adminSet/manageGroups',
            name: '分组管理',
            component: manageGroups
          },
          {
            path: '/admin/adminSet/manageStrategies',
            name: '策略管理',
            component: manageStrategies
          },
          {
            path: '/admin/adminSet/manageBrands',
            name: '设备品牌管理',
            component: manageBrands
          },
          {
            path: '/admin/adminSet/manageUsers',
            name: '控制项设置',
            component: manageUsers
          },
          {
            path: '/admin/adminSet/manageUsers',
            name: '全局配置',
            component: manageUsers
          },
        ]
      }

    ]
  },
{
    path: "/user",
    type: "user",
    name: "user",
    component: userHome,
    redirect: "/user/userHome",
    children:[
      {
        path: "/user/userHome",
        name: "实时数据",
        components: {
          default: userDeviceList,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: true
      },
      {
        path: "/user/waringInfo",
        name: "报警通知",
        components: {
          default: waringInfoList,
          top: titleNav,
          aside: leftNav
        },
        childNode: false,
        needData: false,
        children: [{
          path: "/user/waringInfo",
          name: "通知详情",
          component: manageUsers
        }]

      },
      {
        path: "/user/data",
        name: "数据统计",
        components: {
          default: data,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: false,
        children: [{
          path: "/user/dataHistory/dataHistory",
          name: "历史数据",
          component: historyData
        },
        {
          path: "/user/dataHistory/instructHistory",
          name: "历史指令",
          component: instructHistory
        },
        {
          path: "/user/dataHistory/selfControlStatus",
          name: "自控状态",
          component: selfControlStatus
        }]

      },
    
       
      

    ]
}]
});
