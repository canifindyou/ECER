<template>
  <el-aside width="180px">
    <el-menu :default-active="index" router @open="open">
      <!-- <template v-for="all in this.$router.options.routes"> -->
      <template v-for="item in this.$router.options.routes[id].children">
        <el-submenu :index="item.path" v-if="item.childNode">
          <!-- :index="item.path" -->
          <template slot="title">{{ item.name }}</template>
          <template v-if="item.needData" v-for="sideItem in sideData">
            <el-submenu :index="sideItem.index.toString()">
              <template slot="title">{{ sideItem.label }}</template>
              <el-menu-item
                v-for="secondItem in sideItem.building"
                :class="{ click: code == secondItem.label }"
                :index="secondItem.index.toString()"
                @click="
                  test(secondItem.index,secondItem.floors,sideItem.index,)
                "
              >{{ secondItem.label }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-if="!item.needData">
            <template v-for="(kids, i) in item.children">
              <el-menu-item :index="kids.path" @click="code = ''">{{
                kids.name
                }}
              </el-menu-item>
            </template>
          </template>
          <template v-if="item.needList" v-for="sideItem in setList">
            <el-menu-item @click="chooseSettings(sideItem.controlItem)">{{sideItem.name}}</el-menu-item>
            <!-- :index="secondItem.index" -->
          </template>
        </el-submenu>
        <template v-if="!item.childNode">
          <el-menu-item :index="item.path" @click="code = ''">{{
            item.name
            }}
          </el-menu-item>
        </template>
      </template>
      <!-- </template> -->
    </el-menu>
  </el-aside>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    data () {
      return {
        id: '',
        code: 'A18',
        index: '1',
        clickIndex: '',
        schoolId: [],//校区id数组
        count: 0,
        sideData: [
          // {
          //   label: 'xiaoqu',
          //   building: [
          //     {label: 'A18', index: '1'},
          //     {label: 'A19', index: '2'}
          //   ],
          //   index: "",
          //   flag:true
          // },
        ],
        setList: [
          {
            name: '教职工管理',
            controlItem: 'manageTeachingStaffs'
          },
          {
            name: '分组管理',
            controlItem: 'manageGroups'
          },
          {
            name: '策略管理',
            controlItem: 'manageStrategies'
          },
          {
            name: '设备品牌管理',
            controlItem: 'manageBrands'
          },
          {
            name: '控制项设置',
            controlItem: 'manageOrders'
          },
          {
            name: '全局配置',
            controlItem: 'globalControl'
          }
        ]
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
      test (buildId, fnum, schoolId) {
        this.code = buildId
        console.log(buildId, fnum)
        if (this.$route.path.split('/')[1] == 'admin') {
          this.$router.replace({
            path: '/admin/adminHome',
            query: {
              build: this.code,
              fNum: fnum,
              sch: schoolId
            }
          })
        } else {
          this.$router.replace({
            path: '/user/userHome',
            query: {
              build: this.code,
              fNum: fnum,
              sch: schoolId
            }
          })
        }
      },

      chooseSettings (controlItem) {
        this.$emit('chooseModel', controlItem)
      },

      handleSelect (key, keyPath) {
        // console.log(key);
      },
      initLeftNav () {
        //获取校区侧边栏数据
        axios.get(this.api + 'schoolZones').then(this.initLeftNavCallBack)
      },
      initLeftNavCallBack (res) {
        res.data.forEach(item => {
          this.sideData.push({label: item.name, index: item.id, building: []})
          this.schoolId.push(item.id)
          axios.get(this.api + 'buildings', {
            params: {
              zoneId: item.id
            }
          }).then(this.inintBuilding)
        })

      },
      inintBuilding (res) {
        console.log(this.sideData)
        let len = this.sideData.length
        let data = res.data
        let lenB = data.length
        for (let j = 0; j < lenB; j++) {
          this.sideData[this.count].building.push({'label': data[j].name, 'index': data[j].id, floors: data[j].floors})
        }

        this.count += 1
        console.log(this.sideData)
        localStorage.setItem('initFloorNum', this.sideData[0].building[0].floors)
        localStorage.setItem('initBuildId', this.sideData[0].building[0].index)
        localStorage.setItem('initschoolId', this.sideData[0].index)
      }
    },
    watch: {},
    mounted () {
      if (this.$route.path.split('/')[1] == 'user') {
        this.id = 3
      } else {
        this.id = 2
      }
      this.initLeftNav()
    }
  }
</script>
<style>
  /*el-container*/
  .el-aside {
    position: absolute;
    top: 80px;
    bottom: 0;
    background: #001529;
    overflow: hidden;
    overflow-y: auto;
  }

  .el-menu{
    background: #001529;
  }

  .el-submenu__title{
    color: #fff;
  }

  .el-submenu__title:hover{
    color: #fff;
    background: #001529;
  }

  .el-menu-item{
    color: hsla(0, 0%, 100%, .65);
  }

  .el-menu-item.is-active{
    color: #fff;
    background-color: #1890ff;
  }

  .el-menu-item:hover{
    color: #fff;
    background: #001529;
  }
</style>
