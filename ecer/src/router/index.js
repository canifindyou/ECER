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
import manageGroups from '@/page/ setting/manageGroups'
import manageStrategies from '@/page/ setting/manageStrategies'
import manageBrands from '@/page/ setting/manageBrands'
Vue.use(Router);

export default new Router({
  routes: [{
    path: "/admin",
    type: "admin",
    name: "admin",
    component: homePage,
    redirect: "/adminHome",
    children: [{
        path: "/adminHome",
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
        path: "/waringInfo",
        name: "报警通知",
        components: {
          default: waringInfoList,
          top: titleNav,
          aside: leftNav
        },
        childNode: false,
        needData: false,
        children: [{
          path: "/waringInfo",
          name: "通知详情",
          component: manageUsers
        }]
      
      },
      {
        path: "/data",
        name: "数据统计",
        components: {
          default: data,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: false,
        children: [{
          path: "/dataHistory/dataHistory",
          name: "历史数据",
          component: historyData
        },
        {
          path: "/dataHistory/instructHistory",
          name: "历史指令",
          component: instructHistory
        },
        {
          path: "/dataHistory/selfControlStatus",
          name: "自控状态",
          component: selfControlStatus
        }]
      
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
{
    path: "/user",
    type: "user",
    name: "user",
    component: homePage,
    redirect: "/userHome",
    children:[
      {
        path: "/userHome",
        name: "设备管理",
        components: {
          default: userHome,
          top: titleNav,
          aside: leftNav
        },
        childNode: true,
        needData: true
      },

    ]
}]
});
