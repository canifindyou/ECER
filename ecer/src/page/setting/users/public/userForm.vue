<template>
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
        <el-tree :data="textData" :props="defaultProps" show-checkbox :default-checked-keys="[5]"
                 @check-change=""></el-tree>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
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
    methods: {}
  }
</script>

<style scoped>
  .el-form {
    margin: 10px auto;
    width: 300px;
    height: 400px;
  }

  .el-form-item {
    margin-bottom: 8px;
  }

  .el-form >>> .el-form-item__label {
    font-size: 18px;
  }

  .el-form >>> .el-input__inner {
    height: 32px;
    border: 1px solid #BBB;
  }

  .groupSelect {
    width: 100%;
    height: 275px;
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #BBB;
  }

  .el-tree {
    padding: 0;
  }

  .el-tree >>> .el-tree-node__content {
    border-bottom: 1px solid #BBBBBB;
  }
</style>
