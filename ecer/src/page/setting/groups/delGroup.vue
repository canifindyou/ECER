<template>
  <div>
    <el-dialog title="删除"
               top="125px"
               :visible.sync="showDelGroup"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="body">
        <div class="tip">是否删除所选{{delGroupType}}</div>
        <div class="specialTip" v-show="specialTip">删除所选{{delGroupType}}将会删除该{{delGroupType}}下所有{{typeTip}}</div>
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="">删 除</el-button>
      </div>
    </el-dialog>

    <el-dialog title="错误提示"
               top="150px"
               :visible.sync="showDelTip"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :before-close="closeModel"
               append-to-body>
      <hr class="boundary">
      <div class="cannotDel">该分组下还存在设备，请将设备删除或更换分组后再进行删除</div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      // 判断修改内容
      delGroupType: String,
      // 打开弹窗
      delGroup: Boolean,
      deviceNum: Number
    },
    data () {
      return {
        deviceCount: 0,
        showDelGroup: false,
        showDelTip: false,
        specialTip: false,
        typeTip: ''
      }
    },
    methods: {
      closeModel () {
        this.showDelTip = false
        this.showDelGroup = false
        this.$emit('closeModel')
      }
    },
    watch: {
      delGroupType: function (newVal) {
        if (newVal === '校区') {
          this.specialTip = true
          this.typeTip = '楼栋及教室'
        } else if (newVal === '楼栋') {
          this.specialTip = true
          this.typeTip = '教室'
        } else {
          this.specialTip = false
        }
      },

      deviceNum: function (newVal) {
        this.deviceCount = newVal
      },

      delGroup: function (newVal) {
        if (this.deviceCount === 0) {
          this.showDelTip = newVal
        } else {
          this.showDelGroup = newVal
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";
  .el-dialog__wrapper >>> .el-dialog {
    width: 430px;
  }

  .body {
    position: relative;
    height: 150px;
    text-align: center;
  }

  .tip {
    line-height: 150px;
    font-size: 23px;
    letter-spacing: 1px;
  }

  .specialTip {
    position: absolute;
    top: 93px;
    /*left: 10px;*/
    left: 5%;
    right: 5%;
    margin: 0 auto;
    font-size: 16px;
    color: red;
  }

  .cannotDel {
    margin: auto;
    width: 90%;
    padding: 50px 0;
    text-align: center;
    font-size: 22px;
    letter-spacing: 1.5px;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }
</style>
