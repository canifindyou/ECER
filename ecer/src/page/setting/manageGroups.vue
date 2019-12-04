<template>
  <el-dialog title="分组管理"
             top="110px"
             :visible.sync="manageGroups"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <div class="body">
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span>校区</span>
        </div>
        <div v-for="(item,index) in allCampuses" class="campusesList" @click="selectCampus(item.id,item.name,index)">
          {{item.name}}
          <div v-show="showCampusOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyCampus(index,item.name)"></i>
            <i class="el-icon-delete" @click="delCampus(item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addCampus()"></i></div>
      </el-card>
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span>楼栋(层数)</span>
        </div>
        <div v-for="(item,index) in buildingsData" class="buildingsList"
             @click="selectBuilding(item.id,item.name,index)">
          {{item.name}} ({{item.floor}})
          <div v-show="showBuildingOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyBuilding(index,item.name,item.floor)"></i>
            <i class="el-icon-delete" @click="delBuilding(item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addBuilding()"></i></div>
      </el-card>
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span id="className">教室</span>
        </div>
        <div v-for="(item,index) in classroomsData" class="classroomsList"
             @click="selectClassroom(item.name,index)">
          {{item.name}}
          <div v-show="showClassroomOperate===index" class="operation">
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete" @click="delClassroom(item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addClassroom()"></i></div>
      </el-card>
    </div>
    <hr class="boundary">
    <del-group :delGroup="delGroup" :delGroupType="delGroupType" :deviceNum="deviceNum"
               @closeModel="closeModel"></del-group>
    <batch-addition :batchAddition="batchAddition" @closeModel="closeModel"></batch-addition>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" @click="showBatchAddition">批量添加</el-button>
      <el-button @click="closeAllModel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import delGroup from './groups/delGroup'
  import batchAddition from './groups/batchAddition'

  export default {
    components: {
      delGroup,
      batchAddition
    },
    data () {
      return {
        manageGroups: true,
        delGroup: false,
        batchAddition: false,
        allCampuses: [{'id': 1, 'name': '文津校区'}, {'id': 2, 'name': '新芜校区'}],
        campusesData: [],
        allBuildings: [
          {'id': 1, 'name': '东一', 'floor': 5, 'campusId': 1}, {'id': 2, 'name': '东二', 'floor': 5, 'campusId': 1},
          {'id': 3, 'name': 'A1', 'floor': 5, 'campusId': 2}, {'id': 4, 'name': 'A2', 'floor': 5, 'campusId': 2}],
        buildingsData: [],
        allClassrooms: [
          {'id': 1, 'name': '109', 'campusId': 1, 'buildingId': 1},
          {'id': 2, 'name': '110', 'campusId': 1, 'buildingId': 1},
          {'id': 3, 'name': '101', 'campusId': 1, 'buildingId': 2},
          {'id': 4, 'name': '102', 'campusId': 1, 'buildingId': 2},
          {'id': 5, 'name': '109', 'campusId': 2, 'buildingId': 3},
          {'id': 6, 'name': '110', 'campusId': 2, 'buildingId': 3},
          {'id': 7, 'name': '201', 'campusId': 2, 'buildingId': 3},
          {'id': 8, 'name': '202', 'campusId': 2, 'buildingId': 3}],
        classroomsData: [],
        campusId: -1,
        buildingId: -1,
        showCampusOperate: -1,
        showBuildingOperate: -1,
        showClassroomOperate: -1,
        delGroupType: '',
        deviceNum: 0
      }
    },
    methods: {
      // 增加校区
      addCampus () {
        let self = this
        // 在列表最后一项插入新div
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'campusesList')// 设置class属性
        newDiv.innerHTML = '<input type="text" value="校区" style="text-align: center"/>'// 添加input框
        div[0].appendChild(newDiv)// 将生成的新div插入列表
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          let campusData = newCampus.split('校区')[0]// 取出校区前的文字判断是否填写校区名
          if (campusData) {
            // 调用添加校区接口
            let newData = {'id': 3, 'name': newCampus}// 获取返回值
            self.allCampuses.push(newData)//插入展示列表
            newDiv.remove()// 移除div
          } else {
            newDiv.remove()// 移除div
          }
        })
        let inputSelect = newDiv.childNodes[0]
        inputSelect.focus()// input框获取焦点
      },

      // 增加楼栋
      addBuilding () {
        if (this.campusId === -1) {// 未选择校区的情况下
          alert('请选择校区后再添加新楼栋')
        } else {
          let self = this
          // 在列表最后一项插入新div
          let div = document.getElementsByClassName('el-card__body')
          let newDiv = document.createElement('div')
          newDiv.setAttribute('class', 'buildingsList')
          newDiv.innerHTML = '<input type="text" value="( )" style="text-align: center"/>'
          div[1].appendChild(newDiv)//插入创建的div
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            let buildingData = newDiv.childNodes[0].value// 取值
            let newBuilding = buildingData.split('(')[0]// 取出楼栋名
            let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
            if (newBuilding && newFloor) {// 楼栋名&层数均存在
              // 调用添加楼栋接口
              let newData = {'id': 5, 'name': newBuilding, 'floor': newFloor, 'campusId': self.campusId}// 获取返回值
              self.buildingsData.push(newData)// 插入展示列表
              newDiv.remove()// 移除div
            } else if (!newBuilding && newFloor) {// 楼栋未填写，楼层填写
              alert('请在括号前填写楼栋名')
            } else if (newBuilding && !newFloor) {// 楼栋填写，楼层未填写
              alert('请检查括号内是否正确填写该楼栋的楼层数')
            } else {
              newDiv.remove()// 移除div
            }
          })
          let inputSelect = newDiv.childNodes[0]
          inputSelect.focus()// input框获取焦点
        }
      },

      // 增加教室
      addClassroom () {
        if (this.campusId !== -1 && this.buildingId !== -1) {// 选中校区及楼层
          let self = this
          // 在列表最后一项插入新div
          let div = document.getElementsByClassName('el-card__body')
          let newDiv = document.createElement('div')
          newDiv.setAttribute('class', 'classroomsList')// 设置class属性
          newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
          div[2].appendChild(newDiv)//插入创建的div
          newDiv.childNodes[0].addEventListener('blur', function () {//  input框失焦后的操作
            let newClassroom = newDiv.childNodes[0].value// 取值
            if (newClassroom) {
              // 调用添加教室接口
              let newData = {'id': 9, 'name': newClassroom, 'campusId': self.campusId, 'buildingId': self.buildingId}// 获取返回值
              self.classroomsData.push(newData)//插入展示列表
              newDiv.remove()// 移除div
            } else {
              newDiv.remove()// 移除div
            }
          })
          let inputSelect = newDiv.childNodes[0]
          inputSelect.focus()// input框获取焦点
        } else if (this.campusId === -1) {
          alert('请选择校区及楼栋后再添加新教室')
        } else if (this.buildingId === -1) {
          alert('请选择楼栋后再添加新教室')
        }
      },

      // 选择校区
      selectCampus (id, name, index) {
        this.campusId = id// 保存校区id
        this.buildingId = -1// 清除楼栋id
        // 清空楼栋/教室列表
        this.buildingsData = []
        this.classroomsData = []
        this.showBuildingOperate = -1// 清除楼栋显示的修改删除按钮
        // 楼栋CSS全部更改为白色
        let buildingsList = document.getElementsByClassName('buildingsList')
        for (let i = 0; i < buildingsList.length; i++) {
          buildingsList[i].style.background = '#FFF'
        }
        this.showCampusOperate = index// 选中的div显示修改删除按钮
        // this.showOperate = this.showOperate === index ? -1 : index
        // 被选中的校区CSS更改为灰色，其余为白色
        let campusesList = document.getElementsByClassName('campusesList')
        for (let i = 0; i < campusesList.length; i++) {
          let campus = campusesList[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
          if (name === campus) {//被选中
            campusesList[i].style.background = '#BBB'
          } else {
            campusesList[i].style.background = '#FFF'
          }
        }
        // 根据选中的校区id获取楼栋列表
        for (let i = 0; i < this.allBuildings.length; i++) {
          if (this.allBuildings[i].campusId === id) {
            this.buildingsData.push(this.allBuildings[i])
          }
        }
      },

      // 选择楼栋
      selectBuilding (id, name, index) {
        this.buildingId = id// 保存楼栋id
        this.classroomsData = []// 清空教室列表
        this.showClassroomOperate = -1// 清除教室显示的修改删除按钮
        // 教室CSS全部更改为白色
        let div = document.getElementsByClassName('classroomsList')
        for (let i = 0; i < div.length; i++) {
          div[i].style.background = '#FFF'
        }
        this.showBuildingOperate = index// 选中的div显示修改删除按钮
        // 被选中的楼栋CSS更改为灰色，其余为白色
        let buildingsList = document.getElementsByClassName('buildingsList')
        for (let i = 0; i < buildingsList.length; i++) {
          let building = buildingsList[i].innerText.split(' ')[0]//取空格(楼层数)前面的数据
          if (name === building) {//被选中
            buildingsList[i].style.background = '#BBB'
          } else {
            buildingsList[i].style.background = '#FFF'
          }
        }
        // 根据选中的校区&&楼栋id获取教室列表
        for (let i = 0; i < this.allClassrooms.length; i++) {
          if (this.allClassrooms[i].buildingId === id && this.allClassrooms[i].campusId === this.campusId) {
            this.classroomsData.push(this.allClassrooms[i])
          }
        }
      },

      // 选择教室
      selectClassroom (name, index) {
        this.showClassroomOperate = index// 选中的div显示修改删除按钮
        // 被选中的教室CSS更改为灰色，其余为白色
        let div = document.getElementsByClassName('classroomsList')
        for (let i = 0; i < div.length; i++) {
          let classroom = div[i].innerText.replace(/\s/g, '')// 清除多余空格
          if (name === classroom) {// 被选中
            div[i].style.background = '#BBB'
          } else {
            div[i].style.background = '#FFF'
          }
        }
      },

      // 修改校区
      modifyCampus (index, name) {
        let self = this
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'campusesList')// 设置class属性
        newDiv.innerHTML = '<input type="text" value=' + name + ' style="text-align: center"/>'// 添加input框
        div[0].insertBefore(newDiv, div[0].childNodes[index + 1])// 插入有input框的div
        div[0].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          let campusData = newCampus.split('校区')[0]// 取出校区前的文字判断是否填写校区名
          if (campusData) {
            // 调用修改校区接口
            self.allCampuses[index].name = newCampus// 取得返回值并修改数组
            div[0].childNodes[index + 2].style.display = 'block'// 显示修改后的div
            newDiv.remove()// 移除div
          } else {
            console.log('请按照XX校区的格式修改')
            newDiv.childNodes[0].focus()
          }
        })
        let inputSelect = newDiv.childNodes[0]
        inputSelect.focus()// input框获取焦点
      },

      // 修改楼栋
      modifyBuilding (index, name, floor) {
        let self = this
        console.log(name)
        let buildingName = name + '(' + floor + ')'
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'campusesList')// 设置class属性
        newDiv.innerHTML = '<input type="text" value=' + buildingName + ' style="text-align: center"/>'// 添加input框
        div[1].insertBefore(newDiv, div[1].childNodes[index + 1])// 插入有input框的div
        div[1].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let buildingData = newDiv.childNodes[0].value// 取值
          let newBuilding = buildingData.split('(')[0]// 取出楼栋名
          let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
          if (newBuilding && newFloor) {
            // 调用修改校区接口
            self.buildingsData[index].name = newBuilding// 取得返回值并修改数组
            self.buildingsData[index].floor = newFloor// 取得返回值并修改数组
            div[1].childNodes[index + 2].style.display = 'block'// 显示修改后的div
            div[1].childNodes[index + 2].style.background = '#BBB'// 显示修改后的div
            newDiv.remove()// 移除div
          } else {
            console.log('请按照"楼栋名(层数)"的格式修改')
            newDiv.childNodes[0].focus()
          }
        })
        let inputSelect = newDiv.childNodes[0]
        inputSelect.focus()// input框获取焦点
      },

      // 删除校区
      delCampus (id) {
        this.delGroupType = '校区'
        // 根据id查找设备
        // 返回deviceNum
        this.deviceNum = 3
        this.delGroup = true
      },

      // 删除楼栋
      delBuilding (id) {
        this.delGroupType = '楼栋'
        // 根据id查找设备
        // 返回deviceNum
        this.deviceNum = 1
        this.delGroup = true
      },

      // 删除教室
      delClassroom (id) {
        this.delGroupType = '教室'
        // 根据id查找设备
        // 返回deviceNum
        this.deviceNum = 0
        this.delGroup = true
      },

      showBatchAddition () {
        this.batchAddition = true
      },

      // 关闭子级模态框
      closeModel () {
        this.delGroup = false
        this.batchAddition = false
      },

      closeAllModel () {
        this.manageGroups = false
      }
    },
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';
  @import '../../assets/manageGroups.css';
</style>

<style>
  .campusesList, .buildingsList, .classroomsList {
    padding: 2px 5px 5px 5px;
    border-bottom: 1px solid #BBBBBB;
  }

  input {
    width: 50%;
    padding: 0 0 3px 3px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #BBB;
    outline: none;
  }
</style>
