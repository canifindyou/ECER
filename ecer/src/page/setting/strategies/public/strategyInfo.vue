<template>
  <el-form :label-position="labelPosition" label-width="80px">
    <el-form-item label="预设名称" class="strategyName">
      <el-input v-model="strategyTime.strategyName"></el-input>
    </el-form-item>
    <div class="titleBoundary">
      <div class="title">时间设置</div>
      <div class="manageTime">
        <template>
          <el-radio v-model="strategyTime.radio" label="1" @change="changeRadio">指定时间段</el-radio>
          <el-radio v-model="strategyTime.radio" label="2" @change="changeRadio">全天执行</el-radio>
        </template>
        <el-form-item label="星期选择:" class="selectWeeks">
          <template>
            <!--              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
            <el-checkbox-group v-model="strategyTime.checkedWeeks" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="week in weeks" :label="week">{{week}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="开始时间">
          <template>
            <el-input-number v-model="strategyTime.startTimeHour" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="23"></el-input-number>
            <span class="word">时</span>
            <el-input-number v-model="strategyTime.startTimeMin" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="59"></el-input-number>
            <span class="word">分</span>
          </template>
        </el-form-item>
        <el-form-item label="结束时间">
          <template>
            <el-input-number v-model="strategyTime.endTimeHour" :precision="0" :disabled="timeSlot"
                             controls-position="right" @change="handleChange" size="mini" :min="0"
                             :max="23"></el-input-number>
            <span class="word">时</span>
            <el-input-number v-model="strategyTime.endTimeMin" :precision="0" :disabled="timeSlot"
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
            <el-input-number v-model="strategyTemp.transPowerSTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>夏季断电温度:
            <el-input-number v-model="strategyTemp.failPowerSTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>夏季温度回调:
            <el-input-number v-model="strategyTemp.callbackSTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
        </div>
        <div class="winterTemp">
          <div>冬季送电温度:
            <el-input-number v-model="strategyTemp.transPowerWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>冬季断电温度:
            <el-input-number v-model="strategyTemp.failPowerWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>冬季温度回调:
            <el-input-number v-model="strategyTemp.callbackWTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
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
        strategyTime: {
          strategyName: '',
          radio: '1',
          checkedWeeks: [],
          startTimeHour: 0,
          startTimeMin: 0,
          endTimeHour: 0,
          endTimeMin: 0,
        },
        timeSlot: false,
        // 全选
        // checkAll: false,
        // isIndeterminate: true,
        weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        checkedWeeks: [],
        strategyTemp: {
          transPowerSTemp: 26,
          failPowerSTemp: 26,
          callbackSTemp: 26,
          transPowerWTemp: 26,
          failPowerWTemp: 26,
          callbackWTemp: 26,
        },
      }
    },
    methods: {
      changeRadio () {
        console.log(this.strategyTime.radio)
        if (this.strategyTime.radio === '2') {
          this.timeSlot = true
        } else {
          this.timeSlot = false
        }
      },

      // 全选
      // handleCheckAllChange (val) {
      //   this.checkedCities = val ? cityOptions : []
      //   this.isIndeterminate = false
      // },

      handleCheckedCitiesChange (value) {
        console.log(value)
      },

      handleChange (value) {
        console.log(value)
      },
    }
  }
</script>

<style scoped>
  .strategyName {
    margin: 10px auto;
    width: 280px;
  }

  .strategyName >>> .el-form-item__label {
    font-size: 17px;
  }

  .strategyName >>> .el-input__inner {
    width: 200px;
    height: 32px;
  }

  .el-dialog__wrapper >>> .el-input__inner {
    border: 1px solid #BBB;
  }

  .titleBoundary {
    position: relative;
    margin: 20px auto 27px;
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

  .titleBoundary >>> .el-input__inner {
    height: 28px;
  }

  .manageTime, .manageTemp {
    font-size: 14px;
    padding: 19px 0 12px 43px;
  }

  .manageTime div {
    margin-bottom: 0;
  }

  .selectWeeks >>> .el-form-item__content {
    padding-top: 10px;
    line-height: 0;
  }

  .manageTime >>> .el-checkbox {
    margin-right: 15px;
  }

  .manageTime >>> .el-checkbox__label {
    padding: 0 0 10px 6px;
  }

  .manageTime >>> .el-input-number--mini, .manageTemp >>> >>> .el-input-number--mini {
    width: 80px;
  }

  .word {
    margin: 0 15px 0 5px;
  }

  .manageTemp {
    height: 115px;
    padding: 22px 17px 18px 13px;
  }

  .summerTemp {
    float: left;
  }

  .winterTemp {
    float: right;
  }

  .manageTemp >>> >>> .el-input-number--mini {
    margin: 0 4px 15px 8px;
  }
</style>
