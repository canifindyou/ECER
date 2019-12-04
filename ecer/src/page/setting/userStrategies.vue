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
          <div class="adminStrategyName" v-for="(item,index) in strategiesList" @click="selectStrategy(item.id,item.name)">
            {{item.name}}
          </div>
        </el-card>
        <el-card class="usersStrategies">
          <div slot="header" class="clearfix">
            <span>自定义预设</span>
          </div>
          <div class="strategiesName" v-for="(item,index) in strategiesList" @click="selectStrategy(item.id,item.name)">
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
              <div>夏季送电最低温: <span>{{strategyInfo.transPowerLowTemp}}</span>度</div>
              <div>环境温度最低温: <span>{{strategyInfo.TALowTemp}}</span>度</div>
              <div>空调可用最低温:<span>{{strategyInfo.airLowTemp}}</span></div>
            </div>
            <div class="winterTemp">
              <div>冬季送电最高温: <span>{{strategyInfo.transPowerHighTemp}}</span>度</div>
              <div>环境温度最高温: <span>{{strategyInfo.TAHighTemp}}</span>度</div>
              <div>空调可用最高温:<span>{{strategyInfo.airHighTemp}}</span></div>
            </div>
          </div>
        </div>
        <el-button type="primary">修 改</el-button>
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
        addStrategy: false,
        selectId: 0,
        delStrategy: false,
        strategiesList: [{
          'id': 1,
          'name': '预设一',
          'executionTime': ['星期一', '星期二', '星期一', '星期二', '星期一', '星期二', '星期一'],
          'executionStrategy': '按时段执行',
          'startTime': '08:00',
          'endTime': '17:00',
          'transPowerLowTemp': '26',
          'TALowTemp': '26',
          'airLowTemp': '恒温制冷26度',
          'transPowerHighTemp': '10',
          'TAHighTemp': '10',
          'airHighTemp': '恒温制热20度',
        },
          {
            'id': 2,
            'name': '预设二',
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
      selectStrategy (id, name) {
        let hour, min
        this.selectId = id
        this.$nextTick(function () {
          let strategiesName = document.getElementsByClassName('adminStrategyName')
          for (let i = 0; i < strategiesName.length; i++) {
            let campus = strategiesName[i].innerText.replace(/\s/g, '')// 清除按钮导致的回车
            if (name === campus) {//被选中
              strategiesName[i].style.background = '#BBB'
            } else {
              strategiesName[i].style.background = '#FFF'
            }
          }
        })
        for (let i = 0; i < this.strategiesList.length; i++) {
          if (id === this.strategiesList[i].id) {
            this.strategyInfo = this.strategiesList[i]
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
      this.selectStrategy(this.strategiesList[0].id, this.strategiesList[0].name)
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';


  .el-dialog__wrapper >>> .el-dialog {
    width: 850px;
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
    height:100%;
    overflow-y: auto;
    padding: 0;
    text-align: center;
  }

  .strategiesName,.adminStrategyName {
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
    padding: 21px 12px 8px;
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

  .el-button--primary {
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
