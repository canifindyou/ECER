<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        prop="id"
        label="序号"
        width="135px"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="性别"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="affiliatedCampus"
        label="所属校区"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号码"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="添加时间"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180px">
        <template slot-scope="scope">
          <el-button size="small" @click="showModifyModel(scope.row.id)">修 改</el-button>
          <el-button size="small" type="danger" @click="showDelModel(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
        manageUsers: true,
        addUser: false,
        modifyId: 0,
        modifyUser: false,
        delId: 0,
        delUser: false,
        tableData: [{
          id: '1',
          userName: '王小虎',
          affiliatedCampus: '文津校区',
          phoneNum: '12345678910',
          addTime: '2019-11-07'
        }, {
          id: '2',
          userName: '王小虎',
          affiliatedCampus: '文津校区',
          phoneNum: '12345678910',
          addTime: '2019-11-07'
        }, {
          id: '3',
          userName: '王小虎',
          affiliatedCampus: '文津校区',
          phoneNum: '12345678910',
          addTime: '2019-11-07'
        }, {
          id: '4',
          userName: '王小虎',
          affiliatedCampus: '文津校区',
          phoneNum: '12345678910',
          addTime: '2019-11-07'
        }, {
          id: '5',
          userName: '王小虎',
          affiliatedCampus: '文津校区',
          phoneNum: '12345678910',
          addTime: '2019-11-07'
        }]
      }
    },
    methods: {
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
    },
  }
</script>

<style scoped>
  .table{

  }
  .table >>> .el-table--fit {
    margin: 10px auto;

  }

  .el-table{
    min-width: 970px;
    height: 50px;
    /*width: 100%;*/
    overflow-y: auto;
    overflow-x: auto;
  }

  .table >>> .el-table th.is-leaf {
    text-align: center;
    font-size: 16px;
    padding: 7px;
    border-bottom: 1px solid #BBBBBB;
  }

  .table >>> .el-table td {
    text-align: center;
    font-size: 16px;
    padding: 7px 0;
    border-bottom: 1px solid #BBBBBB;
    word-break: keep-all;
    white-space: nowrap;
  }
</style>
