<template>
  <el-dialog
    title="修改用户"
    top="100px"
    :visible.sync="modifyUser"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <user-form></user-form>
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
    components:{
      userForm
    },
    props: {
      modifyId:String,
      modifyUser: Boolean
    },
    data () {
      return {
        labelPosition: 'left',
        userData: {
          userNum: '',
          userName: '',
        },
        textData: [{
          'name': '文津校区', 'children': [{
            'name': '东二', 'children': [{
              'name': '一层', 'children': [{
                'name': '109', 'device': ['1', '2']
              },
                {
                  'name': '110', 'device': ['1', '2']
                }]
            }]
          }]
        }],

        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      closeModel () {
        this.modifyUser = false
        this.$emit('closeModel')
      }
    },
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
