<template>
  <div>
   <searchHead :flag="false"></searchHead>
    <div style="margin:10px 0 0 0">
      <template>
        <el-table :data="tableData" align="center" style="width: 100%">
          <el-table-column align="center" prop="name" label="空调名称">
          </el-table-column>
          <el-table-column
            align="center"
            label="自控状态"
            prop="setStatus"
            :formatter="format"
          >
          <!--prop="selfStatus"  -->
          </el-table-column>
          <el-table-column align="center" prop="setStatus" label="设置">
            <template slot-scope="props">
            <el-switch
              v-model="props.row.setStatus"
              active-color="#13ce66"
              inactive-color="#ff3342"
              @change="switchChange($event, props.$index)"
            >
            </el-switch>
            </template>
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
          selfControllStatus: "开启",
          setStatus: true
        },
        {
          name: "空调一",
          selfControllStatus: "开启",
          setStatus: true
        },
        {
          name: "空调一",
          selfControllStatus: "开启",
          setStatus: false
        },
        {
          name: "空调一",
          selfControllStatus: "开启",
          setStatus: false
        },
        {
          name: "空调一",
          selfControllStatus: "开启",
          setStatus: true
        }
      ]
    };
  },
  components:{
      searchHead
  },
  methods:{
      switchChange(el,index){
          console.log(el,index)
      },
      searchClick(){

      },
      format(name,flag,flag2){
       
       if(name.setStatus){
         return "开启"
       }else{
         return "关闭"
       }
      }
  }
};
</script>

<style></style>
