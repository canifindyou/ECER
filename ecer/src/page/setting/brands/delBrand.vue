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
      return {
        showDel: false
      }
    },
    methods: {
      clickDel () {
        let self = this
        $.ajax({
          type: 'DELETE',
          url: this.api + 'models',
          data: {
            'id': self.delId,
          },
          success (data) {
            let jsonData = JSON.parse(data)
            if (jsonData === true) {
              self.$message({
                message: '该设备品牌型号删除成功！',
                type: 'success'
              })
            } else if (jsonData.status === 1) {// 校区名重复
              self.$message.error('存在该品牌型号的设备或控制项模板，无法删除！')
            }
            self.closeModel()
          }
        })
      },
      closeModel () {
        this.showDel = false
        this.$emit('showBrandsList')
        this.$emit('closeModel')
      }
    },
    watch: {
      delBrand (newVal) {
        this.showDel = newVal
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
  . font-size: 15 px;
    padding: 10px 20px;
  }
</style>
