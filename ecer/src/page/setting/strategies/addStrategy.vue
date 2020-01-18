<template>
  <el-dialog
    title="添加策略"
    top="50px"
    :visible.sync="showAdd"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <strategy-info @getNewData="getNewData" ref="strategyInfo"></strategy-info>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="addSucc">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import strategyInfo from './public/strategyInfo'

  export default {
    props: {
      addStrategy: Boolean
    },
    components: {
      strategyInfo
    },
    data () {
      return {
        showAdd: false,
        strategyInfo: {}
      }
    },
    methods: {
      getNewData (newData) {
        this.strategyInfo = newData
      },

      addSucc () {
        let self = this
        $.ajax({
          type: 'POST',
          url: this.api + 'strategies',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({
            'name': this.strategyInfo.strategyName,
            'userId': 'demoData',
            'weeks': {
              'days': this.strategyInfo.weedsNum,
              'startTime': this.strategyInfo.startTimeHour + ':' + this.strategyInfo.startTimeMin + ':00',
              'endTime': this.strategyInfo.endTimeHour + ':' + this.strategyInfo.endTimeMin + ':00',
              'summerLowestT': this.strategyInfo.transPowerSTemp,
              'summerHighestT': this.strategyInfo.failPowerSTemp,
              'summerConstantT': this.strategyInfo.callbackSTemp,
              'winterLowestT': this.strategyInfo.transPowerWTemp,
              'winterHighestT': this.strategyInfo.failPowerWTemp,
              'winterConstantT': this.strategyInfo.callbackWTemp
            }
          }),
          success (data) {
            console.log(data)
            if (data === true) {
              self.closeModel()
              self.$message({
                message: '策略添加成功！',
                type: 'success'
              })
            } else {
              self.$message.error('添加失败请重试！')
            }
          }
        })
      },

      closeModel () {
        this.showAdd = false
        this.$refs.strategyInfo.clearData()
        this.$emit('closeModel')
      },
    },
    watch: {
      addStrategy (newVal) {
        this.showAdd = newVal
      }
    },
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 500px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
