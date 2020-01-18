<template>
  <el-dialog
    title="修改策略"
    top="50px"
    :visible.sync="showModify"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <!--    <strategy-info :showInfo="showInfo" @getNewData="getNewData" refs="strategyInfo"></strategy-info>-->
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="预设名称" class="strategyName">
        <el-input v-model="strategyInfo.strategyName"></el-input>
      </el-form-item>
      <div class="titleBoundary">
        <div class="title">时间设置</div>
        <div class="manageTime">
          <template>
            <el-radio v-model="radio" label="1" @change="changeRadio">指定时间段</el-radio>
            <el-radio v-model="radio" label="2" @change="changeRadio">全天执行</el-radio>
          </template>
          <el-form-item label="星期选择:" class="selectWeeks">
            <template>
              <!--              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
              <el-checkbox-group v-model="strategyInfo.chooseWeeds" @change="checkedWeeks">
                <el-checkbox v-for="week in weeks" :label="week">{{week}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
          <el-form-item label="开始时间">
            <template>
              <el-input-number v-model="strategyInfo.startTimeHour" :precision="0" :disabled="timeSlot"
                               controls-position="right" size="mini" :min="0"
                               :max="23"></el-input-number>
              <span class="word">时</span>
              <el-input-number v-model="strategyInfo.startTimeMin" :precision="0" :disabled="timeSlot"
                               controls-position="right" size="mini" :min="0"
                               :max="59"></el-input-number>
              <span class="word">分</span>
            </template>
          </el-form-item>
          <el-form-item label="结束时间">
            <template>
              <el-input-number v-model="strategyInfo.endTimeHour" :precision="0" :disabled="timeSlot"
                               controls-position="right" size="mini" :min="0"
                               :max="23"></el-input-number>
              <span class="word">时</span>
              <el-input-number v-model="strategyInfo.endTimeMin" :precision="0" :disabled="timeSlot"
                               controls-position="right" size="mini" :min="0"
                               :max="59"></el-input-number>
              <span class="word">分</span>
            </template>
          </el-form-item>
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">温度参数设置</div>
        <div class="manageTemp">
          <div class="summerTemp">
            <div>夏季送电温度:
              <el-input-number v-model="strategyInfo.transPowerSTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
            <div>夏季断电温度:
              <el-input-number v-model="strategyInfo.failPowerSTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
            <div>夏季温度回调:
              <el-input-number v-model="strategyInfo.callbackSTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
          </div>
          <div class="winterTemp">
            <div>冬季送电温度:
              <el-input-number v-model="strategyInfo.transPowerWTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
            <div>冬季断电温度:
              <el-input-number v-model="strategyInfo.failPowerWTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
            <div>冬季温度回调:
              <el-input-number v-model="strategyInfo.callbackWTemp" :precision="0" size="mini"
                               controls-position="right" :min="5"
                               :max="40"></el-input-number>
              度
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="modifySucc">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import strategyInfo from './public/strategyInfo'

  export default {
    props: {
      modifyStrategy: Boolean,
      modifyId: Number,
      modifyInfo: Object
    },
    components: {
      strategyInfo
    },
    data () {
      return {
        showModify: false,
        labelPosition: 'left',
        radio: '1',
        strategyInfo: {
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
        timeSlot: false,
        // 全选
        weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      }
    },
    methods: {
      changeRadio () {
        if (this.radio === '2') {
          this.timeSlot = true
          this.strategyInfo.startTimeHour = 0
          this.strategyInfo.startTimeMin = 0
          this.strategyInfo.endTimeHour = 23
          this.strategyInfo.endTimeMin = 59
        } else {
          this.timeSlot = false
        }
      },

      // 获取策略执行天数
      checkedWeeks (value) {
        this.strategyInfo.chooseWeeds = []
        this.strategyInfo.chooseWeeds = value
        this.strategyInfo.weedsNum = []
        for (let i = 0; i < value.length; i++) {
          switch (this.strategyInfo.chooseWeeds[i]) {
            case '星期一':
              this.strategyInfo.weedsNum.push(1)
              break
            case '星期二':
              this.strategyInfo.weedsNum.push(2)
              break
            case '星期三':
              this.strategyInfo.weedsNum.push(3)
              break
            case '星期四':
              this.strategyInfo.weedsNum.push(4)
              break
            case '星期五':
              this.strategyInfo.weedsNum.push(5)
              break
            case '星期六':
              this.strategyInfo.weedsNum.push(6)
              break
            case '星期日':
              this.strategyInfo.weedsNum.push(7)
              break
          }
        }
      },

      clearData () {
        this.radio = '1'
        this.timeSlot = false
        this.strategyInfo = {
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
        }
      },

      modifySucc () {
        let self = this
        this.strategyInfo.weedsNum = Array.from(new Set(this.strategyInfo.weedsNum))
        $.ajax({
          type: 'PUT',
          url: this.api + 'strategies',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({
            'id': this.modifyId,
            'name': this.strategyInfo.strategyName,
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
            if (data === true) {
              console.log(data)
              self.closeModel()
              self.$message({
                message: '策略修改成功！',
                type: 'success'
              })
            } else {
              self.$message.error('添加失败请重试！')
            }
          }
        })
      },

      closeModel () {
        this.showModify = false
        this.clearData()
        this.$emit('showStrategyInfo', this.modifyId)
        this.$emit('closeModel')
      },
    },
    watch: {
      modifyStrategy (newVal) {
        this.showModify = newVal
      },

      modifyInfo: {
        handler (newVal) {
          this.strategyInfo = newVal
          if (newVal.startTimeHour === '00' && newVal.startTimeMin === '00' && newVal.endTimeHour === '23' && newVal.endTimeMin === '59') {
            this.radio = '2'
            this.timeSlot = true
          }
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";
  @import "../../../assets/strategyInfo.css";

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
