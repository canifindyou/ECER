<template>
  <el-dialog
    title="修改用户"
    top="100px"
    :visible.sync="showModify"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <user-form :modifyData="modifyData"></user-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import userForm from './public/userForm'

  export default {
    components: {
      userForm
    },
    props: {
      modifyId: String,
      modifyUser: Boolean
    },
    data () {
      return {
        cookieCode:'',
        showModify: false,
        labelPosition: 'left',
        userData: {},
        modifyData:{}
      }
    },
    methods: {
      closeModel () {
        this.showModify = false
        this.$emit('closeModel')
      }
    },
    watch: {
      modifyUser (newVal) {
        let self = this
        $.ajax({
          type: 'GET',
          url: this.api + 'users/' + this.modifyId + ';' + this.cookieCode,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          success (data) {
            self.modifyData = data
          }
        })
        this.showModify = newVal
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
    width: 395px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
