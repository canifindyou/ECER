import Vue from "vue";
import Router from "vue-router";
import homePage from "@/page/homePage";
import titleNav from "@/page/nav/header";
import leftNav from "@/page/nav/leftNav";
import shouye from "@/page/shouye";
import mySet from "@/page/mySet";
import manageUsers from "@/page/setting/manageUsers";
import deviceList from "@/page/deviceManage/adminHome";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/",
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
        path: "/adminSet",
        name: "设置",
        childNode: true,
        needData: false,
        components: {
          default: mySet,
          top: titleNav,
          aside: leftNav
        },
        children: [{
          path: "/adminSet/manageUsers",
          name: "用户管理",
          component: manageUsers
        }]
      }
    ]
  }]
});
