<template>
  <div>
    <searchHead :flag="true"></searchHead>
    <div style="margin:10px 0 0 0">
      <template>
        <el-table :data="tableData" align="center" style="width: 100%">
          <el-table-column align="center" prop="name" label="空调名称">
          </el-table-column>
          <el-table-column align="center" prop="controllWay" label="控制方式">
          </el-table-column>
          <el-table-column align="center" prop="controllRouce" label="用户名称">
          </el-table-column>
          <el-table-column align="center" prop="controllItem" label="控制项">
          </el-table-column>
          <el-table-column align="center" prop="controllResult" label="控制结果">
          </el-table-column>
          <el-table-column align="center" prop="controllTime" label="控制时间">
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
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },
         {
          name: "空调一",
          controllWay: "手动控制",
          controllRouce: "管理员",
          controllItem: "高风制冷22度",
          controllResult: "控制成功",
          controllTime: "2019.10.14 12:22",

        },

      ]
    };
  },
  components:{
      searchHead
  }
};
</script>

<style></style>
