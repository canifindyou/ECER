<template>
  <div>
    <el-dialog title="删除"
               top="150px"
               :visible.sync="delUser"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="body">
        <div class="tip">是否删除该用户？</div>
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="delSuc">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      delId: Number,
      delUser: Boolean
    },
    data () {
      return {
        showDel: false
      }
    },
    methods: {
      delSuc () {
        let self = this
        $.ajax({
          type: 'DELETE',
          url: this.api + 'users',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          xhrFields: {
            withCredentials: true
          },
          data: {
            id: this.delId
          },
          success (data) {
            console.log(data)
            if (data===true){
              self.$message({
                type:'success',
                message:'用户删除成功！'
              })
            }else{
              self.$message.error('用户删除失败！')
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
      delUser (newVal) {
        this.showDel = newVal
      }
    },
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
