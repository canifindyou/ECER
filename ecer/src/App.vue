<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header style="height:80px;padding:0">
        <div class="head">
          <div style="margin: 0 50px">
            <img src="../static/pic/school.png" class="head-img" alt="">
            <div class="exit">退出系统</div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu :default-openeds="['1', '2']"
                   :default-active="this.$router.path" router>
            <template v-for="(item,index) in this.$router.options.routes">
              <el-menu-item v-if="!item.childNode" :index="index.toString()">{{item.name}}</el-menu-item>
              <el-submenu v-if="item.childNode" :index="index.toString()">
                <template slot="title">{{item.name}}</template>
                <!--                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>-->
                <!--                <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"-->
                <!--                              :class="$route.path===term.path?'is-active':''">-->
                <!--                  <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>-->
                <!--                </el-menu-item>-->
              </el-submenu>
            </template>

            <!--            <el-submenu index="1">-->
            <!--              <template slot="title">实时数据</template>-->
            <!--              <el-menu-item index="1-1">全部数据</el-menu-item>-->
            <!--              <el-submenu index="1-2">-->
            <!--                <template slot="title">文津校区</template>-->
            <!--                <el-submenu index="1-2-1">-->
            <!--                  <template slot="title">东二</template>-->
            <!--                  <el-menu-item index="1-2-1-1">一层</el-menu-item>-->
            <!--                  <el-menu-item index="1-2-1-2">二层</el-menu-item>-->
            <!--                </el-submenu>-->
            <!--                <el-submenu index="1-2-2">-->
            <!--                  <template slot="title">东一</template>-->
            <!--                  <el-menu-item index="1-2-2-1">一层</el-menu-item>-->
            <!--                  <el-menu-item index="1-2-2-2">二层</el-menu-item>-->
            <!--                </el-submenu>-->
            <!--              </el-submenu>-->
            <!--              <el-submenu index="1-3">-->
            <!--                <template slot="title">新芜校区</template>-->
            <!--                <el-submenu index="1-3-1">-->
            <!--                  <template slot="title">A1</template>-->
            <!--                  <el-menu-item index="1-3-1-1">一层</el-menu-item>-->
            <!--                  <el-menu-item index="1-3-1-2">二层</el-menu-item>-->
            <!--                </el-submenu>-->
            <!--                <el-submenu index="1-3-2">-->
            <!--                  <template slot="title">A2</template>-->
            <!--                  <el-menu-item index="1-3-2-1">一层</el-menu-item>-->
            <!--                  <el-menu-item index="1-3-2-2">二层</el-menu-item>-->
            <!--                </el-submenu>-->
            <!--              </el-submenu>-->
            <!--            </el-submenu>-->
            <!--            <el-submenu index="2">-->
            <!--              <template slot="title">设置</template>-->
            <!--              <el-menu-item index="2-1">分组管理</el-menu-item>-->
            <!--              <el-menu-item index="2-2">设备品牌管理</el-menu-item>-->
            <!--              <el-menu-item index="2-3">用户管理</el-menu-item>-->
            <!--              <el-menu-item index="2-4">策略管理</el-menu-item>-->
            <!--              <el-menu-item index="2-5">控制项设置</el-menu-item>-->
            <!--              <el-menu-item index="2-6">全局配置</el-menu-item>-->
            <!--            </el-submenu>-->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    mounted () {
      console.log(this.$router.options.routes)
      console.log(this.$router)
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    height: 100%;
  }

  /*el-header*/
  .head {
    width: 100%;
    min-width: 1024px;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(to bottom left, #2b85ff, #409EFF)
  }

  .head-img {
    float: left;
    margin-top: 7px;
    height: 65px;
  }

  .exit {
    float: right;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  /*el-container*/
  .el-aside {
    line-height: 100px;
    background: #eee;
    overflow: hidden;
  }
</style>
