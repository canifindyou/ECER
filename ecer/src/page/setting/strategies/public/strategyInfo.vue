<template>
  <el-form :label-position="labelPosition" label-width="80px">
    <el-form-item label="预设名称" class="strategyName">
      <el-input v-model="strategyInfo.strategyName" @change="handleChange"></el-input>
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
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="23"></el-input-number>
            <span class="word">时</span>
            <el-input-number v-model="strategyInfo.startTimeMin" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="59"></el-input-number>
            <span class="word">分</span>
          </template>
        </el-form-item>
        <el-form-item label="结束时间">
          <template>
            <el-input-number v-model="strategyInfo.endTimeHour" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="23"></el-input-number>
            <span class="word">时</span>
            <el-input-number v-model="strategyInfo.endTimeMin" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
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
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
          <div>夏季断电温度:
            <el-input-number v-model="strategyInfo.failPowerSTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
          <div>夏季温度回调:
            <el-input-number v-model="strategyInfo.callbackSTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
        </div>
        <div class="winterTemp">
          <div>冬季送电温度:
            <el-input-number v-model="strategyInfo.transPowerWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
          <div>冬季断电温度:
            <el-input-number v-model="strategyInfo.failPowerWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
          <div>冬季温度回调:
            <el-input-number v-model="strategyInfo.callbackWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5"
                             :max="40"></el-input-number>
            度
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
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
        this.$emit('getNewData', this.strategyInfo)
      },

      // 获取策略执行天数
      checkedWeeks (value) {
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
        this.$emit('getNewData', this.strategyInfo)
      },

      handleChange () {
        this.$emit('getNewData', this.strategyInfo)
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
      }
    }
  }
</script>

<style scoped>
  @import "../../../../assets/strategyInfo.css";
</style>
