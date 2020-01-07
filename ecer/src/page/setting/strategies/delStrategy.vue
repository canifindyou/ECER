<template>
  <div>
    <el-dialog title="删除"
               top="150px"
               :visible.sync="showDel"
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
        <el-button type="danger" @click="delSucc">删 除</el-button>
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
        cookieCode: '',
        showDel: false
      }
    },
    methods: {
      delSucc () {
        let self = this
        $.ajax({
          type: 'DELETE',
          url: this.api + 'strategies/' + this.delId+';' + this.cookieCode,
          headers:{
            'X-Requested-With': 'XMLHttpRequest'
          },
          success (data) {
            if (data === true) {
              self.$message({
                type: 'success',
                message: '策略删除成功！'
              })
              self.closeModel(1)
            }else {
              self.$message.error('删除失败，请重试！')
              self.closeModel()
            }
          }
        })
      },

      closeModel (type) {
        // type存在删除操作成功
        this.showDel = false
        this.$emit('showStrategyInfo', this.delId)
        this.$emit('closeModel',type)
      }
    },
    watch: {
      delStrategy (newVal) {
        this.showDel = newVal
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
