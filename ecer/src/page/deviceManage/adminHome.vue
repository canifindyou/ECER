<template>
  <div>
    <div class="tableHead">
      <div class="tableHead-left">
        <el-button type="text" style="margin-left:20px">添加设备</el-button>
        <el-button type="text" style="margin-left:20px">批量操作</el-button>
        <el-button type="text" style="margin-left:20px">批量导入</el-button>
      </div>
      <div class="tableHead-right">
        <el-button size="mini" style="height: 30px;margin:auto 50px "
          >搜索</el-button
        >
        <template>
          <el-select
            v-model="selectBuild"
            placeholder="请选择"
            size="mini"
            style="width:120px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          size="mini"
          style="width:150px;margin-right:50px"
        >
        </el-input>
      </div>
    </div>
    
    <template>
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column type="expand" align="center" style="padding:0;height: 50px;">
          <template slot-scope="props" style="padding:0">
            <el-form label-position="left" inline class="demo-table-expand" style="padding:0;height: 40px;">
              <el-form-item label="位置:">
                <span>{{ props.row.location }}</span>
              </el-form-item>
               <el-form-item label="编号:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
               <el-form-item label="空调名称:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="型号" prop="type" align="center" width="100"> </el-table-column>
        <el-table-column label="品牌" prop="brandge" align="center" width="100"> </el-table-column>
        <el-table-column label="环境温度" prop="ter" align="center" > </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center" > </el-table-column>
        <el-table-column label="电量" prop="nums" align="center"> </el-table-column>
        <el-table-column label="控制" prop="control" align="center" width="120"> </el-table-column>
        <el-table-column label="自控状态" prop="selfControl" align="center" width="150"></el-table-column>
        <el-table-column label="操作" prop="manage" align="center" width="160">
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
    </template>
     
 
      
 
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      code: this.$route.query.code,
      options: [
        {
          value: "1F",
          label: "一楼"
        },
        {
          value: "2F",
          label: "二楼"
        },
        {
          value: "3F",
          label: "三楼"
        },
        {
          value: "4F",
          label: "四楼"
        },
        {
          value: "5F",
          label: "五楼"
        }
      ],
       tableData: [{
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        },
        {
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        },
        {
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        },
        {
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        },
        {
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        },
        {
          type: '一匹',
          brandge: '格力',
          ter: '26',
          status: '开机',
          nums: '200度',
          control: '下拉框',
          selfControl: '推拉框',
          location:"东二209",
          name:"空调一",
          id:"1123"
        }],

      selectBuild: ""
    };
  },
  methods: {
    test() {
      console.log("参数更新");
    }
  },
  watch: {
    $route() {
      //监听路由参数变化触发事件
      this.code = this.$route.query.code;
      this.test();
    }
  },
  mounted() {
    //  this.test()
  }
};
</script>

<style scoped>
.tableHead {
  height: 50px;
  border-bottom: 1px solid #000;
  line-height: 50px;
  /* padding: 0 0 0 5px; */
}
.tableHead .tableHead-left {
  display: inline-block;
  width: 49%;
}
.tableHead .tableHead-right {
  display: inline-flex;
  flex-direction: row-reverse;
  width: 50%;
}
.tableHead .tableHead-right .el-input-sellf {
  position: relative;
  font-size: 14px;
  display: inline-block;
  /* width: 100%; */
}
.tableHead .tableHead-right .tableSearch {
  border-radius: 5px;
  height: 40px;
  width: 50px;
}
</style>
