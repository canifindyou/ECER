<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="设备名称"
      align = "center"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="预设时间"
      align = "center"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.olderTime }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="操作时间"
      align = "center"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.operatTime }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="操作人"
      align = "center"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.operatPerson }}</span>
      </template>
    </el-table-column>
     </el-table-column>
        <el-table-column
      label="执行状态"
      align = "center"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align = "center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog
  title="修改时间"
  :visible.sync="editModel"
  width="30%"
  :before-close="handleClose">
  <div style="text-align:center">
       修改时间：<el-date-picker
                v-model="startTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
                size="mini"
                :picker-options="pickerOptions"
                @change="initOptions2"
              >
              </el-date-picker>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editModel = false">取 消</el-button>
    <el-button type="primary" @click="editModel = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
data() {
      return {
          editModel:false,//修改弹窗
          startTime:"",
        tableData: [{
          name: '东二209',
          olderTime: '2019-12-26 13:00',//设定时间
          operatTime: '2019-12-26 12:00',//操作时间
          operatPerson:"杨老师",//操作人
          status:"未执行"//执行状态
        }, ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.editModel = true
      },
    
      handleDelete(index, row) {
        this.$confirm(`此操作将删除设备${row.name}定时项 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
}
</script>

<style>

</style>