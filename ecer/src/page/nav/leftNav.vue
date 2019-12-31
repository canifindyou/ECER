<template>
  <el-aside width="180px" v-if="sideData.length !== 0">
    <el-menu :default-active="index" router @open="open">
      <!-- <template v-for="all in this.$router.options.routes"> -->
      <template v-for="item in this.$router.options.routes[id].children">
        <el-submenu :index="item.path" v-if="item.childNode">
          <!-- :index="item.path" -->
          <template slot="title">{{ item.name }}</template>
          <template v-if="item.needData" v-for="(sideItem, num) in sideData">
            <el-submenu :index="sideItem.label">
              <template slot="title">{{ sideItem.label }}</template>
              <!--  :class="{ click: code == secondItem.label }" -->
              <el-menu-item
                v-for="(secondItem, num2) in sideItem.building"
                :index="secondItem.myindex.toString()"
                @click="
                  clickNode(secondItem.index, secondItem.floors, sideItem.index,secondItem.myindex)
                "
              >{{ secondItem.label }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-if="!item.needData">
            <template v-for="(kids, i) in item.children">
              <el-menu-item :index="kids.path" @click="clickNode1(kids.path)">{{ kids.name }}</el-menu-item>
            </template>
          </template>
          <template v-if="item.needList" v-for="(sideItem,index) in setList">
            <el-menu-item class="settingName" @click="chooseSettings(index,sideItem.controlItem)">
              {{ sideItem.name }}
            </el-menu-item>
          </template>
        </el-submenu>
        <template v-if="!item.childNode">
          <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
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
        myindex: 0,
        // code: "A18",
        index: localStorage.getItem('index') || 0,
        clickIndex: '',
        schoolIds: [], //校区id数组
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
        listId: 0,
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
          },

        ]
      }
    },
    methods: {
      open (key) {
        console.log(key)
      },
      clickNode (buildId, fnum, schoolId, index) {
        // this.code = buildId;
        localStorage.setItem('index', index.toString())
        console.log(index)
        if (this.$route.path.split('/')[1] == 'admin') {
          this.$router.replace({
            path: '/admin/adminHome',
            query: {
              build: buildId,
              fNum: fnum,
              sch: schoolId
            }
          })
        } else {
          this.$router.replace({
            path: '/user/userHome',
            query: {
              build: buildId,
              fNum: fnum,
              sch: schoolId
            }
          })
        }
      },
      clickNode1 (path) {

        localStorage.setItem('index', path)
      },
      chooseSettings (index, controlItem) {
        console.log(index)
        this.listId = index
        let list = document.getElementsByClassName('settingName')
        console.log(list[index])
        list[index].classList.add('is-active')
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
          this.schoolIds.push(item.id)
        })
        this.getData()
      },
      getData () {//构造侧边栏数据结构
        // for (let i = 0; i < this.schoolIds.length; i++) {
        if (this.count >= this.schoolIds.length) {//递归结束条件
          return
        }
        axios
          .get(this.api + 'buildings', {
            params: {
              zoneId: this.schoolIds[this.count]
            }
          })
          .then(res => {
            console.log(this.count)
            this.inintBuilding(res)
            this.getData()
          })
        // }
      },
      inintBuilding (res) {
        let len = this.sideData.length
        let data = res.data
        let lenB = data.length
        // console.log(this.count)
        if (this.count < this.schoolIds.length) {
          for (let j = 0; j < lenB; j++) {
            let arr = this.sideData[this.count].building.push({
              label: data[j].name,
              index: data[j].id,
              floors: data[j].floors,
              myindex: this.myindex++
            })
          }
        }
        this.count += 1
        //  console.log(this.sideData)
        localStorage.setItem('initFloorNum', this.sideData[0].building[0].floors)
        localStorage.setItem('initBuildId', this.sideData[0].building[0].index)
        localStorage.setItem('initschoolId', this.sideData[0].index)
        // this.index =  this.sideData[0].building[0].index
      },

      changeCss () {
        let list = document.getElementsByClassName('settingName')
        list[this.listId].classList.remove('is-active')
      }
    },
    watch: {},
    mounted () {
      if (this.$route.path.split('/')[1] == 'user') {
        this.id = 3
      } else {
        this.id = 2
      }
      this.count = 0
      this.sideData = []
      this.initLeftNav()
    }
  }
</script>
<style scoped>
  /*el-container*/
  .el-aside {
    position: absolute;
    top: 80px;
    bottom: 0;
    background: #001529;
    overflow: hidden;
    overflow-y: auto;
  }

  .el-menu {
    border: 0;
    background: #001529;
  }

  .el-submenu__title, .el-menu-item {
    color: #BBBBBB;
  }

  .el-submenu.is-active .el-submenu__title {
    color: #fff;
  }

  .el-submenu__title:hover {
    color: #fff;
    background: #001529;
  }

  .el-menu-item.is-active, .el-menu-item.is-active:hover {
    color: #fff;
    background-color: #1890ff;
  }

  .el-menu-item:hover {
    color: #fff;
    background: #001529;
  }

  .settingName.is-active {
    color: #fff;
    background-color: #1890ff;
  }
</style>
