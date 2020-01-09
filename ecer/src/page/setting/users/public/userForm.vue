<template>
  <el-form :label-position="labelPosition" label-width="90px">
    <!--        :model="formLabelAlign"-->
    <el-form-item label="用户工号">
      <el-input v-model="userData.userNum" @change="handleChange"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名">
      <el-input v-model="userData.userName" @change="handleChange"></el-input>
    </el-form-item>
    <el-form-item label="分组选择">
      <div class="groupSelect">
        <el-tree :data="groupList" :props="defaultProps" show-checkbox accordion
                 @check-change="handleCheckChange" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      modifyData: Object
    },
    data () {
      return {
        cookieCode: '',
        labelPosition: 'left',
        campusId: 0,
        buildingId: 0,
        floorId: 0,
        userData: {
          userNum: '',
          userName: '',
          deviceId: [],
        },
        groupList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      getCampuses () {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'schoolZones;' + this.cookieCode,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          success (data) {
            if (data.length === 0) {
              return false
            } else {
              self.groupList = data
              for (let i = 0; i < data.length; i++) {
                self.groupList[i].code = 0//证明是校区
                self.getBuildings(data[i].id)
              }
            }
          }
        })
      },

      getBuildings (id) {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'buildings;' + this.cookieCode,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: {'zoneId': id},
          success (data) {
            if (data.length === 0) {
              return false
            } else {
              for (let i = 0; i < self.groupList.length; i++) {
                if (id === self.groupList[i].id) {
                  self.groupList[i].children = data
                  for (let j = 0; j < data.length; j++) {
                    self.groupList[i].children[j].code = 1//楼栋
                  }
                }
              }
              for (let j = 0; j < data.length; j++) {
                self.getFloors(id, data[j].id)
              }
            }
          }
        })
      },

      getFloors (campusId, buildingId) {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'buildings/' + buildingId + '/floors;' + this.cookieCode,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          success (data) {
            if (data.length === 0) {
              return false
            } else {
              for (let i = 0; i < self.groupList.length; i++) {
                if (campusId === self.groupList[i].id) {// 判断正确校区
                  let building = self.groupList[i].children
                  for (let j = 0; j < building.length; j++) {// 判断正确楼栋
                    if (buildingId === building[j].id) {
                      building[j].children = []
                      for (let f = 1; f <= data; f++) {
                        building[j].children.push({name: f + '层', children: [], code: 2})//层
                      }
                      self.getClassroom(campusId, buildingId)
                    }
                  }
                }
              }
            }
          }
        })
      },

      getClassroom (campusId, buildingId) {
        let self = this
        for (let i = 0; i < self.groupList.length; i++) {
          if (campusId === self.groupList[i].id) {// 判断正确校区
            let building = self.groupList[i].children
            for (let j = 0; j < building.length; j++) {// 判断正确楼栋
              if (buildingId === building[j].id) {
                for (let f = 1; f <= building[j].children.length; f++) {
                  $.ajax({
                    type: 'GET',
                    async: false,
                    url: this.api + 'rooms/' + buildingId + '/' + f + ';' + this.cookieCode,
                    headers: {
                      'X-Requested-With': 'XMLHttpRequest'
                    },
                    success (data) {
                      if (data.length === 0) {
                        return false
                      } else {
                        building[j].children[f - 1].children = data
                        for (let c = 0; c < data.length; c++) {
                          building[j].children[f - 1].children[c].code = 3
                        }
                      }
                    }
                  })
                }
              }
            }
          }
        }
      },

      handleCheckChange (data, checked, indeterminate) {
        let self = this
        if (data.code === 0) {//校区
          this.campusId = data.id
          $.ajax({
            type: 'GET',
            async: false,
            url: this.api + 'devices/' + data.id + ';' + this.cookieCode,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            success (data) {
              self.getDeviceId(checked, indeterminate, data)
            }
          })
        } else if (data.code === 1) {
          this.buildingId = data.id
          $.ajax({
            type: 'GET',
            async: false,
            url: this.api + 'devices/' + this.campusId + '/' + data.id + ';' + this.cookieCode,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            success (data) {
              self.getDeviceId(checked, indeterminate, data)
            }
          })
        } else if (data.code === 2) {
          this.floorId = parseInt(data.name)
          console.log(this.floorId)
          $.ajax({
            type: 'GET',
            async: false,
            url: this.api + 'devices/' + this.campusId + '/' + this.buildingId + '/' + this.floorId + ';' + this.cookieCode,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            success (data) {
              self.getDeviceId(checked, indeterminate, data)
            }
          })
        } else if (data.code === 3) {
          $.ajax({
            type: 'GET',
            async: false,
            url: this.api + 'devices/' + this.campusId + '/' + this.buildingId + '/' + this.floorId + '/' + data.id + ';' + this.cookieCode,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            success (data) {
              self.getDeviceId(checked, indeterminate, data)
            }
          })
        }
      },

      getDeviceId (checked, indeterminate, data) {
        if (checked === true) {
          for (let i = 0; i < data.list.length; i++) {
            this.userData.deviceId.push(data.list[i].id)
          }
          this.userData.deviceId = Array.from(new Set(this.userData.deviceId))
          console.log(this.userData.deviceId)
        } else if (checked === false && indeterminate === true) {
          return false
        } else if (checked === false && indeterminate === false) {
          console.log(this.userData.deviceId)
          if (this.userData.deviceId.length !== 0) {
            for (let i = 0; i < data.list.length; i++) {
              for (let j = 0; j < this.userData.deviceId.length; j++) {
                if (data.list[i].id === this.userData.deviceId[j]) {
                  this.userData.deviceId.splice(j, 1)
                }
              }
            }
          }
          console.log(this.userData.deviceId)
        }
        this.$emit('getNewData', this.userData)
      },

      handleChange () {
        this.$emit('getNewData', this.userData)
      },

      handleNodeClick (data) {
        console.log(data)
        if (data.code === 0) {
          this.campusId = data.id
        } else if (data.code === 1) {
          this.buildingId = data.id
        } else if (data.code === 2) {
          this.floorId = data.name
        }
      },

      clearData () {
        this.userData = {
          userNum: '',
          userName: '',
          deviceId: [],
        }
      }
    },
    mounted () {
      if (sessionStorage.getItem('jsessionid') != null) {
        this.cookieCode = 'jsessionid=' + sessionStorage.getItem('jsessionid')
      }
      if (this.cookieCode !== '') {
        this.getCampuses()
      }
    },
    watch: {
      modifyData (newVal) {
        this.userData.userNum = newVal.id
        this.userData.userName = newVal.name 
        this.userData.deviceId = newVal.devices
      }
    }
  }
</script>

<style scoped>
  .el-form {
    margin: 10px auto;
    width: 300px;
    height: 400px;
  }

  .el-form-item {
    margin-bottom: 8px;
  }

  .el-form >>> .el-form-item__label {
    font-size: 18px;
  }

  .el-form >>> .el-input__inner {
    height: 32px;
    border: 1px solid #BBB;
  }

  .groupSelect {
    width: 100%;
    height: 275px;
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #BBB;
  }

  .el-tree {
    padding: 0;
  }

  .el-tree >>> .el-tree-node__content {
    border-bottom: 1px solid #BBBBBB;
  }
</style>
