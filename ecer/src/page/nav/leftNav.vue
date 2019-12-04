<template>
  <el-aside width="180px">
    <el-menu :default-active="this.$router.path" router @open="open">
      <!-- <template v-for="all in this.$router.options.routes"> -->
      <template v-for="item in this.$router.options.routes[id].children">
        <el-submenu :index="item.path" v-if="item.childNode">
          <!-- :index="item.path" -->
          <template slot="title">{{ item.name }}</template>
          <template v-if="item.needData" v-for="sideItem in sideData">
            <el-submenu :index="sideItem.index">
              <template slot="title">{{ sideItem.label }}</template>
              <el-menu-item
                v-for="secondItem in sideItem.building"
                :class="{ click: code == secondItem.label }"
                :index="secondItem.index"
                @click="test(secondItem.label, secondItem.index)"
              >{{ secondItem.label }}
              </el-menu-item
              >
              <!-- :index="secondItem.index" -->
            </el-submenu>
          </template>
          <template v-if="item.needList" v-for="sideItem in setList">
            <el-menu-item @click="chooseSettings(sideItem.controlItem)">{{sideItem.name}}</el-menu-item>
            <!-- :index="secondItem.index" -->
          </template>
          <template v-if="!item.needData">
            <template v-for="(kids, i) in item.children">
              <el-menu-item :index="kids.path" @click="code = ''">{{kids.name }}</el-menu-item>
            </template>
          </template>
        </el-submenu>
        <template v-if="!item.childNode">
          <el-menu-item :index="item.path" @click="code = ''">{{item.name }}</el-menu-item>
        </template>
      </template>
      <!-- </template> -->
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        code: 'A18',
        clickIndex: '',
        sideData: [
          {
            label: '新芜校区',
            building: [
              {label: 'A18', index: '1'},
              {label: 'A19', index: '2'}
            ],
            index: 1
          },
          {
            label: '文津校区',
            building: [
              {label: '东二', index: '3'},
              {label: '东三', index: '4'}
            ],
            index: '2'
          }
        ],
        setList: [{
          'name': '用户管理',
          'controlItem': 'manageUsers'
        }, {
          'name': '分组管理',
          'controlItem': 'manageGroups'
        }, {
          'name': '策略管理',
          'controlItem': 'manageStrategies'
        }, {
          'name': '设备品牌管理',
          'controlItem': 'manageBrands'
        }, {
          'name': '控制项设置',
          'controlItem': 'manageOrders'
        }, {
          'name': '全局配置',
          'controlItem': 'globalControl'
        }]
      }
    },
    methods: {
      open (key) {
        // if (key === "3" || key === "4") {
        //   console.log("事件已触发");
        // }
        // let dom = document.getElementsByClassName("el-submenu__title")
        console.log(key)
        // dom[key].style.color = "red"
      },
      test (flag, index) {
        this.code = flag
        console.log(flag, index)
        if (this.roles == 'admin') {
          this.$router.push({
            path: '/admin/adminHome',
            query: {
              code: this.code
            }
          })
        } else {
          this.$router.push({
            path: '/user/userHome',
            query: {
              code: this.code
            }
          })
        }
      },

      chooseSettings (controlItem) {
        this.$emit('chooseModel', controlItem)
      },

      handleSelect (key, keyPath) {
        // console.log(key);
      }
    },
    watch: {},
    mounted () {
      if (this.$route.path.split('/')[1] == 'user') {
        this.id = 1
      } else {
        this.id = 0
      }
      console.log(this.roles)
      console.log(this.$router.options.routes)
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
    font-weight: 500;
  }

  .click {
    color: #409eff;
  }

  .testClass {
    color: red;
  }
</style>
