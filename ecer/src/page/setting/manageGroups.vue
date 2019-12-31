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
        <div v-for="(item,index) in allCampuses" class="campusesList"
             @click="selectCampus(campusType,item.id,item.name,index)">
          {{item.name}}
          <div v-show="showCampusOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyNewDiv(campusType,index,item.name)"></i>
            <i class="el-icon-delete" @click="deleteGroup(campusType,item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addNewDiv(campusType)"></i></div>
        <div v-show="haveCampuses" class="noData">暂无数据</div>
      </el-card>
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span>楼栋(层数)</span>
        </div>
        <div v-for="(item,index) in buildingsData" class="buildingsList"
             @click="selectBuilding(buildingType,item.id,item.name,index)">
          {{item.name}} ({{item.floors}})
          <div v-show="showBuildingOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyNewDiv(buildingType,index,item.name,item.floors)"></i>
            <i class="el-icon-delete" @click="deleteGroup(buildingType,item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addNewDiv(buildingType)"></i></div>
        <div v-show="haveBuildings" class="noData">暂无数据</div>
      </el-card>
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span id="className">教室</span>
        </div>
        <div v-for="(item,index) in classroomsData" class="classroomsList"
             @click="selectClassroom(classroomType,item.id,item.name,index)">
          {{item.name}}
          <div v-show="showClassroomOperate===index" class="operation">
            <i class="el-icon-edit" @click="modifyNewDiv(classroomType,index,item.name)"></i>
            <i class="el-icon-delete" @click="deleteGroup(classroomType,item.id)"></i>
          </div>
        </div>
        <div class="cardFooter"><i class="el-icon-circle-plus" @click="addNewDiv(classroomType)"></i></div>
        <div v-show="haveClassrooms" class="noData">暂无数据</div>
      </el-card>
    </div>
    <hr class="boundary">
    <del-group :delGroupType="delGroupType" :delGroup="delGroup" :delId="delId"
               :campusId="campusId" :buildingId="buildingId" @closeModel="closeModel"
               @getCampusesList="getCampusesList" @getBuildingsList="getBuildingsList"
               @getClassroomsList="getClassroomsList" @clearCSS="clearCSS"></del-group>
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
        clickList: true,//分组是否可点
        haveCampuses: true,
        campusId: -1,
        campusType: 0,
        allCampuses: [],
        showCampusOperate: -1,
        haveBuildings: true,
        buildingId: -1,
        buildingType: 1,
        modifyBtn: true,
        buildingsData: [],
        showBuildingOperate: -1,
        haveClassrooms: true,
        classroomId: -1,
        classroomType: 2,
        classroomsData: [],
        showClassroomOperate: -1,
        delGroup: false,
        delId: 0,
        delGroupType: '',
        batchAddition: false,
      }
    },
    methods: {
      // 选择校区
      selectCampus (type, id, name, index) {
        // 判断是否可点
        if (this.clickList === true) {
          this.campusId = id// 保存校区id
          // 清除视图数据
          this.buildingId = -1// 清除楼栋id
          this.buildingsData = []
          this.classroomsData = []
          this.showBuildingOperate = -1// 清除楼栋显示的修改删除按钮
          this.haveClassrooms = true// 选择校区时，教室始终无数据
          // 更改试图样式
          this.selectList(type, name, index)
          // 获取列表
          this.getBuildingsList(id)
        } else {
          return false
        }
      },

      // 选择楼栋
      selectBuilding (type, id, name, index) {
        if (this.clickList === true) {
          this.buildingId = id// 保存楼栋id
          this.classroomsData = []
          this.showClassroomOperate = -1
          this.selectList(type, name, index)
          this.getClassroomsList(id)
        } else {
          return false
        }
      },

      // 选择教室
      selectClassroom (type, id, name, index) {
        if (this.clickList === true) {
          this.classroomId = id// 保存教室id
          this.selectList(type, name, index)
        } else {
          return false
        }
      },

      // 选择列表项
      selectList (type, name, index) {
        let campusesList = document.getElementsByClassName('campusesList')
        let buildingsList = document.getElementsByClassName('buildingsList')
        let classroomsList = document.getElementsByClassName('classroomsList')
        if (type === 0) {// 选择校区
          // 修改背景色
          this.changeCSS(campusesList, name)
          // 选中的div显示修改删除按钮
          this.showCampusOperate = index
          // this.showOperate = this.showOperate === index ? -1 : index
        } else if (type === 1) {// 选择楼栋
          this.changeCSS(buildingsList, name)
          this.showBuildingOperate = index
        } else if (type === 2) {// 选择教室
          this.changeCSS(classroomsList, name)
          this.showClassroomOperate = index
        }
      },

      // 被选中更改样式
      changeCSS (list, name) {
        for (let i = 0; i < list.length; i++) {
          //取空格前的数据--针对楼栋
          let dataName = list[i].innerText.split(' ')[0]
          // 清除按钮导致的回车
          dataName = dataName.replace(/\s/g, '')
          if (name === dataName) {//被选中
            list[i].style.background = '#BBB'
          } else {
            list[i].style.background = '#FFF'
          }
        }
      },

      // 添加操作
      addNewDiv (type) {
        if (this.modifyBtn === false) {
          return false
        } else {
          // 生成输入div
          let div = document.getElementsByClassName('el-card__body')
          let newDiv = document.createElement('div')
          newDiv.setAttribute('class', 'groupList')// 设置class属性
          newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
          if (type === 0) {// 添加校区
            this.addCampus(newDiv)
            this.haveCampuses = false
          } else if (type === 1) {// 添加楼栋
            newDiv.innerHTML = '<input type="text" value="( )" style="text-align: center"/>'
            this.addBuilding(newDiv)
          } else if (type === 2) {// 添加教室
            this.addClassroom(newDiv)
          }
          div[type].appendChild(newDiv)// 插入div
          newDiv.childNodes[0].focus()
        }
      },

      // 增加校区
      addCampus (newDiv) {
        let self = this
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          if (newCampus) {// 存在校区名
            $.ajax({
              type: 'POST',
              url: self.api + 'schoolZones',
              dataType: 'json',
              data: {'name': newCampus},
              success (data) {
                if (data === 1) {// 更新数据并移除输入框
                  newDiv.remove()
                  self.getCampusesList()
                  self.$message({
                    message: '校区添加成功！',
                    type: 'success'
                  })
                  self.modifyBtn = true
                } else if (data.status === 1) {
                  self.clickList = false// 不能切换分组
                  newDiv.childNodes[0].focus()// input框获取焦点
                  self.$message({
                    message: '校区名不能重复！',
                    type: 'warning'
                  })
                  self.modifyBtn = false
                } else {
                  self.modifyBtn = true
                  newDiv.remove()
                  self.getCampusesList()
                  self.$message.error('校区添加失败！')
                }
              }
            })
          } else {// 无校区名
            self.clickList = true
            newDiv.remove()
          }
        })
      },

      // 增加楼栋
      addBuilding (newDiv) {
        if (this.campusId === -1) {// 未选择校区的情况下
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            newDiv.remove()
          })
          alert('请选择校区后再添加新楼栋')
        } else {// 选择校区的情况下
          let self = this
          this.haveBuildings = false
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            let buildingData = newDiv.childNodes[0].value// 取值
            let newBuilding = buildingData.split('(')[0]// 取出楼栋名
            let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
            if (newBuilding && newFloor) {// 楼栋名&层数均存在
              $.ajax({
                type: 'POST',
                url: self.api + 'buildings',
                headers: {
                  'Content-Type': 'application/json',
                },
                dataType: 'json',
                data: JSON.stringify({
                  'zoneId': self.campusId,
                  'name': newBuilding,
                  'floors': newFloor
                }),
                success (data) {
                  if (data === 1) {// 更新数据并移除输入框
                    newDiv.remove()
                    self.getBuildingsList(self.campusId)
                    self.$message({
                      message: '楼栋添加成功！',
                      type: 'success'
                    })
                    self.modifyBtn = true
                  } else if (data.status === 1) {
                    self.clickList = false// 不能切换分组
                    newDiv.childNodes[0].focus()// input框获取焦点
                    self.$message({
                      message: '楼栋名不能重复！',
                      type: 'warning'
                    })
                    self.modifyBtn = false
                  } else {
                    self.modifyBtn = true
                    newDiv.remove()
                    self.getBuildingsList(self.campusId)
                    self.$message.error('楼栋添加失败！')
                  }
                }
              })
            } else if (!newBuilding && newFloor) {// 楼栋未填写，楼层填写
              self.clickList = false
              self.modifyBtn = false
              self.$message.error('请在括号前填写楼栋名！')
              newDiv.childNodes[0].focus()
            } else if (newBuilding && !newFloor) {// 楼栋填写，楼层未填写
              self.clickList = false
              self.modifyBtn = false
              self.$message.error('请检查括号内是否正确填写该楼栋的楼层数')
              newDiv.childNodes[0].focus()
            } else {
              self.clickList = true
              self.modifyBtn = true
              newDiv.remove()// 移除div
            }
          })
        }
      },

      // 增加教室
      addClassroom (newDiv) {
        if (this.campusId !== -1 && this.buildingId !== -1) {// 选中校区及楼层
          let self = this
          this.haveClassrooms = false
          // 在列表最后一项插入新div
          newDiv.childNodes[0].addEventListener('blur', function () {//  input框失焦后的操作
            let newClassroom = newDiv.childNodes[0].value// 取值
            let roomFloor = parseInt(newClassroom.replace(/[^0-9]/ig, '').substr(0, 1))// 获取楼层
            if (newClassroom && roomFloor) {// 教室名&楼层均存在
              $.ajax({
                type: 'POST',
                url: self.api + 'rooms',
                headers: {
                  'Content-Type': 'application/json',
                },
                dataType: 'json',
                data: JSON.stringify({
                  'buildingId': self.buildingId,
                  'name': newClassroom,
                  'floor': roomFloor
                }),
                success (data) {
                  if (data === 1) {// 更新数据并移除输入框
                    newDiv.remove()
                    self.getClassroomsList(self.buildingId)
                    self.$message({
                      message: '教室添加成功！',
                      type: 'success'
                    })
                    self.modifyBtn = true
                  } else if (data.status === 1) {
                    self.clickList = false// 不能切换分组
                    newDiv.childNodes[0].focus()// input框获取焦点
                    self.$message({
                      message: '教室名不能重复！',
                      type: 'warning'
                    })
                    self.modifyBtn = false
                  } else {
                    self.modifyBtn = true
                    newDiv.remove()
                    self.getClassroomsList(self.buildingId)
                    self.$message.error('教室添加失败！')
                  }
                }
              })
            } else if (newClassroom && !roomFloor) {
              self.clickList = false// 不能切换分组
              self.modifyBtn = false
              newDiv.childNodes[0].focus()// input框获取焦点
              self.$message.error('请填写正确的教室格式')
            } else {
              self.clickList = true
              self.modifyBtn = true
              newDiv.remove()// 移除div
            }
          })
        } else if (this.campusId === -1) {
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            newDiv.remove()
          })
          alert('请选择校区及楼栋后再添加新教室')
        } else if (this.buildingId === -1) {
          newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
            newDiv.remove()
          })
          alert('请选择楼栋后再添加新教室')
        }
      },

      // 修改操作
      modifyNewDiv (type, index, name, floor) {
        let div = document.getElementsByClassName('el-card__body')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'groupList')// 设置class属性
        newDiv.innerHTML = '<input type="text" style="text-align: center"/>'// 添加input框
        div[type].insertBefore(newDiv, div[type].childNodes[index + 1])// 插入有input框的div
        div[type].childNodes[index + 2].style.display = 'none'// 隐藏要修改的div
        newDiv.childNodes[0].focus()// input框获取焦点
        newDiv.childNodes[0].value = name// 确保焦点在文字后方
        if (type === 0) {// 添加校区
          this.modifyCampus(div[type], newDiv, index)
        } else if (type === 1) {// 添加楼栋
          newDiv.childNodes[0].value = name + '(' + floor + ')'
          this.modifyBuilding(div[type], newDiv, index)
        } else if (type === 2) {// 添加教室
          this.modifyClassroom(div[type], newDiv, index)
        }
      },

      // 修改校区
      modifyCampus (div, newDiv, index) {
        let self = this
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newCampus = newDiv.childNodes[0].value// 取值
          if (newCampus) {// 校区名存在数据
            $.ajax({
              type: 'PUT',
              url: self.api + 'schoolZones',
              headers: {'Content-Type': 'application/json',},
              dataType: 'json',
              data: JSON.stringify({
                'id': self.campusId,
                'name': newCampus
              }),
              success (data) {
                if (data === 1) {
                  self.getCampusesList()
                  newDiv.remove()
                  // 显示修改后的div
                  div.childNodes[index + 1].style.display = 'block'
                  div.childNodes[index + 1].style.background = '#BBB'
                  self.$message({
                    message: '校区名修改成功！',
                    type: 'success'
                  })
                  self.modifyBtn = true
                } else if (data.status === 1) {
                  self.clickList = false// 不能切换分组
                  newDiv.childNodes[0].focus()// input框获取焦点
                  self.$message({
                    message: '校区名不能重复！',
                    type: 'warning'
                  })
                  self.modifyBtn = false
                } else {
                  self.getCampusesList()
                  self.modifyBtn = true
                  newDiv.remove()
                  // 显示修改后的div
                  div.childNodes[index + 1].style.display = 'block'
                  div.childNodes[index + 1].style.background = '#BBB'
                  self.$message.error('校区名修改失败！')
                }
              }
            })
          } else {// 校区名无数据
            self.$message.error('校区名不能为空')
            self.clickList = false
            self.modifyBtn = false
            newDiv.childNodes[0].focus()// input框获取焦点
          }
        })
      },

      // 修改楼栋
      modifyBuilding (div, newDiv, index) {
        let self = this
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let buildingData = newDiv.childNodes[0].value// 取值
          let newBuilding = buildingData.split('(')[0]// 取出楼栋名
          let newFloor = parseInt(buildingData.substring(buildingData.indexOf('(') + 1, buildingData.indexOf(')')))// 取出层数并转换为数字
          if (newBuilding && newFloor) {// 调用修改楼栋接口
            $.ajax({
              type: 'PUT',
              url: self.api + 'buildings',
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
                if (data === 1) {
                  self.getBuildingsList(self.campusId)
                  newDiv.remove()// 移除div
                  div.childNodes[index + 1].style.display = 'block'// 显示修改后的div
                  div.childNodes[index + 1].style.background = '#BBB'// 显示修改后的div
                  self.$message({
                    message: '楼栋名修改成功！',
                    type: 'success'
                  })
                  self.modifyBtn = true
                } else if (data.status === 1) {
                  self.clickList = false// 不能切换分组
                  newDiv.childNodes[0].focus()// input框获取焦点
                  self.$message({
                    message: '楼栋名不能重复！',
                    type: 'warning'
                  })
                  self.modifyBtn = false
                } else {
                  self.getBuildingsList(self.campusId)
                  newDiv.remove()// 移除div
                  div.childNodes[index + 1].style.display = 'block'// 显示修改后的div
                  div.childNodes[index + 1].style.background = '#BBB'// 显示修改后的div
                  self.$message.error('楼栋名修改失败！')
                  self.modifyBtn = true
                }
              },
              error () {
                self.getBuildingsList(self.campusId)
                self.modifyBtn = true
                newDiv.remove()// 移除div
                div.childNodes[index + 1].style.display = 'block'// 显示修改后的div
                div.childNodes[index + 1].style.background = '#BBB'// 显示修改后的div
                console.log('error')
              }
            })
          } else {
            self.$message.error('请按照"楼栋名(层数)"的格式修改')
            self.clickList = false
            self.modifyBtn = false
            newDiv.childNodes[0].focus()// input框获取焦点
          }
        })
      },

      // 修改教室
      modifyClassroom (div, newDiv, index) {
        let self = this
        newDiv.childNodes[0].addEventListener('blur', function () {// input框失焦后的操作
          let newClassroom = newDiv.childNodes[0].value// 取值
          let roomFloor = parseInt(newClassroom.replace(/[^0-9]/ig, '').substr(0, 1))// 取楼层
          if (newClassroom) {// 教室名存在数据
            $.ajax({
              type: 'PUT',
              url: self.api + 'rooms',
              headers: {
                'Content-Type': 'application/json',
              },
              dataType: 'json',
              data: JSON.stringify({
                'id': self.classroomId,
                'name': newClassroom,
                'floors': roomFloor,
                'buildingId': self.buildingId
              }),
              success (data) {
                if (data === 1) {
                  self.getClassroomsList(self.buildingId)
                  newDiv.remove()// 移除div
                  div.childNodes[index + 1].style.display = 'block'
                  div.childNodes[index + 1].style.background = '#BBB'
                  self.$message({
                    message: '教室修改成功！',
                    type: 'success'
                  })
                  self.modifyBtn = true
                } else if (data.status === 1) {
                  self.clickList = false// 不能切换分组
                  newDiv.childNodes[0].focus()// input框获取焦点
                  self.$message({
                    message: '教室名不能重复！',
                    type: 'warning'
                  })
                  self.modifyBtn = false
                } else {
                  self.getClassroomsList(self.buildingId)
                  self.modifyBtn = true
                  newDiv.remove()// 移除div
                  div.childNodes[index + 1].style.display = 'block'
                  div.childNodes[index + 1].style.background = '#BBB'
                  self.$message.error('教室修改失败！')
                }
              }
            })
          } else {// 教室名无数据
            self.$message.error('教室名不能为空')
            self.clickList = false
            self.modifyBtn = false
            newDiv.childNodes[0].focus()
          }
        })
      },

      // 删除操作
      deleteGroup (type, id) {
        if (type === 0) {
          this.delGroupType = '校区'
        } else if (type === 1) {
          this.delGroupType = '楼栋'
        } else if (type === 2) {
          this.delGroupType = '教室'
        }
        this.delId = id
        this.delGroup = true
      },

      // 清除样式
      clearCSS (type) {
        console.log(type)
        let campusesList = document.getElementsByClassName('campusesList')
        let buildingsList = document.getElementsByClassName('buildingsList')
        let classroomsList = document.getElementsByClassName('classroomsList')
        if (type === 0) {// 选择校区
          this.showCampusOperate = -1
          for (let i = 0; i < campusesList.length; i++) {
            campusesList[i].style.background = '#FFF'
          }
        } else if (type === 1) {// 选择楼栋
          this.showBuildingOperate = -1
          for (let i = 0; i < buildingsList.length; i++) {
            buildingsList[i].style.background = '#FFF'
          }
        } else if (type === 2) {// 选择教室
          this.showClassroomOperate = -1
          for (let i = 0; i < classroomsList.length; i++) {
            classroomsList[i].style.background = '#FFF'
          }
        }
      },

      // 获取校区列表
      getCampusesList () {
        let self = this
        this.clickList = true
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'schoolZones',
          success (data) {
            if (data.length === 0) {
              self.haveCampuses = true
            } else {
              self.haveCampuses = false
            }
            self.allCampuses = data
          },
          error () {
            console.log('获取数据失败')
          }
        })
      },

      // 获取楼栋列表
      getBuildingsList (id) {
        let self = this
        this.clickList = true
        $.ajax({
            type: 'GET',
            url: this.api + 'buildings',
            data: {'zoneId': id},
            success (data) {
              // self.$emit('updateNav')
              if (data.length === 0) {
                self.haveBuildings = true
              } else {
                self.haveBuildings = false
              }
              self.buildingsData = data
            },
            error () {
              console.log('获取数据失败')
            }
          }
        )
      },

      // 获取教室列表
      getClassroomsList (id) {
        let self = this
        this.clickList = true

        // 根据选中的楼栋id获取教室列表
        $.ajax({
          type: 'GET',
          url: this.api + 'rooms/' + id,
          success (data) {
            if (data.length === 0) {
              self.haveClassrooms = true
            } else {
              self.haveClassrooms = false
            }
            self.classroomsData = data
          }
        })
      },

      // 批量添加分组
      showBatchAddition () {
        this.batchAddition = true
      },

      // 关闭子级模态框
      closeModel () {
        this.delGroup = false
        this.batchAddition = false
      },

      // 关闭模态框
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
  .groupList {
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
