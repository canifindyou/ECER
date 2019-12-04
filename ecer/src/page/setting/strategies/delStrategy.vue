<template>
  <div>
    <el-dialog title="删除"
               top="150px"
               :visible.sync="delStrategy"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="body">
        <div class="tip">是否删除所选策略？</div>
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      delId: Number,
      delStrategy: Boolean
    },
    data () {
      return {

      }
    },
    methods: {
      closeModel () {
        this.delStrategy = false
        this.$emit('closeModel')
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 430px;
  }

  .body {
    position: relative;
    height: 150px;
    text-align: center;
  }

  .tip {
    line-height: 150px;
    font-size: 23px;
    letter-spacing: 1px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
