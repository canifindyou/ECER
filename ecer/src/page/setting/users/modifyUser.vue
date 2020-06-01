<template>
  <el-dialog
    title="修改用户"
    top="100px"
    :visible.sync="showModify"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <user-form :modifyData="modifyData" @getModifyData="getModifyData" ref="userInfo"></user-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="modifySuc">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import userForm from './public/userForm'

  export default {
    components: {
      userForm
    },
    props: {
      modifyId: String,
      modifyUser: Boolean
    },
    data () {
      return {
        showModify: false,
        labelPosition: 'left',
        userData: {},
        modifyData: {}
      }
    },
    methods: {
      getModifyData (newData) {
        this.userData = newData
      },

      modifySuc () {
        let self = this
        $.ajax({
          type: 'PUT',
          url: this.api + 'users',
          dataType: 'JSON',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({
            'id': this.userData.userNum,
            'name': this.userData.userName,
            'roleId': 0,
            'deviceIds': this.userData.deviceId
          }),
          success (data) {
            console.log(data)
            if (data === true) {
              self.$message({
                message: '用户信息修改成功！',
                type: 'success'
              })
        //     } else if (data.status === 1) {
        //       self.$message({
        //         message: '设备已被其他用户管理！',
        //         type: 'warning'
        //       })
            } else {
              self.$message.error('用户信息修改失败！')
            }
            self.closeModel()
          }
        })
      },

      closeModel () {
        this.showModify = false
        this.$refs.userInfo.clearData()
        this.$emit('closeModel')
      },
    },
    watch: {
      modifyUser (newVal) {
        let self = this
        $.ajax({
          type: 'GET',
          url: this.api + 'users/' + this.modifyId + '/devices',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          xhrFields: {
            withCredentials: true
          },
          success (data) {
            // console.log(data)
            self.modifyData = data
          }
        })
        this.showModify = newVal
      }
    },
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 395px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
