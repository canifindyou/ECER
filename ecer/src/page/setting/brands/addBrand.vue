<template>
  <el-dialog
    title="添加品牌型号"
    top="150px"
    :visible.sync="addBrand"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <el-form :label-position="labelPosition" label-width="90px">
      <el-form-item label="设备品牌">
        <el-input v-model="deviceData.brandName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="deviceData.brandType"></el-input>
      </el-form-item>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="clickAdd">保 存</el-button>
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
        showAdd: false,
        labelPosition: 'left',
        deviceData: {
          brandName: '',
          brandType: ''
        },
      }
    },
    methods: {
      clickAdd () {
        let self = this
        $.ajax({
          type: 'POST',
          url: this.api + 'models',
          headers: {
            'Content-Type': 'application/json',
          },
          dataType: 'json',
          data: JSON.stringify({
            'brandName': self.deviceData.brandName,
            'modelName': self.deviceData.brandType
          }),
          success (data) {
            self.closeModel()
          }
        })
      },

      closeModel () {
        this.showAdd = false
        this.deviceData.brandName = ''
        this.deviceData.brandType = ''
        this.$emit('showBrandsList')
        this.$emit('closeModel')
      }
    },
    watch: {
      addBrand (newVal) {
        this.showAdd = newVal
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 395px;
  }

  .el-form {
    margin: 25px auto;
    width: 320px;
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

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
