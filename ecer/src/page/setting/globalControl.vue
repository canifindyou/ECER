<template>
  <el-dialog
    title="全局配置"
    top="100px"
    :visible.sync="globalControl"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel">
    <hr class="boundary">
    <el-form :label-position="labelPosition" label-width="80px">
      <div class="titleBoundary">
        <div class="title">报警设置</div>
        <div class="manageData">
          <div class="highTemp">温度高于:
            <el-input-number v-model="controlData.highTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            度
          </div>
          <div>温度低于:
            <el-input-number v-model="controlData.lowTemp" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            度
          </div>
        </div>
        <div class="manageElectric">
          <div class="highElectric">电流高于:
            <el-input-number v-model="controlData.highElectric" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            A&nbsp;
          </div>
          <div>电流低于:
            <el-input-number v-model="controlData.lowElectric" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            A
          </div>
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">采集数据</div>
        <div class="manageData">数据采集间隔时间:
          <el-input-number v-model="controlData.selectDataTime" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          分钟
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">数据清理</div>
        <div class="manageData">清除
          <el-input-number v-model="controlData.clearDataTime" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          天以前的数据
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">控制设置</div>
        <div class="manageData">控制指令重复次数:
          <el-input-number v-model="controlData.orderTimes" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          次
        </div>
      </div>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
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
        controlData: {
          highTemp:0,
          lowTemp:0,
          highElectric: 0,
          lowElectric: 0,
          selectDataTime: 0,
          clearDataTime: 0,
          orderTimes:0
        },
      }
    },
    methods: {
      closeModel () {
        this.globalControl = false
        this.$emit('closeModel')
      },

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

  .manageElectric {
    padding: 0 19px;
  }

  .highTemp, .highElectric {
    float: left;
    padding-right: 20px;
  }
</style>
