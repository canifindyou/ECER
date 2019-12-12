<template>
  <div>
    <el-dialog title="删除"
               top="150px"
               :visible.sync="delBrand"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="body">
        <div class="tip">是否删除该条品牌信息？</div>
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="clickDel">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      delId: Number,
      delBrand: Boolean
    },
    data () {
      return {}
    },
    methods: {
      clickDel () {
        let self = this
        $.ajax({
          type: 'DELETE',
          url: 'http://172.16.211.75:8080/models',
          data: {
            'id': self.delId,
          },
          success (data) {
            console.log(data)
            self.closeModel()
          }
        })
      },
      closeModel () {
        this.delBrand = false
        this.$emit('showBrandsList')
        this.$emit('closeModel')
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
