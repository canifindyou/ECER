<template>
  <div>
   <searchHead :flag="false" :pageFlag="2" @searchSelfStatus="searchSelfStatus"></searchHead>
    <div style="margin:10px 0 0 0">
      <template>
        <el-table :data="tableData" align="center" style="width: 100%">
          <el-table-column align="center" prop="deviceName" label="空调名称" >
          </el-table-column>
          <el-table-column
            align="center"
            label="自控状态"
            prop="auto_status"
            :formatter="format"
          >
          <!--prop="selfStatus"  -->
          </el-table-column>
          <el-table-column align="center" prop="setStatus" label="设置">
            <template slot-scope="props">
            <el-switch
              v-model="props.row.auto_status"
              active-color="#13ce66"
              inactive-color="#ff3342"
              @change="switchChange($event, props.row.device_id)"
            >
            </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
      <div style="text-align:center;margin:20px 0 0 0 ">
        <!-- <el-switch v-model="pages"> </el-switch> -->
        <el-pagination
          :hide-on-single-page="pages"
          :total="total"
          :page-size="10"
          layout="prev, pager, next"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
  </div>
</template>

<script>
import searchHead from "../../components/searchHead/searchHead"
import axios from "axios"
export default {
  data() {
    return {
      requestObj:{},
      tableData: [],
      total:10,
      pages: true,
      isSearch:false,
      pageNum:"",
    };
  },
  components:{
      searchHead
  },
  methods:{
    changePage(el){
      this.pageNum = el
      console.log("页码变化",el)
      if(this.isSearch){
         this.requestObj["pageNum"] = this.pageNum
         this.requestObj["pageSize"] = 10
       axios.get(this.api + "/deviceAutoStatus",{params:this.requestObj})
        .then(res=>{
           res.data.list.forEach(item =>{
             this.total = res.data.total
            item.auto_status = item.auto_status == 0 ? true : false
            console.log( item.auto_status)
          })
          this.tableData = res.data.list
        })
        .catch()
      }else{
       axios.get(this.api + "/deviceAutoStatus",{params:{pageNum:this.pageNum,pageSize:10}})
        .then(res=>{
           res.data.list.forEach(item =>{
             this.total = res.data.total
            item.auto_status = item.auto_status == 0 ? true : false
            console.log( item.auto_status)
          })
          this.tableData = res.data.list
        })
        .catch()
      }
    },
      switchChange(el,index){
          console.log(el,index)
          if(el){
            console.log("打开自控")
            axios.get(this.api + "devices/auto/on",{params:{ids:[index].toString()}})
            .then(()=>{
              console.log("打开成功")
            })
            .catch(()=>{
              console.log("打开失败")
            })
          }else{
            console.log("关闭自控")
               axios.get(this.api + "devices/auto/off",{params:{ids:[index].toString()}})
            .then(()=>{
              console.log("关闭成功")
            })
            .catch(()=>{
              console.log("关闭失败")
            })
          }
      },
      searchSelfStatus(data){
        this.requestObj = data
        this.isSearch = true
        console.log("自控状态历史搜索事件")
        console.log(data)
        axios.get(this.api + "/deviceAutoStatus",{params:data})
        .then(res=>{
           res.data.list.forEach(item =>{
             this.total = res.data.total
            item.auto_status = item.auto_status == 0 ? true : false
            console.log( item.auto_status)
          })
          this.tableData = res.data.list
        })
        .catch()

      },
      getTableData(){
        axios.get(this.api + "/deviceAutoStatus")
        .then(res=>{
           res.data.list.forEach(item =>{
             this.total = res.data.total
            item.auto_status = item.auto_status == 0 ? true : false
            console.log( item.auto_status)
          })
          this.tableData = res.data.list
        })
        .catch()
      },
      format(name,flag,flag2){
       
       if(name.auto_status){
         return "开启"
       }else{
         
         return "关闭"
       }
      }
  },
  mounted(){
    this.getTableData()
  }
};
</script>


