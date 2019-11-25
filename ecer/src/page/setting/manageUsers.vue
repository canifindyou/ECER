<template>
  <div class="user">
    <el-dialog title="用户管理"
               top="125px"
               :visible.sync="manageUsers"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <hr class="boundary">
      <el-table
        :data="tableData"
        height="270px"
        style="width: 90%">
        <el-table-column
          prop="userNum"
          label="用户工号"
          width="135px"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名">
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="110px"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px">
          <el-button size="small" @click="modifyUser=true">修 改</el-button>
          <el-button size="small" type="danger">删 除</el-button>
        </el-table-column>
      </el-table>
      <hr class="boundary">
      <add-user :addUser="addUser"></add-user>
      <el-dialog
        width="30%"
        title="修改用户"
        :visible.sync="modifyUser"
        append-to-body>
      </el-dialog>
      <!--      <el-dialog-->
      <!--        width="30%"-->
      <!--        title="删除用户"-->
      <!--        :visible.sync="delUser"-->
      <!--        append-to-body>-->
      <!--      </el-dialog>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">关 闭</el-button>
        <el-button type="success" @click="addUser = true">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import addUser from './users/addUser'

  export default {
    components: {
      addUser
    },
    data () {
      return {
        manageUsers: true,
        addUser: false,
        modifyUser: false,
        tableData: [{
          userNum: '316202061035',
          userName: '王小虎',
          addTime: '2019-11-07'
        }, {
          userNum: '11111',
          userName: '王小虎',
          addTime: '2019-11-07'
        }, {
          userNum: '11111',
          userName: '王小虎',
          addTime: '2019-11-07'
        }, {
          userNum: '11111',
          userName: '王小虎',
          addTime: '2019-11-07'
        }, {
          userNum: '11111',
          userName: '王小虎',
          addTime: '2019-11-07'
        }]
      }
    }
  }
</script>

<style scoped>
  .user >>> .el-dialog {
    width: 655px;
    border-radius: 10px;
  }

  .user >>> .el-dialog__header {
    padding: 17px 20px 10px;
  }

  .user >>> .el-dialog__title {
    font-size: 22px;
  }

  .user >>> .el-dialog__headerbtn {
    top: 15px;
    font-size: 24px;
  }

  .user >>> .el-dialog__body {
    padding: 0;
  }

  .boundary {
    margin: 0 auto;
    width: 96%;
    background-color: #BBBBBB;
    height: 1px;
    border: none;
  }

  .el-table--fit {
    margin: 10px auto;
    border: 1px solid #BBBBBB;
  }

  .user >>> .el-table th.is-leaf {
    text-align: center;
    font-size: 16px;
    padding: 7px;
    border-bottom: 1px solid #BBBBBB;
  }

  .user >>> .el-table td {
    text-align: center;
    font-size: 16px;
    padding: 7px 0;
    border-bottom: 1px solid #BBBBBB;
    word-break: keep-all;
    white-space: nowrap;
  }

  .user >>> .el-dialog__footer {
    padding: 12px 20px;
  }

  .user >>> .el-dialog__footer .el-button--default, .el-button--success {
    margin: 0;
    border-radius: 8px;
    font-size: 16px;
    padding: 10px 26px;
  }

  .el-button--success {
    float: left;
  }
</style>
