<template>
  <el-dialog
    title="全局配置"
    top="100px"
    :visible.sync="globalControl"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body>
    <hr class="boundary">
    <el-form :label-position="labelPosition" label-width="80px">
      <div class="titleBoundary">
        <div class="title">报警设置</div>
        <div class="manageData">
          <div class="highTemp">温度高于:
            <el-input-number v-model="strategyTemp.transPowerLowTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>温度低于:
            <el-input-number v-model="strategyTemp.TALowTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
        </div>
        <div class="manageElectric">
          <div class="highElectric">电流高于:
            <el-input-number v-model="strategyTemp.transPowerHighTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
          <div>电流低于:
            <el-input-number v-model="strategyTemp.TAHighTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
            度
          </div>
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">采集数据</div>
        <div class="manageData">数据采集间隔时间:
          <el-input-number v-model="strategyTemp.transPowerLowTemp" :precision="0" size="mini"
                           controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
          分钟
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">控制设置</div>
        <div class="manageData">控制指令重复次数:
          <el-input-number v-model="strategyTemp.transPowerLowTemp" :precision="0" size="mini"
                           controls-position="right" @change="handleChange" :min="5" :max="40"></el-input-number>
          次
        </div>
      </div>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        globalControl: true,
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
          transPowerLowTemp: 26,
          TALowTemp: 26,
          airLowTemp: '',
          transPowerHighTemp: 26,
          TAHighTemp: 26,
          airHighTemp: '',
        },
        options: [{'id': 1, 'name': '恒温制冷26度'}, {'id': 2, 'name': '恒温制冷27度'}, {'id': 3, 'name': '恒温制热20度'}],
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
      }
    }
  }
</script>

<style scoped>
  @import "/../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 470px;
  }

  .el-dialog__wrapper >>> .el-input__inner {
    border: 1px solid #BBB;
  }

  .titleBoundary {
    position: relative;
    margin: 20px auto 27px;
    width: 88%;
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

  .titleBoundary >>> .el-input-number--mini {
    width: 80px;
    margin: 0 4px 18px 10px;
  }

  .manageData {
    padding: 20px 19px 0;
  }

  .manageElectric{
    padding: 0 19px;
  }

  .highTemp,.highElectric {
    float: left;
    padding-right: 20px;
  }
</style>
