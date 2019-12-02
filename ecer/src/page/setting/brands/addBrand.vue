<template>
  <el-dialog
    title="添加品牌型号"
    top="150px"
    :visible.sync="addBrand"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body>
    <hr class="boundary">
    <el-form :label-position="labelPosition" label-width="90px">
      <el-form-item label="设备品牌">
        <el-input v-model="deviceData.brandId"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="deviceData.brandName"></el-input>
      </el-form-item>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      addBrand: Boolean
    },
    data () {
      return {
        labelPosition: 'left',
        deviceData: {
          brandId: '',
          brandName: '',
        },
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-form {
    margin: 25px auto;
    width: 330px;
    /*height: 130px;*/
  }

  .el-form-item {
    margin-bottom: 8px;
  }

  .el-dialog__wrapper >>> .el-form-item__label {
    font-size: 18px;
  }

  .el-dialog__wrapper >>> .el-input__inner {
    height: 32px;
    border: 1px solid #BBB;
  }
</style>
