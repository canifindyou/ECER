<template>
  <div>
    <searchHead :flag="true" :pageFlag="3" @instructSearch="instructSearch"></searchHead>
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
        isSearch: false,
        pages: '',
        total: 10,
        pageNum: 1,
        tableData: [
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },
          {
            name: '空调一',
            controllWay: '手动控制',
            controllRouce: '管理员',
            controllItem: '高风制冷22度',
            controllResult: '控制成功',
            controllTime: '2019.10.14 12:22',

          },

        ]
      }
    },
    methods: {
      changePage (el) {
        this.pageNum = el
        if (this.isSearch) {
          this.requestObj['pageNum'] = this.pageNum
          this.requestObj['pageSize'] = 10
          this.pubilcFnAxios('/instructLogs', {pageNum: this.pageNum, pageSize: 10})
            .then(data => {
              console.log(data)
              this.total = data.total
              this.tableData = data.list
            })
            .catch(() => {
              console.log('失败')
            })
        } else {
          this.pubilcFnAxios('/instructLogs', {pageNum: this.pageNum, pageSize: 10})
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
      instructSearch (data) {
        console.log('历史指令搜索事件触发')
        this.isSearch = true
        if (data.endTime == '') {
          delete data.startTime
          delete data.endTime
        }
        this.requestObj = data
        this.pubilcFnAxios('/instructLogs', this.requestObj)
          .then(data => {
            this.total = data.total
            this.tableData = data.list
          })
      },
      getTableDate () {
        this.pubilcFnAxios('/instructLogs')
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
          axios.get(this.api + urlString, {
            params: params,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject('get请求错误')
          })
        })
      },
    },
    components: {
      searchHead
    },
    mounted () {
      this.getTableDate()
    }
  }
</script>


