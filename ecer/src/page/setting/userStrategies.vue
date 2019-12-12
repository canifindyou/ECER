<template>
  <el-dialog title="策略管理"
             top="110px"
             :visible.sync="manageStrategies"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <div class="body">
      <div class="strategiesCards">
        <el-card class="adminStrategies">
          <div slot="header" class="clearfix">
            <span>管理员预设</span>
          </div>
          <div class="adminStrategyName" v-for="(item,index) in adminList"
               @click="selectAdminStrategy(item.id,item.name)">
            {{item.name}}
          </div>
        </el-card>
        <el-card class="usersStrategies">
          <div slot="header" class="clearfix">
            <span>自定义预设</span>
          </div>
          <div class="userStrategiesName" v-for="(item,index) in userList"
               @click="selectUserStrategy(item.id,item.name)">
            {{item.name}}
          </div>
          <div class="cardFooter"><i class="el-icon-remove" @click="showDelModel"></i><i class="el-icon-circle-plus"
                                                                                         @click="showAddModel"></i>
          </div>
        </el-card>
      </div>
      <div class="strategyContent">
        <div class="titleBoundary">
          <div class="title">时间管理</div>
          <div class="manageTime">
            <div>执行策略: <span>{{strategyInfo.executionStrategy}}</span></div>
            <div>执行时间: <span>{{strategyInfo.executionTime}}</span></div>
            <div class="showTime">
              <div class="startTime">开始时间:<span>{{strategyInfo.startTimeHour}}</span>时<span>{{strategyInfo.startTimeMin}}</span>分
              </div>
              <div class="endTime">
                结束时间:<span>{{strategyInfo.endTimeHour}}</span>时<span>{{strategyInfo.endTimeMin}}</span>分
              </div>
            </div>
          </div>
        </div>
        <div class="titleBoundary">
          <div class="title">温度参数设置</div>
          <div class="manageTemp">
            <div class="summerTemp">
              <div>夏季送电温度: <span>{{strategyInfo.transPowerSTemp}}</span>度</div>
              <div>夏季断电温度: <span>{{strategyInfo.failPowerSTemp}}</span>度</div>
              <div>夏季温度回调: <span>{{strategyInfo.callbackSTemp}}</span>度</div>
            </div>
            <div class="winterTemp">
              <div>冬季送电温度: <span>{{strategyInfo.transPowerWTemp}}</span>度</div>
              <div>冬季断电温度: <span>{{strategyInfo.failPowerWTemp}}</span>度</div>
              <div>冬季温度回调: <span>{{strategyInfo.callbackWTemp}}</span>度</div>
            </div>
          </div>
        </div>
        <el-button type="primary" v-show="showModify">修 改</el-button>
        <el-button type="warning">应 用</el-button>
      </div>
    </div>
    <hr class="boundary">
    <add-strategy :addStrategy="addStrategy" @closeModel="closeModel"></add-strategy>
    <del-strategy :delStrategy="delStrategy" :delId="selectId" @closeModel="closeModel"></del-strategy>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAllModel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import addStrategy from './strategies/addStrategy'
  import delStrategy from './strategies/delStrategy'

  export default {
    components: {
      addStrategy,
      delStrategy
    },
    data () {
      return {
        manageStrategies: true,
        showModify: false,
        addStrategy: false,
        selectId: 0,
        delStrategy: false,
        adminList: [{
          'id': 1,
          'name': '预设一',
          'executionTime': ['星期一', '星期二', '星期一', '星期二', '星期一', '星期二', '星期一'],
          'executionStrategy': '按时段执行',
          'startTime': '08:00',
          'endTime': '17:00',
          'transPowerSTemp': '26',
          'failPowerSTemp': '26',
          'callbackSTemp': '26',
          'transPowerWTemp': '10',
          'failPowerWTemp': '10',
          'callbackWTemp': '10',
        },
          {
            'id': 2,
            'name': '预设二',
            'executionTime': ['星期一', '星期二'],
            'executionStrategy': '全天执行',
            'startTime': '00:00',
            'endTime': '00:00'
          },],
        userList: [{
          'id': 1,
          'name': '111',
          'executionTime': ['星期一', '星期二', '星期一', '星期二', '星期一', '星期二', '星期一'],
          'executionStrategy': '按时段执行',
          'startTime': '08:00',
          'endTime': '17:00',
          'transPowerSTemp': '26',
          'failPowerSTemp': '26',
          'callbackSTemp': '26',
          'transPowerWTemp': '10',
          'failPowerWTemp': '10',
          'callbackWTemp': '10',
        },
          {
            'id': 2,
            'name': '222',
            'executionTime': ['星期一', '星期二'],
            'executionStrategy': '全天执行',
            'startTime': '00:00',
            'endTime': '00:00'
          },],
        strategyInfo: {}
      }
    },
    methods: {
      // 选中预设
      selectAdminStrategy (id, name) {
        this.showModify = false
        let hour, min
        this.selectId = id
        this.$nextTick(function () {
          let strategiesName = document.getElementsByClassName('adminStrategyName')
          let userStrategiesName = document.getElementsByClassName('userStrategiesName')
          for (let i = 0; i < userStrategiesName.length; i++) {
            userStrategiesName[i].style.background = '#FFF'
          }
          for (let i = 0; i < strategiesName.length; i++) {
            let campus = strategiesName[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
            if (name === campus) {//被选中
              strategiesName[i].style.background = '#BBB'
            } else {
              strategiesName[i].style.background = '#FFF'
            }
          }
        })
        for (let i = 0; i < this.adminList.length; i++) {
          if (id === this.adminList[i].id) {
            this.strategyInfo = this.adminList[i]
            if ((typeof this.strategyInfo.executionTime == 'object') && this.strategyInfo.executionTime.constructor === Array) {
              this.strategyInfo.executionTime = this.strategyInfo.executionTime.join('、')
            }
            hour = this.strategyInfo.startTime.split(':')[0]
            min = this.strategyInfo.startTime.split(':')[1]
            this.strategyInfo.startTimeHour = hour
            this.strategyInfo.startTimeMin = min
            hour = this.strategyInfo.endTime.split(':')[0]
            min = this.strategyInfo.endTime.split(':')[1]
            this.strategyInfo.endTimeHour = hour
            this.strategyInfo.endTimeMin = min
          }
        }
      },

      selectUserStrategy (id, name) {
        this.showModify = true
        let hour, min
        this.selectId = id
        this.$nextTick(function () {
          let strategiesName = document.getElementsByClassName('userStrategiesName')
          let adminStrategiesName = document.getElementsByClassName('adminStrategyName')
          for (let i = 0; i < adminStrategiesName.length; i++) {
            adminStrategiesName[i].style.background = '#FFF'
          }
          for (let i = 0; i < strategiesName.length; i++) {
            let campus = strategiesName[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
            if (name === campus) {//被选中
              strategiesName[i].style.background = '#BBB'
            } else {
              strategiesName[i].style.background = '#FFF'
            }
          }
        })
        for (let i = 0; i < this.userList.length; i++) {
          if (id === this.userList[i].id) {
            this.strategyInfo = this.userList[i]
            if ((typeof this.strategyInfo.executionTime == 'object') && this.strategyInfo.executionTime.constructor === Array) {
              this.strategyInfo.executionTime = this.strategyInfo.executionTime.join('、')
            }
            hour = this.strategyInfo.startTime.split(':')[0]
            min = this.strategyInfo.startTime.split(':')[1]
            this.strategyInfo.startTimeHour = hour
            this.strategyInfo.startTimeMin = min
            hour = this.strategyInfo.endTime.split(':')[0]
            min = this.strategyInfo.endTime.split(':')[1]
            this.strategyInfo.endTimeHour = hour
            this.strategyInfo.endTimeMin = min
          }
        }
      },

      // 添加新策略
      showAddModel () {
        this.addStrategy = true
      },

      showDelModel () {
        this.delStrategy = true
      },

      // 关闭子级模态框
      closeModel () {
        this.addStrategy = false
        this.delStrategy = false
      },

      closeAllModel () {
        this.manageStrategies = false
      }
    },
    mounted () {
      this.selectAdminStrategy(this.adminList[0].id, this.adminList[0].name)
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';


  .el-dialog__wrapper >>> .el-dialog {
    width: 700px;
  }

  .body {
    margin: 20px auto;
    width: 95%;
    height: 350px;
  }

  .strategiesCards {
    float: left;
    width: 33%;
  }

  .adminStrategies {
    position: relative;
    margin: 0 0 10px 9px;
    width: 100%;
    height: 139px;
    border: 1px solid #BBBBBB;
  }

  .usersStrategies {
    position: relative;
    margin: 0 0 0 9px;
    width: 100%;
    height: 200px;
    border: 1px solid #BBBBBB;
  }

  .adminStrategies >>> .el-card__header, .usersStrategies >>> .el-card__header {
    font-size: 16px;
    padding: 5px;
    text-align: center;
    background: #E8E8E8;
    border-bottom: 1px solid #BBBBBB;
  }

  .adminStrategies >>> .el-card__body {
    height: 100%;
    overflow-y: auto;
    padding: 0;
    text-align: center;
  }

  .usersStrategies >>> .el-card__body {
    height: 100%;
    overflow-y: auto;
    padding: 0;
    text-align: center;
  }

  .userStrategiesName, .adminStrategyName {
    padding: 5px;
    border-bottom: 1px solid #BBBBBB;
  }

  .cardFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #BBBBBB;
  }

  .el-icon-circle-plus {
    float: right;
    margin: 3px 0;
    font-size: 24px;
    color: #78AC3C;
  }

  .el-icon-remove {
    float: right;
    margin: 3px 7px 3px 5px;
    font-size: 24px;
    color: #AC3C3C;
  }

  .strategyContent {
    float: right;
    margin: 0 9px 0 0;
    width: 62%;
    height: 100%;
    overflow-y: auto;
    border: 1px solid #BBBBBB;
    border-radius: 4px;
  }

  .strategyContent span {
    color: #A8A8A8;
    padding: 0 10px;
  }

  .titleBoundary {
    position: relative;
    margin: 17px auto 22px;
    width: 91%;
    border: 1px solid #BBBBBB;
  }

  .title {
    position: absolute;
    top: -12px;
    left: 17px;
    margin: 0;
    font-size: 16px;
    padding: 0 5px;
    background-color: white;
  }

  .manageTime, .manageTemp {
    font-size: 14px;
    padding: 17px 15px 8px;
  }

  .manageTime div {
    margin-bottom: 7px;
  }

  .showTime {
    height: 20px;
  }

  .startTime {
    float: left
  }

  .endTime {
    float: right;
  }

  .manageTemp {
    height: 96px;
    padding: 22px 26px 8px 22px;
  }

  .manageTemp div {
    margin-bottom: 13px;
  }

  .summerTemp {
    float: left;
  }

  .winterTemp {
    float: right;
  }

  .el-button--primary, .el-button--warning {
    float: right;
    margin: 10px 20px 10px 0;
    width: 85px;
    padding: 10px 20px;
  }

  .el-button--default {
    margin: 0;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 26px;
  }

</style>
