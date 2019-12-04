<template>
  <el-dialog
    title="添加用户"
    top="100px"
    :visible.sync="addUser"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <el-form :label-position="labelPosition" label-width="90px">
      <!--        :model="formLabelAlign"-->
      <el-form-item label="用户工号">
        <el-input v-model="userData.userNum"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="userData.userName"></el-input>
      </el-form-item>
      <el-form-item label="分组选择">
        <div class="groupSelect">
          <template v-for="item in textData">
            <el-collapse>
              <el-collapse-item>
                <template slot="title" class="buildings">
                  <el-checkbox></el-checkbox>
                  {{item.building}}
                </template>
                <el-collapse v-for="item1 in item.classroom">
                  <el-collapse-item>
                    <template slot="title">
                      <el-checkbox></el-checkbox>
                      {{item1.name}}
                    </template>
                    <div v-for="item2 in item1.device">
                      <el-checkbox></el-checkbox>
                      {{item2}}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
          </template>
        </div>
      </el-form-item>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      addUser: Boolean
    },
    data () {
      return {
        labelPosition: 'left',
        userData: {
          userNum: '',
          userName: '',
        },
        textData: [{
          'campus': '文津校区', 'building': '东二', 'floor': '一层',
          'classroom': [{'name': '109', 'device': ['1', '2']}, {'name': '110', 'device': ['1', '2']}]
        }, {
          'campus': '文津校区', 'building': '东二', 'floor': '二层',
          'classroom': [{'name': '209', 'device': ['1', '2']}, {'name': '210', 'device': ['1', '2']}]
        }]
      }
    },
    methods: {
      closeModel () {
        this.addUser = false
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

  .el-form {
    margin: 10px auto;
    width: 300px;
    height: 400px;
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

  .groupSelect {
    width: 100%;
    height: 275px;
    border-radius: 5px;
    border: 1px solid #BBB;
  }

  .el-dialog__wrapper >>> .el-collapse-item__header {
    height: 30px;
    background: #BBB;
  }

  .el-collapse-item[data-v-0b05019f] >>> .el-collapse-item__header {
    background: transparent;
  }

  .buildings {
    background: #BBB;
  }

  .el-dialog__wrapper >>> .el-checkbox ::after {
    transition: none !important;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
