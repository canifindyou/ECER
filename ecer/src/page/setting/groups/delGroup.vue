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
<!--        <div class="specialTip" v-show="specialTip">删除所选{{delGroupType}}将会删除该{{delGroupType}}下所有{{typeTip}}</div>-->
      </div>
      <hr class="boundary">
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModel">关 闭</el-button>
        <el-button type="danger" @click="delClick">删 除</el-button>
      </div>
    </el-dialog>

<!--    <el-dialog title="错误提示"-->
<!--               top="150px"-->
<!--               :visible.sync="showDelTip"-->
<!--               :close-on-press-escape="false"-->
<!--               :close-on-click-modal="false"-->
<!--               :before-close="closeModel"-->
<!--               append-to-body>-->
<!--      <hr class="boundary">-->
<!--      <div class="cannotDel">该分组下还存在子分组或设备，请将分组置为空再进行删除</div>-->
<!--&lt;!&ndash;      <div class="cannotDel">该分组下还存在设备，请将设备删除或更换分组后再进行删除</div>&ndash;&gt;-->
<!--      <hr class="boundary">-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="closeModel">关 闭</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>

  export default {
    props: {
      // 判断修改内容
      delGroupType: String,
      // 打开弹窗
      delGroup: Boolean,
      delId: Number,
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
      delClick () {
        let self = this
        if (this.delGroupType === '校区') {
          $.ajax({
            type: 'DELETE',
            url: 'http://172.16.211.75:8080/schoolZones',
            data: {
              'id': this.delId
            },
            success (data) {
              let abc = {"code":1, "reason":"Internal Exception"}
              console.log(data)
              console.log(data.code)
              console.log(abc.code)
              if (data.code===1){
                self.$message.error('请将该校区下所有分组删除后再进行该操作！');
              }else {
                self.$emit('getCampusesList')
                self.closeModel()
              }
            }
          })
        } else if (this.delGroupType === '楼栋') {
          $.ajax({
            type: 'DELETE',
            url: 'http://172.16.211.75:8080/buildings',
            data: {
              'id': this.delId
            },
            success (data) {
              self.$emit('selectBuilding')
              self.closeModel()
            }
          })
        } else {
          $.ajax({
            type: 'DELETE',
            url: 'http://172.16.211.75:8080/rooms',
            data: {
              'id': this.delId
            },
            success (data) {
              self.$emit('getCampusesList')
              self.closeModel()
            }
          })
        }
      },

      closeModel () {
        this.showDelTip = false
        this.showDelGroup = false
        this.$emit('closeModel')
      }
    },
    watch: {
      // delGroupType: function (newVal) {
      //   if (newVal === '校区') {
      //     this.specialTip = true
      //     this.typeTip = '楼栋及教室'
      //   } else if (newVal === '楼栋') {
      //     this.specialTip = true
      //     this.typeTip = '教室'
      //   } else {
      //     this.specialTip = false
      //   }
      // },

      // deviceNum: function (newVal) {
      //   this.deviceCount = newVal
      // },

      delGroup: function (newVal) {
        // if (this.deviceCount === 0) {// 无设备情况下
          this.showDelGroup = newVal
        // } else {
        //   this.showDelTip = newVal
        // }
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
