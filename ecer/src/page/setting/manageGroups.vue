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
          {{item.name}} ({{item.floors}})
          <div v-show="showBuildingOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyBuilding(index,item.name,item.floors)"></i>
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
            <i class="el-icon-edit" @click="modifyClassroom(index,item.id,item.name)"></i>
            <i class="el-icon-delete" @click="delClassroom(item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addClassroom()"></i></div>
      </el-card>
    </div>
    <hr class="boundary">
    <del-group :delGroupType="delGroupType" :delGroup="delGroup" :delId="delId"
               :campusId="campusId" :buildingId="buildingId" @closeModel="closeModel"
               @getCampusesList="getCampusesList" @getBuildingsList="getBuildingsList"
               @getClassroomsList="getClassroomsList"></del-group>
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
        allCampuses: [],
        buildingsData: [],
        classroomsData: [],
        campusId: -1,
        buildingId: -1,
        showCampusOperate: -1,
        showBuildingOperate: -1,
        showClassroomOperate: -1,
        delGroupType: '',
        delId: 0,
        deviceNum: 0
      }
    },
    methods: {
      // 选择校区
      selectCampus (id, name, index) {
        let type = 1
        this.campusId = id// 保存校区id
        this.buildingId = -1// 清除楼栋id
        // 清空楼栋/教室列表
        this.buildingsData = []
        this.classroomsData = []
        this.showBuildingOperate = -1// 清除楼栋显示的修改删除按钮
        // 根据选中的校区id获取楼栋列表
        this.selectList(type, name, index)
        this.getBuildingsList(id)
      },

      // 选择楼栋
      selectBuilding (id, name, index) {
        let type = 2
        this.buildingId = id// 保存楼栋id
        this.classroomsData = []// 清空教室列表
        this.showClassroomOperate = -1// 清除教室显示的修改删除按钮
        this.selectList(type, name, index)
        this.getClassroomsList(id)
      },

      // 选择教室
      selectClassroom (name, index) {
        let type = 3
        this.selectList(type, name, index)
      },

      // 选择列表项
      selectList (type, name, index) {
        let campusesList = document.getElementsByClassName('campusesList')
        let buildingsList = document.getElementsByClassName('buildingsList')
        let classroomsList = document.getElementsByClassName('classroomsList')
        if (type === 1) {// 选择校区
          // 楼栋样式置为初始
          for (let i = 0; i < buildingsList.length; i++) {
            buildingsList[i].style.background = '#FFF'
          }
          this.showCampusOperate = index// 选中的div显示修改删除按钮
          // this.showOperate = this.showOperate === index ? -1 : index
          this.changeCSS(campusesList,name)// 被选中的校区背景CSS更改为灰色，其余为白色
        } else if (type === 2) {// 选择楼栋
          // 教室CSS全部更改为白色
          for (let i = 0; i < classroomsList.length; i++) {
            classroomsList[i].style.background = '#FFF'
          }
          this.showBuildingOperate = index// 选中的div显示修改删除按钮
          // 被选中的楼栋CSS更改为灰色，其余为白色
          for (let i = 0; i < buildingsList.length; i++) {
            let building = buildingsList[i].innerText.split(' ')[0]//取空格(楼层数)前面的数据
            if (name === building) {//被选中
              buildingsList[i].style.background = '#BBB'
            } else {
              buildingsList[i].style.background = '#FFF'
            }
          }
        } else if (type === 3) {// 选择教室
          this.showClassroomOperate = index// 选中的div显示修改删除按钮
          this.changeCSS(classroomsList,name)// 被选中的校区背景CSS更改为灰色，其余为白色
        }
      },

      changeCSS (list,name) {
        for (let i = 0; i < list.length; i++) {
          let dataName = list[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
          if (name === dataName) {//被选中
            list[i].style.background = '#BBB'
          } else {
            list[i].style.background = '#FFF'
          }
        }
      },

      // 增加校区
      addCampus () {
        let self = this
        // 在列表最后一项插入新div
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'campusesList')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[0].appendChild(newDiv)// 将生成的新div插入列表
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          if (newCampus) {
            // 调用添加校区接口
            $.ajax({
              type: 'POST',
              url: 'http://172.16.211.75:8080/schoolZones',
              data: {'name': newCampus},
              success (data) {
                let jsonData = JSON.parse(data)
                if (jsonData.status === 1) {// 删除失败，存在分组
                  self.$message.error('校区名不能重复！')
                } else {// 刷新列表
                  self.getCampusesList()
                  newDiv.remove()// 移除div
                }
              },
              error (data) {
                console.log(data)
              }
            })
          } else {
            newDiv.remove()// 移除div
          }
        })
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
          newDiv.childNodes[0].focus()// input框获取焦点
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            let buildingData = newDiv.childNodes[0].value// 取值
            let newBuilding = buildingData.split('(')[0]// 取出楼栋名
            let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
            if (newBuilding && newFloor) {// 楼栋名&层数均存在
              // 调用添加楼栋接口
              $.ajax({
                type: 'POST',
                url: 'http://172.16.211.75:8080/buildings',
                headers: {
                  'Content-Type': 'application/json',
                },
                dataType: 'json',
                data: JSON.stringify({
                  'zoneId': self.campusId,
                  'name': newBuilding,
                  'floors': newFloor
                }),
                success (data) {// 刷新列表
                  console.log(data)
                  self.getBuildingsList(self.campusId)
                  newDiv.remove()// 移除div
                }
              })
            } else if (!newBuilding && newFloor) {// 楼栋未填写，楼层填写
              alert('请在括号前填写楼栋名')
            } else if (newBuilding && !newFloor) {// 楼栋填写，楼层未填写
              alert('请检查括号内是否正确填写该楼栋的楼层数')
            } else {
              newDiv.remove()// 移除div
            }
          })
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
            let roomFloor = parseInt(newClassroom.replace(/[^0-9]/ig, '').substr(0, 1))// 获取楼层
            if (newClassroom && roomFloor) {
              // 调用添加教室接口
              $.ajax({
                type: 'POST',
                url: 'http://172.16.211.75:8080/rooms',
                headers: {
                  'Content-Type': 'application/json',
                },
                dataType: 'json',
                data: JSON.stringify({
                  'buildingId': self.buildingId,
                  'name': newClassroom,
                  'floor': roomFloor
                }),
                success (data) {// 刷新列表
                  newDiv.remove()// 移除div
                  self.getClassroomsList(self.buildingId)
                }
              })
            } else if (newClassroom && !roomFloor) {
              self.$message({
                message: '请填写正确的教室格式',
                type: 'warning'
              })
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

      // 修改校区
      modifyCampus (index, name) {
        let self = this
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'campusesList')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[0].insertBefore(newDiv, div[0].childNodes[index + 1])// 插入有input框的div
        div[0].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].value = name
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          if (newCampus) {
            // 调用修改校区接口
            $.ajax({
              type: 'PUT',
              url: 'http://172.16.211.75:8080/schoolZones',
              headers: {
                'Content-Type': 'application/json',
              },
              dataType: 'json',
              data: JSON.stringify({
                'id': self.campusId,
                'name': newCampus
              }),
              success (data) {
                div[0].childNodes[index + 2].style.display = 'block'// 显示修改后的div
                self.getCampusesList()
                newDiv.remove()// 移除div
              },
              error () {
                console.log('error')
              }
            })
          } else {
            alert('校区名不能为空')
          }
        })
      },

      // 修改楼栋
      modifyBuilding (index, name, floor) {
        let self = this
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'buildingsList')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[1].insertBefore(newDiv, div[1].childNodes[index + 1])// 插入有input框的div
        div[1].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].value = name + '(' + floor + ')'
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let buildingData = newDiv.childNodes[0].value// 取值
          let newBuilding = buildingData.split('(')[0]// 取出楼栋名
          let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
          if (newBuilding && newFloor) {
            // 调用修改楼栋接口
            $.ajax({
              type: 'PUT',
              url: 'http://172.16.211.75:8080/buildings',
              headers: {
                'Content-Type': 'application/json',
              },
              dataType: 'json',
              data: JSON.stringify({
                'id': self.buildingId,
                'name': newBuilding,
                'floors': newFloor,
                'zoneId': self.campusId
              }),
              success (data) {// 更新楼栋列表
                $.ajax({
                  type: 'GET',
                  url:  this.api + 'buildings',
                  data: {'zoneId': self.campusId},
                  success (data) {
                    div[1].childNodes[index + 2].style.display = 'block'// 显示修改后的div
                    div[1].childNodes[index + 2].style.background = '#BBB'// 显示修改后的div
                    self.buildingsData = data
                    newDiv.remove()// 移除div
                  }
                })
              },
              error () {
                console.log('error')
              }
            })
          } else {
            alert('请按照"楼栋名(层数)"的格式修改')
          }
        })
      },

      // 修改教室
      modifyClassroom (index, id, name) {
        let self = this
        // 将需要修改的div被输入框覆盖
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'classroomsList')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[2].insertBefore(newDiv, div[2].childNodes[index + 1])// 插入有input框的div
        div[2].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].value = name// 确保焦点在文字后方
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newClassroom = newDiv.childNodes[0].value// 取值
          let roomFloor = parseInt(newClassroom.replace(/[^0-9]/ig, '').substr(0, 1))// 取楼层
          if (newClassroom) {
            // 调用修改教室接口
            $.ajax({
              type: 'PUT',
              url: 'http://172.16.211.75:8080/rooms',
              headers: {
                'Content-Type': 'application/json',
              },
              dataType: 'json',
              data: JSON.stringify({// 更新教室列表
                'id': id,
                'name': newClassroom,
                'floors': roomFloor,
                'buildingId': self.buildingId
              }),
              success (data) {
                $.ajax({
                  type: 'GET',
                  url: 'http://172.16.211.75:8080/rooms',
                  data: {'buildingId': self.buildingId},
                  success (data) {
                    div[2].childNodes[index + 2].style.display = 'block'// 显示修改后的div
                    div[2].childNodes[index + 2].style.background = '#BBB'// 显示修改后的div
                    self.classroomsData = data
                    newDiv.remove()// 移除div
                  }
                })
              },
              error () {
                console.log('error')
              }
            })
          } else {
            alert('教室名不能为空')
          }
        })
      },

      // 删除校区
      delCampus (id) {
        this.delGroupType = '校区'
        this.delId = id
        this.delGroup = true
      },

      // 删除楼栋
      delBuilding (id) {
        this.delGroupType = '楼栋'
        this.delId = id
        this.delGroup = true
      },

      // 删除教室
      delClassroom (id) {
        this.delGroupType = '教室'
        this.delId = id
        this.delGroup = true
      },

      // 批量添加分组
      showBatchAddition () {
        this.batchAddition = true
      },

      // 调用校区列表接口
      getCampusesList () {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'schoolZones',
          success (data) {
            self.allCampuses = data
          },
          error () {
            console.log('获取数据失败')
          }
        })
      },

      // 调用楼栋列表接口
      getBuildingsList (id) {
        let self = this
        $.ajax({
          type: 'GET',
          url: this.api + 'buildings',
          data: {'zoneId': id},
          success (data) {
            self.buildingsData = data
            self.$emit('updateNav')
          },
          error () {
            console.log('获取数据失败')
          }
        })
      },

      // 调用教室列表接口
      getClassroomsList (id) {
        let self = this
        // 根据选中的楼栋id获取教室列表
        $.ajax({
          type: 'GET',
          url:  this.api + 'rooms/' + id,
          success (data) {
            console.log(data)
            self.classroomsData = data
          }
        })
      },

      // 关闭子级模态框
      closeModel () {
        this.delGroup = false
        this.showCampusOperate = -1
        this.batchAddition = false
      },

      // 关闭子模态框
      closeAllModel () {
        this.manageGroups = false
        this.$emit('closeModel')

      }
    },
    mounted () {
      this.getCampusesList()
    }
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
