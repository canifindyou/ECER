<template>
  <el-dialog title="策略管理"
             top="110px"
             :visible.sync="manageStrategies"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeAllModel">
    <hr class="boundary">
    <div class="body">
      <el-card class="cardGroups">
        <div slot="header" class="clearfix">
          <span>参数预设</span>
        </div>
        <div class="strategiesName" v-for="(item,index) in strategiesList" @click="selectStrategy(item.id,item.name)">
          {{item.name}}
        </div>
        <div class="cardFooter"><i class="el-icon-remove" @click="showDelModel"></i><i class="el-icon-circle-plus"
                                                                                       @click="showAddModel"></i></div>
      </el-card>
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
          let strategiesName = document.getElementsByClassName('strategiesName')
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
        this.$emit('closeModel')
      }
    },
    mounted () {
      this.selectStrategy(this.strategiesList[0].id, this.strategiesList[0].name)
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';
  @import '../../assets/manageStrategy.css';
</style>
