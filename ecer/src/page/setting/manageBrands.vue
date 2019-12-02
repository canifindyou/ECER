<template>
  <div class="user">
    <el-dialog title="设备品牌管理"
               top="125px"
               :visible.sync="manageBrands"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <hr class="boundary">
      <el-table
        :data="tableData"
        height="270px"
        style="width: 90%">
        <el-table-column
          prop="brandId"
          label="编号"
          width="135px"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="型号"
          width="110px"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px">
          <el-button size="small" @click="modifyBrand=true">修 改</el-button>
          <el-button size="small" type="danger">删 除</el-button>
        </el-table-column>
      </el-table>
      <hr class="boundary">
      <add-brand :addBrand="addBrand"></add-brand>
      <!--      <el-dialog-->
      <!--        width="30%"-->
      <!--        title="删除用户"-->
      <!--        :visible.sync="delUser"-->
      <!--        append-to-body>-->
      <!--      </el-dialog>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">关 闭</el-button>
        <el-button type="success" @click="addBrand = true">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import addBrand from './brands/addBrand'

  export default {
    components: {
      addBrand
    },
    data () {
      return {
        manageBrands: true,
        addBrand:false,
        tableData: [{
          brandId: '1',
          brandName: '美的',
          deviceType: '1111'
        }, {
          brandId: '2',
          brandName: '美的',
          deviceType: '2222'
        },{
          brandId: '3',
          brandName: '格力',
          deviceType: '1111'
        }]
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';

  .user >>> .el-dialog {
    width: 655px;
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
</style>
