<template>
  <div style="margin:10px 0 0 0">
    <template>
    <el-table :data="tableData" align="center" style="width: 100%">
      <el-table-column align="center" prop="type" label="型号" width="180"> </el-table-column>
      <el-table-column  align="center" prop="brand" label="品牌" width="180"> </el-table-column>
      <el-table-column  align="center" prop="location" label="位置" width="180"> </el-table-column>
       <el-table-column  align="center" prop="status" label="状态" width="180"> </el-table-column>
        <el-table-column  align="center" prop="reason" label="报警原因" width="180"> </el-table-column>
         <el-table-column  align="center" prop="warningTime" label="报警时间" width="180"> </el-table-column>
          <el-table-column  align="center" prop="isChecked" label="已查看" width="180"> </el-table-column>

    </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          type: "三批",
          brand: "品牌",
          location: "位置",
          status:"正常",
          reason:"电流异常",
          warningTime:"2019.10.14 12:22",
          isChecked:"已查看"
        },
           {
          type: "三批",
          brand: "品牌",
          location: "位置",
          status:"正常",
          reason:"电流异常",
          warningTime:"2019.10.14 12:22",
          isChecked:"已查看"
        },
           {
          type: "三批",
          brand: "品牌",
          location: "位置",
          status:"正常",
          reason:"电流异常",
          warningTime:"2019.10.14 12:22",
          isChecked:"已查看"
        },
           {
          type: "三批",
          brand: "品牌",
          location: "位置",
          status:"正常",
          reason:"电流异常",
          warningTime:"2019.10.14 12:22",
          isChecked:"已查看"
        },
    
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style></style>
