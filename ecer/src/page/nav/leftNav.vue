<template>
  <el-aside width="180px">
    <el-menu :default-active="this.$router.path" router>
      <template v-for="all in this.$router.options.routes">
        <template v-for="item in all.children">
          <el-submenu :index="item.path">
            <template slot="title">{{item.name}}</template>
            <!-- 是否为设备管理界面-->
            <template v-if="item.needData">
              <template v-if="data.length" v-for="(campus,i) in data">
                <el-menu-item v-if="!campus.building.length" :index="item.path">{{campus.label}}</el-menu-item>
                <!--校区-->
                <el-submenu v-if="campus.building.length" :index="item.path">
                  <template slot="title" :index="item.path">{{campus.label}}</template>
                  <template v-for="(building,j) in campus.building">
                    <el-menu-item :index="item.path">{{building.label}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </template>
            <template v-if="!item.needData">
              <template v-for="(kids,i) in item.children">
                <el-menu-item :index="kids.path">{{kids.name}}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data () {
      return {
        data: [{
          label: '新芜校区',
          building: [{label: 'A18',}, {label: 'A19'}]
        }, {
          label: '文津校区',
          building: []
        }]
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
      },

      changePath () {
        alert('123')
      }
    }
  }
</script>
<style>
  /*el-container*/
  .el-aside {
    line-height: 100px;
    background: #eee;
    overflow: hidden;
  }

  .el-tree {
    padding-left: 25px;
    font-size: 15px;
    font-weight: 500
  }
</style>
