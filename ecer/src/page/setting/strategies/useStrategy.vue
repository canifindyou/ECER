<template>
  <el-dialog
    title="选择分组"
    :visible.sync="groupModel"
    width="655px"
    @close="closeModel"
    center
    append-to-body>
    <div class="selectBatchBox">
      <div class="commonBox boxLeft">
        <span class="boxHead">分组</span>
        <div class="boxContent">
          <el-tree :props="props"
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
            <el-checkbox style="padding:0 0 0 10px"
                         :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 5px 0;"></div>
            <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange($event)">
              <el-checkbox style="display:block;padding:10px 0 0 0;text-align:center;margin:0"
                           v-for="item in selectData"
                           :label="item"
                           :key="item">{{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </div>
      <div class="commonBox boxRight">
        <span class="boxHead">已选</span>
        <div class="boxContent">
          <span class="emptyText" v-if="selectDeviceList.length === 0">暂无数据</span>
          <ul class="deviceList" v-else>
            <li class="deviceListItem"
                v-for="(item, index) in selectDeviceList"
                :key="index">
              <span class="deviceListItem_text">{{ item.text }}</span>
              <span class="deviceListItem_del ">
                <i class="el-tag__close el-icon-close del-tag" @click="deleteDeviceItem(index, item.id)"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      groupModel: Boolean,
    },
    data () {
      return {
        startTime: '',
        endTime: '',
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
        selectDeviceList: [], //已选设备列表中间储存
        selectDeviceListBox: [], //已选设备最终储存
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
      closeModel () {
        //弹窗关闭事件
        this.$emit('closeModel')
      },

      confirm () {
        //确定按钮事件
      },

      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },

      handleNodeClick (data, node) {
        //点击层级事件
        if (node.level === 4) {
          this.selectData = []
          this.allOptions = []
          this.selectData = ['设备一', '设备二', '设备三']
          this.allOptions = ['设备一', '设备二', '设备三']
        }
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
      },

      loadNode (node, resolve) {
        //点击层级加载子层级的数据
        if (node.level === 0) {
          return resolve([{name: '文津校区'}, {name: '新芜校区'}])
        }
        if (node.level > 4) return resolve([])
        setTimeout(() => {
          //调用加载函数
          var data
          if (node.data.name === '文津校区' || node.data.name == '新芜校区') {
            //点击校区调用（懒加载，全局执行一次）
            data = [{name: '楼栋1'}, {name: '楼栋2'}]
          } else if (node.data.name.substring(0, 2) == '楼栋') {
            //点击楼栋调用
            data = [{name: '楼层1'}, {name: '楼层1'}]
          } else if (node.data.name.substring(0, 2) == '楼层') {
            //点击楼层调用函数
            data = [{name: '教室1', leaf: true}, {name: '教室2', leaf: true}]
          }
          // this.selectItemLoadData(data, node.data.name.substring(0, 2));
          resolve(data)
        }, 500)
      },

      selectItemLoadData (node, date) {
        //展开层级，加载
        //选择层级，展示可选择的数据，填充数据功能
        this.id = node.id
        let data
        this.selectData = []
        this.allOptions = []
        if (node.name === '文津校区' || node.name == '新芜校区') {
          data = [{name: '楼栋1'}, {name: '楼栋2'}]
        } else if (node.name.substring(0, 2) == '楼栋') {
          data = [{name: '楼层1'}, {name: '楼层2'}
          ]
        } else if (node.name.substring(0, 2) == '楼层') {
          data = [{name: '教室1', leaf: true}, {name: '教室2', leaf: true}]
        }
        this.buildSelectDate(data)
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
      },
      buildSelectDate (data) {
        //测试函数，动态改变选择框中的数据
        if (name !== '教室') {
          let len = data.length
          for (let i = 0; i < len; i++) {
            this.selectData.push(data[i].name)
            this.allOptions.push(data[i].name)
          }
        } else {
          return ''
        }
      },
      cleanSelectdate () {
        //弹窗关闭，清空选择框中数据
        this.selectData = []
        this.allOptions = []
      },
      findItem (selectData, updateDate) {
        //判断已经选中的数组中是否包含更新的所有数据，判断全选按钮是否勾选
        let flag = selectData.every(item => {
          return updateDate.indexOf(item) >= 0
        })
        return flag
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
      handleCheckedCitiesChange (value) {
        //单选按钮事件
        let checkedCount = value.length
        this.checkAll = this.findItem(this.selectData, this.checkedItem)
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.selectData.length
        console.log(value)
        //测试数据，仅仅针对楼栋
        this.construtDeviceList(value)
      },
      addItem (centerArr, lastArr) {
        //将加载的数据储存数组中（已选设备数据）
        centerArr.forEach(item => {
          lastArr.unshift(item)
        })
      },
      construtDeviceList (secondArr) {
        //构造已选择设备列表

        if (secondArr.length === 0) {
          this.selectDeviceList = []
        } else {
          let arr = []
          for (let j = 0; j < secondArr.length; j++) {
            for (let i = 0; i < 3; i++) {
              arr.unshift({
                id: `${secondArr[j]}`,
                text: `${secondArr[j]}设备${i}`
              })
            }
            this.selectDeviceList = arr
          }
          // this.addItem(arr, this.selectDeviceList);
        }
      },
      deleteDeviceItem (index, flag) {
        this.selectDeviceList.splice(index, 1) //删除设备节点
        /* 查询设备列表中是否包含该楼栋下的设备 */
        let isCloudeId = this.selectDeviceList.some(item => {
          return item.id == flag
        })
        if (!isCloudeId) {
          this.checkedItem.splice(this.checkedItem.indexOf(flag), 1)
          this.checkAll = this.findItem(this.selectData, this.checkedItem)
        }
      },
      singleCheckBoxChange (el, name) {
        //点击单个复选框触发事件
        if (!el) {
          let index = this.selectDeviceList.indexOf(name)
          this.selectDeviceList.splice(index, 1)
          this.construtDeviceList(this.selectDeviceList)
        }
      }
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

  .selectBatchBox .boxLeft {
  }

  .selectBatchBox .boxCenter {
  }

  .selectBatchBox .boxRight {
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
</style>
