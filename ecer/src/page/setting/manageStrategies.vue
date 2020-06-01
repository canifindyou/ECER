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
        <div class="strategiesName" v-for="(item,index) in strategiesList"
             @click="selectStrategy(item.id,item.name)">
          {{item.name}}
        </div>
        <div class="cardFooter"><i class="el-icon-remove" @click="showDelModel"></i><i
          class="el-icon-circle-plus"
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
    <modify-strategy :modifyStrategy="modifyStrategy" :modifyId="selectId" :modifyInfo="modifyInfo"
                     @closeModel="closeModel" @showStrategyInfo="showStrategyInfo"></modify-strategy>
    <del-strategy :delStrategy="delStrategy" :delId="selectId" @closeModel="closeModel"
                  @showStrategyInfo="showStrategyInfo"></del-strategy>
    <use-strategy :groupModel="groupModel" :useId="selectId" @closeModel="closeModel"></use-strategy>
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
        strategiesList: [],
        strategyInfo: {
          executionStrategy: '',
          executionTime: '',
          startTimeHour: '',
          endTimeHour: '',
          transPowerSTemp: 0,
          failPowerSTemp: 0,
          callbackSTemp: 0,
          transPowerWTemp: 0,
          failPowerWTemp: 0,
          callbackWTemp: 0
        },
        modifyInfo: {
          strategyName: '',
          chooseWeeds: [],
          weedsNum: [],
          startTimeHour: 0,
          startTimeMin: 0,
          endTimeHour: 0,
          endTimeMin: 0,
          transPowerSTemp: 26,
          failPowerSTemp: 26,
          callbackSTemp: 26,
          transPowerWTemp: 26,
          failPowerWTemp: 26,
          callbackWTemp: 26,
        },
        days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      }
    },
    methods: {
      getStrategiesList () {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'strategies',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          success (data) {
            console.log(data)
            self.strategiesList = data
          }
        })
      },

      showGroupModel () {
        this.groupModel = true
      },

      // 选中预设
      selectStrategy (id, name) {
        this.selectId = id
        this.modifyInfo.strategyName = name
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
            this.showStrategyInfo(id)
          }
        }
      },

      showStrategyInfo (id) {
        let self = this
        let sHour, eHour, sMin, eMin, executionStrategy
        let timeArr = []
        $.ajax({
          type: 'GET',
          url: this.api + 'strategies/' + id + '/days',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          success (data) {
            sHour = data[0].startTime.split(':')[0]
            sMin = data[0].startTime.split(':')[1]
            eHour = data[0].endTime.split(':')[0]
            eMin = data[0].endTime.split(':')[1]
            if (sHour === '00' && sMin === '00' && eHour === '23' && eMin === '59') {
              executionStrategy = '全天执行'
            } else {
              executionStrategy = '指定时间段'
            }
            self.strategyInfo.executionStrategy = executionStrategy
            for (let i = 0; i < data.length; i++) {
              timeArr.push(self.days[data[i].day - 1])
              self.modifyInfo.chooseWeeds = timeArr
              self.modifyInfo.weedsNum.push(data[i].day)
              self.strategyInfo.executionTime = timeArr.join('、')
            }
            self.strategyInfo.startTimeHour = sHour
            self.modifyInfo.startTimeHour = sHour

            self.strategyInfo.startTimeMin = sMin
            self.modifyInfo.startTimeMin = sMin

            self.strategyInfo.endTimeHour = eHour
            self.modifyInfo.endTimeHour = eHour

            self.strategyInfo.endTimeMin = eMin
            self.modifyInfo.endTimeMin = eMin

            self.strategyInfo.transPowerSTemp = data[0].summerHighestT
            self.modifyInfo.transPowerSTemp = data[0].summerHighestT

            self.strategyInfo.failPowerSTemp = data[0].summerLowestT
            self.modifyInfo.failPowerSTemp = data[0].summerLowestT

            self.strategyInfo.callbackSTemp = data[0].summerConstantT
            self.modifyInfo.callbackSTemp = data[0].summerConstantT

            self.strategyInfo.transPowerWTemp = data[0].winterLowestT
            self.modifyInfo.transPowerWTemp = data[0].winterLowestT

            self.strategyInfo.failPowerWTemp = data[0].winterHighestT
            self.modifyInfo.failPowerWTemp = data[0].winterHighestT

            self.strategyInfo.callbackWTemp = data[0].winterConstantT
            self.modifyInfo.callbackWTemp = data[0].winterConstantT
          }
        })
      },

      // 添加新策略
      showAddModel () {
        this.addStrategy = true
      },

      showModifyModel () {
        this.modifyInfo = Object.assign({}, this.modifyInfo)
        this.modifyStrategy = true
      },

      showDelModel () {
        this.delStrategy = true
      },

      // 关闭子级模态框
      closeModel (type) {
        if (!type) {
          this.addStrategy = false
          this.modifyStrategy = false
          this.groupModel = false
        } else {
          this.delStrategy = false
          if (type === 1) {
            this.selectStrategy(this.strategiesList[0].id, this.strategiesList[0].name)
          }
        }
        this.getStrategiesList()
      },

      closeAllModel () {
        this.manageStrategies = false
        this.$emit('closeModel')
      }
    },
    mounted () {
      this.getStrategiesList()
      if (this.strategiesList.length !== 0) {
        this.selectStrategy(this.strategiesList[0].id, this.strategiesList[0].name)
      }
      $.ajax({
        type:'GET',
        url:this.api+'/userInfo',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        xhrFields: {
          withCredentials: true
        },
        success(data){
          console.log(data)
        }
      })
    }
  }
</script>

<style scoped>
  @import '../../assets/public/model.css';
  @import '../../assets/manageStrategy.css';
</style>
