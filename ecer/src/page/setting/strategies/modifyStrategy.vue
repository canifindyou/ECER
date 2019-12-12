<template>
  <el-dialog
    title="修改策略"
    top="50px"
    :visible.sync="modifyStrategy"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <strategy-info></strategy-info>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import strategyInfo from './public/strategyInfo'
  export default {
    props: {
      modifyStrategy: Boolean
    },
    components:{
      strategyInfo
    },
    methods: {
      closeModel () {
        this.modifyStrategy = false
        this.$emit('closeModel')
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 500px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
