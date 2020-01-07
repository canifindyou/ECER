<template>
  <div>
    <searchHead :flag="true" :pageFlag="1" @searchHistory="searchHistory"></searchHead>

    <div style="margin:10px 0 0 0">
      <template>
        <el-table :data="tableData" align="center" style="width: 100%">
          <el-table-column align="center" prop="name" label="空调名称">
          </el-table-column>
          <el-table-column align="center" prop="buzzer_status" label="蜂鸣器">
          </el-table-column>
          <el-table-column align="center" label="温度">
            <template slot-scope="scope">
              {{scope.row.context_t}}℃
            </template>
          </el-table-column>
          <el-table-column align="center" prop="electric_consume" label="已用电量">
          </el-table-column>
          <el-table-column align="center" prop="on_off_status" label="电源">
          </el-table-column>
          <el-table-column align="center" prop="volts" label="电压">
          </el-table-column>
          <el-table-column align="center" prop="amperes" label="电流">
          </el-table-column>
          <el-table-column align="center" prop="auto_status" label="自控状态">
          </el-table-column>
          <el-table-column align="center" prop="create_time" label="采集时间">
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
  import searchHead from '../../components/searchHead/searchHead'
  import axios from 'axios'

  export default {
    data () {
      return {
        cookieCode: '',
        requestObj: {},
        isSearch: false,
        pages: '',
        total: 10,
        pageNum: 1,
        tableData: [
          // {
          //   name: '空调一',
          //   warningDevice: '开启',
          //   temp: '22',
          //   usedElectric: '500V',
          //   powerStatus: '电源',
          //   voltage: '220V',
          //   current: '5A',
          //   obtainTime: '2019.12.1 12:22',
          //   selfControllStatus: '开启'
          // },

        ]
      }
    },
    components: {
      searchHead
    },
    methods: {
      changePage (el) {
        this.pageNum = el
        if (this.isSearch) {
          this.requestObj['pageNum'] = this.pageNum
          this.requestObj['pageSize'] = 10
          this.pubilcFnAxios('/dataLogs', {pageNum: this.pageNum, pageSize: 10})
            .then(data => {
              console.log(data)
              this.total = data.total
              this.tableData = data.list
            })
            .catch(() => {
              console.log('失败')
            })
        } else {
          this.pubilcFnAxios('/dataLogs', {pageNum: this.pageNum, pageSize: 10})
            .then(data => {
              console.log(data)
              this.total = data.total
              this.tableData = data.list
            })
            .catch(() => {
              console.log('失败')
            })
        }
      },
      searchHistory (data) {
        console.log('触发搜索事件', data)
        this.isSearch = true
        if (data.endTime == '') {
          delete data.startTime
          delete data.endTime
        }
        this.requestObj = data
        this.pubilcFnAxios('/dataLogs', this.requestObj)
          .then(data => {
            this.total = data.total
            this.tableData = data.list
          })
      },
      getTableDate () {
        this.pubilcFnAxios('/dataLogs')
          .then(data => {
            console.log(data)
            this.total = data.total
            this.tableData = data.list

          })
          .catch(() => {
            console.log('失败')
          })
      },

      pubilcFnAxios (urlString, params, method) {
        //公用axios数据请求
        return new Promise((resolve, reject) => {
          axios
            .get(this.api + urlString + ';' + this.cookieCode, {
              params: params,
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(res => {

              resolve(res.data)
            })
            .catch(err => {
              reject('get请求错误')
            })
        })
      },
    },
    mounted () {
      if (sessionStorage.getItem('jsessionid') != null) {
        this.cookieCode = 'jsessionid=' + sessionStorage.getItem('jsessionid')
      }
      if (this.cookieCode !== '') {
        this.getTableDate()
      }
    }
  }
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
