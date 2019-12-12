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
        <el-button type="primary" @click="showModifyModel">修 改</el-button>
        <el-button type="warning" @click="showGroupModel">应 用</el-button>
      </div>
    </div>
    <hr class="boundary">
    <add-strategy :addStrategy="addStrategy" @closeModel="closeModel"></add-strategy>
    <modify-strategy :modifyStrategy="modifyStrategy" @closeModel="closeModel"></modify-strategy>
    <del-strategy :delStrategy="delStrategy" :delId="selectId" @closeModel="closeModel"></del-strategy>
    <use-strategy :groupModel="groupModel"></use-strategy>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAllModel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import addStrategy from './strategies/addStrategy'
  import modifyStrategy from './strategies/modifyStrategy'
  import delStrategy from './strategies/delStrategy'
  import useStrategy from './strategies/useStrategy'

  export default {
    components: {
      addStrategy,
      modifyStrategy,
      delStrategy,
      useStrategy
    },
    data () {
      return {
        manageStrategies: true,
        addStrategy: false,
        selectId: 0,
        modifyStrategy: false,
        delStrategy: false,
        groupModel: false,
        strategiesList: [{
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
        strategyInfo: {}
      }
    },
    methods: {
      showGroupModel () {
        this.groupModel = true
      },

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

      showModifyModel () {
        this.modifyStrategy = true
      },

      showDelModel () {
        this.delStrategy = true
      },

      // 关闭子级模态框
      closeModel () {
        this.addStrategy = false
        this.modifyStrategy = false
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
