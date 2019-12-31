<template>
  <div>
    <el-dialog title="删除"
               top="150px"
               :visible.sync="delOrder"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="body">
        <div class="tip">是否删除该指令模板？</div>
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="delTemp">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      delId: Number,
      delOrder: Boolean
    },
    data () {
      return {
        showDel: false
      }
    },
    methods: {
      delTemp () {
        console.log(this.delId)
        let self = this
        // $.ajax({
        //   type: 'DELETE',
        //   url: this.api + 'templates/' + this.delId,
        //   success (data) {
        //     console.log(self.delId)
        //     console.log(data)
        //     let jsonData = JSON.parse(data)
        //     if (jsonData === true) {
        //       self.$message({
        //         message: '该控制项模板删除成功！',
        //         type: 'success'
        //       })
        //     } else if (jsonData.status === 1) {// 校区名重复
        //       self.$message.error('存在该品牌型号的设备或控制项模板，无法删除！')
        //     }
        //     self.closeModel()
        //   }
        // })

        $.ajax({
          type: 'DELETE',
          url: this.api + 'templates',
          data: {
            'id': self.delId,
          },
          success (data) {
            console.log(data)
            let jsonData = JSON.parse(data)
            if (jsonData === true) {
              self.$message({
                message: '该控制项模板删除成功！',
                type: 'success'
              })
            } else if (jsonData.status === 1) {
              self.$message.error('存在该品牌型号的设备或控制项模板，无法删除！')
            }
            self.closeModel()
          }
        })
      },

      closeModel () {
        this.showDel = false
        this.$emit('closeModel')
      }
    },
    watch: {
      delOrder (newVal) {
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
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
