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
            <el-input-number v-model="controlData.maxT" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            度
          </div>
          <div>温度低于:
            <el-input-number v-model="controlData.minT" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            度
          </div>
        </div>
        <div class="manageElectric">
          <div class="highElectric">电流高于:
            <el-input-number v-model="controlData.minCurrent" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            A&nbsp;
          </div>
          <div>电流低于:
            <el-input-number v-model="controlData.maxCurrent" :precision="0" size="mini"
                             controls-position="right" @change="handleChange"></el-input-number>
            A
          </div>
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">采集数据</div>
        <div class="manageData">数据采集间隔时间:
          <el-input-number v-model="controlData.dataCollection" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          分钟
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">数据清理</div>
        <div class="manageData">清除
          <el-input-number v-model="controlData.dataClean" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          天以前的数据
        </div>
      </div>
      <div class="titleBoundary">
        <div class="title">控制设置</div>
        <div class="manageData">控制指令重复次数:
          <el-input-number v-model="controlData.instructTimes" :precision="0" size="mini"
                           controls-position="right" @change="handleChange"></el-input-number>
          次
        </div>
      </div>
    </el-form>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        globalControl: true,
        labelPosition: 'left',
        controlData: {},
      }
    },
    methods: {
      getControlData () {
        let self = this
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'globalConfig',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          success (data) {
            self.controlData = data[0]
          }
        })
      },

      submit () {
        let self = this
        $.ajax({
          type: 'PUT',
          url: this.api + 'globalConfig',
          // url: 'http://192.168.1.106:8080/globalConfig',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({
            'maxT': this.controlData.maxT,
            'minT': this.controlData.minT,
            'maxCurrent': this.controlData.maxCurrent,
            'minCurrent': this.controlData.minCurrent,
            'dataCollection': this.controlData.dataCollection,
            'dataClean': this.controlData.dataClean,
            'instructTimes': this.controlData.instructTimes
          }),
          success (data) {
            if (data === 1) {
              self.$message({
                message: '保存成功！',
                type: 'success'
              })
              self.closeModel()
            } else if (data === 0) {
              self.$message({
                message: '保存失败！',
                type: 'warning'
              })
            }
          }
        })
      },

      closeModel () {
        this.globalControl = false
        this.$emit('closeModel')
      },

      handleChange (value) {
        console.log(value)
      }
    },
    mounted () {
      this.getControlData()
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
    margin: 0;
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
