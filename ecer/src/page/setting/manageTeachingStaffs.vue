<template>
  <el-dialog title="教职工管理"
             top="125px"
             :visible.sync="manageUsers"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <div style="height:270px">暂未实现</div>
<!--    <el-table-->
<!--      :data="tableData"-->
<!--      height="270px"-->
<!--      style="width: 90%">-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="用户工号"-->
<!--        width="135px"-->
<!--        :show-overflow-tooltip="true">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="name"-->
<!--        label="用户姓名">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="createTime"-->
<!--        label="添加时间"-->
<!--        width="110px"-->
<!--        :show-overflow-tooltip="true">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        label="操作"-->
<!--        width="180px">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="small" @click="showModifyModel(scope.row.id)">修 改</el-button>-->
<!--          <el-button size="small" type="danger" @click="showDelModel(scope.row.id)">删 除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
    <hr class="boundary">
    <add-user :addUser="addUser" @closeModel="closeModel"></add-user>
    <modify-user :modifyUser="modifyUser" :modifyId="modifyId" @closeModel="closeModel"></modify-user>
    <del-user :delUser="delUser" :delId="delId" @closeModel="closeModel"></del-user>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAllModel">关 闭</el-button>
      <el-button type="success" @click="showAddModel">添 加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import addUser from './users/addUser'
  import modifyUser from './users/modifyUser'
  import delUser from './users/delUser'

  export default {
    components: {
      addUser,
      modifyUser,
      delUser
    },
    data () {
      return {
        cookieCode: '',
        manageUsers: true,
        addUser: false,
        modifyId: 0,
        modifyUser: false,
        delId: 0,
        delUser: false,
        tableData: []
      }
    },
    methods: {
      getList () {
        let self = this
        $.ajax({
          type: 'GET',
          url: this.api + 'userInfo;' + this.cookieCode,
          headers:{
            'X-Requested-With': 'XMLHttpRequest'
          },
          success (data) {
            for (let i = 0;i<data.length;i++){
              data[i].createTime=data[i].createTime.split(' ')[0]
            }
            self.tableData = data
          }
        })
      },

      showAddModel () {
        this.addUser = true
      },

      showModifyModel (id) {
        this.modifyId = id
        this.modifyUser = true
      },

      showDelModel (id) {
        this.delId = id
        this.delUser = true
      },

      closeModel () {
        this.addUser = false
        this.modifyId = 0
        this.modifyUser = false
        this.delId = 0
        this.delUser = false
      },

      closeAllModel () {
        this.manageUsers = false
        this.$emit('closeModel')
      }
    },
    mounted () {
      if (sessionStorage.getItem('jsessionid') != null) {
        this.cookieCode = 'jsessionid=' + sessionStorage.getItem('jsessionid')
      }
      if (this.cookieCode !== '') {
        this.getList()
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';

  .el-dialog__wrapper >>> .el-dialog {
    width: 655px;
  }

  .el-table--fit {
    margin: 10px auto;
    border: 1px solid #BBBBBB;
  }

  .el-dialog__wrapper >>> .el-table th.is-leaf {
    text-align: center;
    font-size: 16px;
    padding: 7px;
    border-bottom: 1px solid #BBBBBB;
  }

  .el-dialog__wrapper >>> .el-table td {
    text-align: center;
    font-size: 16px;
    padding: 7px 0;
    border-bottom: 1px solid #BBBBBB;
    word-break: keep-all;
    white-space: nowrap;
  }

  .el-button--success {
    float: left;
  }

  .el-dialog__footer .el-button--default, .el-button--success {
    margin: 0;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 26px;
  }
</style>
