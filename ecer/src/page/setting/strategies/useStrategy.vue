<template>
  <el-dialog title="选择分组"
             :visible.sync="chooseGroup"
             width="655px"
             @close="closeModel"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             center
             append-to-body>
    <div class="selectBatchBox">
      <div class="commonBox boxLeft">
        <span class="boxHead">分组</span>
        <div class="boxContent">
          <el-tree
            :props="props"
            :load="loadNode"
            @node-expand="selectItemLoadData"
            lazy
            @node-click="handleNodeClick"
            style="padding-left:0"
            :highlight-current="true"
            :accordion="true">
          </el-tree>
        </div>
      </div>
      <div class="commonBox boxCenter">
        <span class="boxHead">选择</span>
        <div class="boxContent">
          <span class="emptyText" v-if="selectData.length === 0">暂无数据</span>
          <template v-else>
            <el-checkbox
              style="padding:0 0 0 10px"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 5px 0;"></div>
            <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange($event)">
              <p>
                <el-checkbox
                  style="display:block;padding:10px 0 0 20px;text-align:left;margin:0"
                  v-for="item in selectData"
                  :label="item.label"
                  :key="item.key">{{ item.name }}
                </el-checkbox>
              </p>
            </el-checkbox-group>
          </template>
        </div>
      </div>
      <div class="commonBox boxRight">
        <span class="boxHead">已选</span>
        <div class="boxContent">
          <span class="emptyText" v-if="selectDeviceList.length === 0"
          >暂无数据</span
          >
          <ul class="deviceList" v-else>
            <li
              class="deviceListItem"
              v-for="(item, index) in selectDeviceList"
              :key="index"
            >
              <span class="deviceListItem_text">{{ item.text }}</span>
              <span class="deviceListItem_del ">
                <i
                  class="el-tag__close el-icon-close del-tag"
                  @click="deleteDeviceItem(index, item.deleteId)"
                ></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="chooseSucc">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    props: {
      groupModel: Boolean,
      useId: Number
    },
    data () {
      return {
        chooseGroup: false,
        flag2: '', //校区id
        deviceIds: [], //已选设备id数组
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        selectData: [], //批量管理弹窗选择框数据
        checkAll: false,
        checkedItem: [], //复选框选择数据
        isIndeterminate: true,
        allOptions: [], //点击全选按钮，要选择的数据，和所有数据相同
        checkAllBtn: false,
        count: 0,
        selectDeviceList: [], //已选 教室列表
        selectDeviceListBox: [], //已选设备最终储存
        control: [],
        controlItem: '',
        selectTime: '',
        switchAll: false,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7 //如果没有后面的-8.64e6就是不可以选择今天的
          }
        }
      }
    },
    methods: {
      //调用接口
      pubilcFnAxios (urlString, params) {
        return new Promise((resolve, reject) => {
          axios
            .get(this.api + urlString, {params: params})
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject('get请求错误')
            })
        })
      },

      // 加载分组数据
      loadNode (node, resolve) {
        console.log('0')
        //点击层级加载子层级的数据
        let schoolId = []
        if (node.level === 0) {
          // 获取校区列表
          this.pubilcFnAxios('schoolZones', {})
            .then(data => {
              let arr = []
              data.forEach(item => {
                arr.push({name: item.name, label: item.id})
              })
              return resolve(arr, arr)
            })
            .catch()
        }
        if (node.level > 4) return resolve([])
        setTimeout(() => {
          if (node.level === 1) {
            //文津校区子菜单加载数据
            this.pubilcFnAxios('buildings', {zoneId: node.data.label})
              .then(data => {
                let arr = []
                data.forEach(item => {
                  arr.push({name: item.name, label: item.id})
                })
                return resolve(arr) //返回数组作为数据填充
              })
              .catch(() => {
                console.log('初始化树形结构请求出错')
              })
          }
          if (node.level === 2) {
            //楼栋子菜单加载数据
            this.flag = node.data.label
            this.pubilcFnAxios(`buildings/${node.data.label}/floors`)
              .then(data => {
                let arr = []
                for (let i = 1; i < data + 1; i++) {
                  //根据返回楼层数，创建楼层
                  arr.push({name: i + '层', label: i, leaf: true})
                }
                return resolve(arr)
              })
              .catch(() => {
                console.log('初始化树形结构请求出错')
              })
          }
          if (node.level === 3) {
            //楼层子菜单加载数据
            this.pubilcFnAxios(`rooms/${this.flag}/${node.data.label}`)
              .then(data => {
                let arr = []
                data.forEach(item => {
                  arr.push({name: item.name, label: item.id, leaf: true})
                })
                return resolve(arr)
              })
              .catch(() => {
                console.log('初始化树形结构请求出错')
              })
          }
        }, 500)
      },

      // 节点被展开时触发
      selectItemLoadData (node, date) {
        // 展开层级，加载
        // 选择层级，展示可选择的数据，填充数据功能
        if (date.level === 1) {
          //文津校区子菜单加载数据
          this.flag2 = date.data.label //校区id
          this.pubilcFnAxios('buildings', {zoneId: date.data.label})
            .then(data => {
              let arr = []
              data.forEach(item => {
                arr.push({
                  name: item.name,
                  label: 'l' + date.data.label + 'l' + item.id
                })
              })
              this.selectData = []
              this.allOptions = []
              this.buildSelectDate(arr)
            })
            .catch(() => {
              console.log('初始化树形结构请求出错')
            })
        }
        if (date.level === 2) {
          //楼栋子菜单加载数据
          this.flag = date.data.label //当前楼栋id
          this.pubilcFnAxios(`buildings/${date.data.label}/floors`)
            .then(data => {
              let arr = []
              for (let i = 1; i < data + 1; i++) {
                //根据返回楼层数，创建楼层
                arr.push({
                  name: i + '层',
                  label: 'f' + this.flag2 + 'f' + date.data.label + 'f' + i,
                  id: i
                })
              }
              this.selectData = []
              this.allOptions = []
              this.buildSelectDate(arr)
            })
            .catch(() => {
              console.log('初始化树形结构请求出错')
            })
        }
      },

      // 节点点击时触发
      handleNodeClick (data, node) {
        //点击层级事件
        if (node.level === 3) {
          this.selectData = []
          this.allOptions = []
          this.pubilcFnAxios(`rooms/${this.flag}/${node.data.label}`)
            .then(data => {
              let arr = []
              data.forEach(item => {
                arr.push({
                  name: item.name,
                  label: 'r' + this.flag2 + 'r' + this.flag + 'r' + node.data.label + 'r' + item.id
                }) //label 包含校区id + 楼栋id + r + 楼层id + 教室id
              })
              this.selectData = []
              this.allOptions = []
              this.buildSelectDate(arr)
            })
            .catch(() => {
              console.log('初始化树形结构请求出错')
            })
        }
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
      },

      // 数据显示在选择框中
      buildSelectDate (data) {
        // 测试函数，动态改变选择框中的数据
        let len = data.length
        for (let i = 0; i < len; i++) {
          this.selectData.push(data[i])
          this.allOptions.push(data[i].label)
        }
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
      },

      //点击单个复选框触发事件
      singleCheckBoxChange (el, name) {
        console.log(el, name)
        if (!el) {
          let index = this.selectDeviceList.indexOf(name)
          this.selectDeviceList.splice(index, 1)
          this.construtDeviceList(this.selectDeviceList)
        }
      },

      //判断已经选中的数组中是否包含更新的所有数据，判断全选按钮是否勾选
      findItem (selectData, updateDate) {
        let flag = selectData.every(item => {
          return updateDate.indexOf(item.label) >= 0
        })
        return flag
      },

      // 选择应用
      chooseSucc () {
        //确定按钮事件
        let idArr = ''
        let self = this
        this.deviceIds = []
        this.selectDeviceList.forEach(item => {
          this.deviceIds.push(item.id)
        })
        console.log(this.deviceIds)
        idArr = this.deviceIds.toString()
        // 调用应用接口
        $.ajax({
          type: 'POST',
          url: this.api + 'strategies/apply?strategyId=' + this.useId + '&deviceIds=' + idArr,
          success (data) {
            if (data === true) {
              self.$message({
                message: '策略应用成功！',
                type: 'success'
              })
            } else {
              self.$message.error('策略应用失败！')
            }
            console.log(data)
            self.closeModel()
          }
        })
      },

      //关闭窗口
      closeModel () {
        console.log('1')
        this.chooseGroup = false
        this.$emit('closeModel')
        //弹窗关闭，清空所有已选择数据
        this.selectDeviceList = [],
          this.checkedItem = [],
          this.deviceIds = []
      },

      handleCheckAllChange (val) {
        //全选按钮事件
        if (val) {
          this.allOptions.forEach(item => {
            let index = this.checkedItem.indexOf(item) //查找选择的数组中是否已存在该数据
            if (index < 0) {
              this.checkedItem.push(item) //防止单选之后操作多选，增加重复数据
            }
          })
        } else {
          this.allOptions.forEach(item => {
            //点击全不选，清除数据
            let index = this.checkedItem.indexOf(item)
            if (index >= 0) {
              this.checkedItem.splice(index, 1)
            }
          })
        }
        this.construtDeviceList(this.checkedItem)
        this.isIndeterminate = false
        console.log(val)
      },

      //单选按钮事件
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectData.length
        //测试数据，仅仅针对楼栋
        this.construtDeviceList(value)
      },

      addItem (centerArr, lastArr) {
        //将加载的数据储存数组中（已选设备数据）
        centerArr.forEach(item => {
          lastArr.unshift(item)
        })
      },

      deleteDeviceItem (index, flag) {
        this.selectDeviceList.splice(index, 1) //删除设备节点
        /* 查询设备列表中是否包含该楼栋下的设备 */
        let isCloudeId = this.selectDeviceList.some(item => {
          return (
            item.deleteId.indexOf(flag) > -1 || flag.indexOf(item.deleteId) > -1
          )
        })
        if (!isCloudeId) {
          this.checkedItem.splice(this.checkedItem.indexOf(flag), 1)
          this.checkAll = this.findItem(this.selectData, this.checkedItem)
        }
      },

      construtDeviceList (secondArr) {
        //构造已选择设备列表
        if (secondArr.length === 0) {
          this.selectDeviceList = []
        } else {
          let arr = []
          for (let j = 0; j < secondArr.length; j++) {
            if (secondArr[j][0] == 'l') {
              let str = secondArr[j].split('l')
              this.pubilcFnAxiosDevice(`devices/${str[1]}/${str[2]}`).then(
                data => {
                  data.forEach(item => {
                    arr.push({
                      id: item.id,
                      text: item.name,
                      roomId: item.room_id,
                      buildId: item.model_id,
                      deleteId: 'l' + this.flag2 + 'l' + item.model_id
                    })
                  })

                  let obj = {}
                  this.selectDeviceList = arr.reduce((cur, next) => {
                    obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
                    return cur
                  }, [])
                  console.log(this.selectDeviceList)
                }
              )
            }
            if (secondArr[j][0] == 'f') {
              let str = secondArr[j].split('f')
              this.pubilcFnAxiosDevice(
                `devices/${str[1]}/${str[2]}/${str[3]}`
              ).then(data => {
                data.forEach(item => {
                  arr.push({
                    id: item.id,
                    text: item.name,
                    roomId: item.room_id,
                    buildId: item.model_id,
                    deleteId:
                      'l' +
                      this.flag2 +
                      'l' +
                      item.model_id +
                      'f' +
                      this.flag2 +
                      'f' +
                      item.model_id +
                      'f' +
                      str[3]
                  })
                })

                let obj = {}
                this.selectDeviceList = arr.reduce((cur, next) => {
                  obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
                  return cur
                }, [])
                console.log(this.selectDeviceList)
              })
            }
            if (secondArr[j][0] == 'r') {
              let str = secondArr[j].split('r')
              this.pubilcFnAxiosDevice(
                `devices/${str[1]}/${str[2]}/${str[3]}`
              ).then(data => {
                data.forEach(item => {
                  arr.push({
                    id: item.id,
                    text: item.name,
                    roomId: item.room_id,
                    buildId: item.model_id,
                    deleteId:
                      'l' +
                      this.flag2 +
                      'l' +
                      item.model_id +
                      'f' +
                      this.flag2 +
                      'f' +
                      item.model_id +
                      'f' +
                      str[3]
                  })
                })

                let obj = {}
                this.selectDeviceList = arr.reduce((cur, next) => {
                  obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
                  return cur
                }, [])
                console.log(this.selectDeviceList)
              })
            }
          }

          // this.addItem(arr, this.selectDeviceList);
        }
      },

      pubilcFnAxiosDevice (urlString, params) {
        //公用数据请求
        //公用axios数据请求
        return new Promise((resolve, reject) => {
          axios
            .get(this.api + urlString, {params: params})
            .then(res => {
              resolve(res.data.list)
            })
            .catch(err => {
              reject('get请求错误')
            })
        })
      },
    },
    watch: {
      groupModel (newVal) {
        console.log(newVal)
        this.chooseGroup = newVal
      },
    }
  }
