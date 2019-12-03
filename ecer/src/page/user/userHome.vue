<template>
  <div>
    <div class="tableHead">
      <div class="tableHead-left">
      
        <el-button type="text" style="margin-left:20px" @click="batchOperat"
          >批量操作</el-button
        >
       
      </div>
      <div class="tableHead-right">
        <el-button
          size="mini"
          style="height: 30px;margin:auto 50px "
          @click="searchClick"
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
          v-model="searchInput"
          size="mini"
          style="width:150px;margin-right:50px"
        >
        </el-input>
      </div>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="expand"
          align="center"
          style="padding:0;height: 50px;"
        >
          <template slot-scope="props" style="padding:0">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
              style="padding:0;height: 40px;"
            >
              <el-form-item label="IP:">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
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
        <el-table-column label="型号" prop="type" align="center">
        </el-table-column>
        <el-table-column label="品牌" prop="brandge" align="center">
        </el-table-column>
        <el-table-column label="环境温度" prop="ter" align="center">
        </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center">
        </el-table-column>
        <el-table-column label="电量" prop="nums" align="center">
        </el-table-column>
        <el-table-column label="控制" prop="control" width="200" align="center">
          <template slot-scope="props">
            <el-select
              v-model="controlItem[props.$index]['control' + props.$index]"
              placeholder="请选择"
              size="small"
              style="width:150px;"
            >
              <el-option
                v-for="item in props.row.control"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="自控状态" prop="selfControl" align="center">
          <template slot-scope="props">
            <el-switch
              v-model="props.row.selfControl"
              active-color="#13ce66"
              inactive-color="#ff3342"
              @change="switchChange($event, props.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>
      
      </el-table>
    </template>
    <!-- 添加弹窗 -->


    <batchDialog
      :showBatch="showBatch"
      @batchOperatClose="batchOperatClose"
    ></batchDialog
    ><!-- 批量管理 -->
  
  </div>
</template>

<script>

import batchDialog from "./batchOperat";

export default {
  data() {
    return {
      /* 此处为添加功能弹窗值绑定值*/

      addName: "", //空调名称
      addIp: "", //空调ip
      addId: "", //空调编号
      addType: "", //空调型号
      addBrand: "", //空调品牌
      addRoom: "", //教室名称
      addFloor: "", //楼层
      addBuilding: "", //楼栋
      addSchoolAera: "", //校区

      addNameOptions: "", //空调名称
      addIpOptions: "", //空调ip
      addIdOptions: "", //空调编号
      addTypeOptions: "", //空调型号
      addBrandOptions: "", //空调品牌
      addRoomOptions: "", //教室名称
      addFloorOptions: "", //楼层
      addBuildingOptions: "", //楼栋
      addSchoolAeraOptions: "", //校区

      /* 修改设备信息值 */
      showDialog: false,
      type: "",
      room: "",
      floor: "",
      build: "",
      school: "",
      brand: "",
      id: "",
      ip: "",
      name: "",

      /* 批量导入 */
      showUpLoad: false,

      /*  */
      showBatch: false, //批量操作弹窗
      centerDialogVisible: false, //添加设备弹窗控制
      selectBuild: "", //选择楼栋绑定值，头部搜索
      searchInput: "", //头部搜索输入框
      code: this.$route.query.code, //路由标识符
      controlItem: "", //控制项下拉框绑定值
      selfBtnValue: "",
      options: [
        //楼层搜索下拉框
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
      tableData: [
        //列表数据
        {
          type: "一匹",
          brandge: "格力",
          ter: "26",
          status: "通电未开机",
          nums: "200度",
          control: [
            {
              value: "开机",
              label: "开机"
            },
            {
              value: "关机",
              label: "关机"
            },
            {
              value: "高风制冷20度",
              label: "高风制冷20度"
            },
            {
              value: "高风制冷18度",
              label: "高风制冷18度"
            },
            {
              value: "低风制冷18度",
              label: "低风制冷18度"
            }
          ],
          selfControl: true,
          location: "东二209",
          name: "空调一",
          id: "1123",
          ip: "172.16.22.18"
        },
        {
          type: "一匹",
          brandge: "格力",
          ter: "26",
          status: "断电",
          nums: "200度",
          control: [
            {
              value: "开机",
              label: "开机"
            },
            {
              value: "关机",
              label: "关机"
            },
            {
              value: "高风制冷20度",
              label: "高风制冷20度"
            },
            {
              value: "高风制冷18度",
              label: "高风制冷18度"
            },
            {
              value: "低风制冷18度",
              label: "低风制冷18度"
            }
          ],
          selfControl: true,
          location: "东二209",
          name: "空调一",
          id: "1123",
          ip: "172.16.22.18"
        },
        {
          type: "一匹",
          brandge: "格力",
          ter: "26",
          status: "开机",
          nums: "200度",
          control: [
            {
              value: "开机",
              label: "开机"
            },
            {
              value: "关机",
              label: "关机"
            },
            {
              value: "高风制冷20度",
              label: "高风制冷20度"
            },
            {
              value: "高风制冷18度",
              label: "高风制冷18度"
            },
            {
              value: "低风制冷18度",
              label: "低风制冷18度"
            }
          ],
          selfControl: "推拉框",
          location: "东二209",
          name: "空调一",
          id: "1123",
          ip: "172.16.22.18"
        }
      ]
    };
  },
  components: {
  
    batchDialog,
   
  },
  methods: {
    test() {
      console.log("参数更新");
    },
    buildControlModel() {
      //构造下拉框绑定值
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push({ ["control" + i]: "" });
      }
      return arr;
    },
    switchChange(el, id) {
      //推拉框回调函数
      console.log(el, id);
    },
    searchClick() {
      //搜索功能
    },
    editClose() {
      //修改设备弹窗，子组件调用函数，关闭弹窗
      console.log("子组件触发成功");
      this.showDialog = false;
    },
    batchOperatClose() {
      //批量操作弹窗，子组件调用函数，关闭弹窗
      console.log("子组件触发成功");
      this.showBatch = false;
    },
    handleEdit(id, name) {
      //修改按钮绑定事件
      this.showDialog = true;
      console.log(id, name);
    },
    open(name) {
      //删除提示框
      this.$confirm(`此操作将删除${name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete(name, id) {
      //按钮点击事件
      this.open(name);
    },
    batchOperat() {
      //批量管理点击事件
      this.showBatch = true;
    },
    batchExport() {
      //批量导入按钮事件
      this.showUpLoad = true;
    },
    exportClose() {
      //批量导入回调函数
      this.showUpLoad = false;
    },
    openMessage() {
      this.$notify({
        title: "警告",
        message: "存在设备故障",
        type: "warning",
        duration: 0,
        onClick:this.checkedInfo
      });
    },
    checkedInfo(){
      this.$router.push("/waringInfo")
      console.log("查看消息")
    }
  },
  watch: {
    $route() {
      //监听路由参数变化触发事件，在这里进行页面切换时请求接口
      this.code = this.$route.query.code;
      this.test();
    }
  },
  mounted() {
    this.controlItem = this.buildControlModel(); //初始化下拉框绑定值
    this.openMessage();
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

.dialogContent {
  /* background: red; */
  height: 100%;
  width: 100%;
  text-align: center;
}
.dialogContent .dialogContentItem {
  height: 30px;
  margin: 0 0 20px 0;
}
.dialogContent .dialogContentItem .dItemText {
  margin-right: 15px;
}
.numStyle {
  margin: 0 0 20px -27px;
}
.ipStyle {
  margin: 0 0 20px -15px;
}
.nameStyle {
  margin: 0 0 20px -29px;
}
</style>
