<template>
  <el-dialog
    title="添加用户"
    top="100px"
    :visible.sync="addUser"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <user-form @getNewData="getNewData" ref="userInfo"></user-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addSuc">保 存</el-button>
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
      addUser: Boolean
    },
    data () {
      return {
        cookieCode: '',
        showAdd: false,
        labelPosition: 'left',
        userData: {},
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      getNewData (newData) {
        this.userData = newData
      },

      addSuc () {
        let self = this
        $.ajax({
          type: 'POST',
          url: this.api + 'users;' + this.cookieCode,
          dataType: 'JSON',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          data: JSON.stringify({
            'id': this.userData.userNum,
            'name': this.userData.userName,
            'roleId': 0,
            'deviceIds': this.userData.deviceId
          }),
          success (data) {
            if (data === true) {
              self.$message({
                message: '新用户添加成功！',
                type: 'success'
              })
            } else if (data.status === 1) {
              self.$message({
                message: '设备已被其他用户管理！',
                type: 'warning'
              })
            } else {
              self.$message.error('新用户添加失败！')
            }
            self.closeModel()
          }
        })
      },

      closeModel () {
        this.showAdd = false
        this.$refs.userInfo.clearData()
        this.$emit('closeModel')
      }
    },
    watch: {
      addUser (newVal) {
        this.showAdd = newVal
      }
    },
    mounted () {
      if (sessionStorage.getItem('jsessionid') != null) {
        this.cookieCode = 'jsessionid=' + sessionStorage.getItem('jsessionid')
      }
    }
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