</script>

<style scoped>
  .selectBatchBox {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }

  .selectBatchBox .commonBox {
    width: 150px;
    height: 300px;
    border: 1px #eee solid;
    border-radius: 5px;
    margin-left: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    /* -webkit-box-shadow:inset006pxrgba(0,0,0,0); */
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0);
  }

  .selectBatchBox .commonBox .boxHead {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 25px;
    border-bottom: 1px solid #000;
    line-height: 25px;
    border-radius: 5px 5px 0 0;
    background: #eee;
  }

  .selectBatchBox .commonBox .boxContent {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 274px;
    position: relative;
  }

  .selectBatchBox .commonBox .boxContent .emptyText {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 50%;
    transform: translateY(10px);
    color: #ddd;
  }

  .selectBatchBox .commonBox .boxContent .deviceList {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .selectBatchBox .commonBox .boxContent .deviceList .deviceListItem:hover {
    background: #e4e7ed;
  }

  .selectBatchBox .commonBox .boxContent .deviceList .deviceListItem {
    background-color: #ecf5ff;
    border-color: rgba(0, 0, 0, 0.04);
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    width: 100%;
    margin: 2px 0 0 0;
  }

  .selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del {
    display: inline-block;
    float: right;
  }

  .selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_text {
    display: inline-block;
    padding: 0 0 0 5px;
  }

  .selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del
  .del-tag {
    cursor: pointer;
  }

  .selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del
  .del-tag:hover {
    color: red;
  }

  .tabBoxContent {
    text-align: center;
    padding: 10px 0 0 0;
    width: 100%;
    height: 157px;
    overflow: hidden;
    /* background: #eee; */
    display: inline-block;
    /* overflow: hidden; */
    position: relative;
  }

  .tabBoxContent.v-leave {
    transform: translateX(-100%);
  }

  .tabBoxContent.v-leave-active {
    transition: all 0.6s;
    position: absolute;
    opacity: -1;
    color: #fff;
  }

  .tabBoxContent.v-leave-to {
    transform: translateX(-100%);
  }

  .tabBoxContent.v-enter {
    transform: translateX(-100%);
  }

  .tabBoxContent.v-enter-active {
    transition: all 0.6s;
  }

  .tabBoxContent.v-enter-to {
    transform: translateX(-100%);
  }

  .tabBoxContent .selectItemBox {
    margin-top: 60px;
    height: 100%;
    width: 100%;
  }

  .tabBoxContent .headText {
  }

  .tabBoxContent .timerItem {
  }

  .tabBoxContent .selectItemTimer {
    margin: 5px 0 5px 0;
  }

  .tabBoxContent .checkTimer {
    margin-top: 15px;
    color: #409eff;
    cursor: pointer;
  }

  .radiotabBox {
    text-align: center;
    border-bottom: #eee 1px solid;
    padding: 0 0 10px 0;
  }

  .el-icon-arrow-right {
    display: none;
  }

  .selectItemBox2 {
    margin: 0 0 0 -68px;
  }
</style>
