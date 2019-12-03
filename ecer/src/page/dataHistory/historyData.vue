<template>
  <div>
    <searchHead :flag="true"></searchHead>

    <div style="margin:10px 0 0 0">
      <template>
        <el-table :data="tableData" align="center" style="width: 100%">
          <el-table-column align="center" prop="name" label="空调名称">
          </el-table-column>
          <el-table-column align="center" prop="warningDevice" label="蜂鸣器">
          </el-table-column>
          <el-table-column align="center" prop="temp" label="温度">
          </el-table-column>
          <el-table-column align="center" prop="powerStatus" label="电源">
          </el-table-column>
          <el-table-column align="center" prop="voltage" label="电压">
          </el-table-column>
          <el-table-column align="center" prop="current" label="电流">
          </el-table-column>
          <el-table-column align="center" prop="selfControllStatus" label="自控状态">
          </el-table-column>
           <el-table-column align="center" prop="obtainTime" label="采集时间">
          </el-table-column>
        
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import searchHead from "../../components/searchHead/searchHead"
export default {
  data() {
    return {
      tableData: [
        {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
           {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
           {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
           {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
           {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
           {
          name: "空调一",
          warningDevice: "开启",
          temp: "22",
          powerStatus: "电源",
          voltage: "220V",
          current: "5A",
          obtainTime: "2019.12.1 12:22",
          selfControllStatus:"开启"
        },
        
      ]
    };
  },
  components:{
      searchHead
  }
};
</script>

<style scoped>
.contentbox {
  display: inline-flex;
}
.tableHead {
  /* height: 50px; */
  /* border-bottom: 1px solid #000; */
  /* line-height: 20px; */
  display: block;
  /* padding: 0 0 0 5px; */
}
.tableHead .selectItem {
  display: block;
  padding: 10px 5px 0 10px;
}
.select-box {
  border: 1px #eee solid;
  padding: 0px 20px 0 0px;
}
</style>
