<template>
    <el-aside width="180px">
      <el-menu :default-active="this.$router.path" router>
        <template v-for="(all,index) in this.$router.options.routes">
          <template v-for="(item,index) in all.children">
            <el-menu-item v-if="!item.childNode" :index="item.path">{{item.name}}</el-menu-item>
            <el-submenu v-if="item.childNode" :index="item.path">
              <template slot="title">{{item.name}}</template>
              <template v-for="(kids,i) in item.children">
                <el-menu-item :index="kids.path">{{kids.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!--              <template v-for="(item,index) in this.$router.options.routes">-->
          <!--                <el-menu-item v-if="!item.childNode" :index="item.path">{{item.name}}</el-menu-item>-->
          <!--                <el-submenu v-if="item.childNode" :index="item.path">-->
          <!--                  <template slot="title">{{item.name}}</template>-->
          <!--                  <template v-for="(kids,i) in item.children">-->
          <!--                    <el-menu-item :index="kids.path">{{kids.name}}</el-menu-item>-->
          <!--                  </template>-->
          <!--                </el-submenu>-->
        </template>
      </el-menu>
    </el-aside>
</template>

<style>
  /*el-container*/
  .el-aside {
    line-height: 100px;
    background: #eee;
    overflow: hidden;
  }
</style>
