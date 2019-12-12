<template>
  <el-dialog
    title="选择品牌型号"
    top="150px"
    :visible.sync="chooseBrand"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <div class="body">
      <span class="demonstration">请选择需要添加指令模板的名称</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <div class="bodyModal">
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          action="http://172.16.211.152/sbkp/census/uploadExcel"
          :auto-upload="false"
          :on-success="uploadSucc"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button class="download" type="warning" size="medium" @click="">模板下载</el-button>
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      chooseBrand: Boolean
    },
    data () {
      return {
        options: [{
          value: '1',
          label: '美的',
          children: [{
            value: '1',
            label: '一匹',
          }, {
            value: '2',
            label: '二匹'
          }, {
            value: '3',
            label: '二匹'
          }, {
            value: '4',
            label: '三匹'
          }, {
            value: '5',
            label: '二匹'
          }, {
            value: '6',
            label: '二匹'
          }]
        },{
          value: '2',
          label: '格力',
          children: [{
            value: '1',
            label: '一匹',
          }, {
            value: '2',
            label: '二匹'
          }]
        }]
      }
    },
    methods: {
      closeModel () {
        this.chooseBrand = false
        this.$emit('closeModel')
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 520px;
  }

 .body{
   margin: 30px auto 15px;
   width: 95%;
   text-align: center;
   font-size: 18px;
 }

  .el-dialog__wrapper >>> .el-input__inner {
    margin: 20px 0 15px;
    height: 32px;
    border: 1px solid #BBB;
  }

  .el-button {
    margin: 0 0 0 10px;
    border-radius: 8px;
    font-size: 15px;
    padding: 10px 20px;
  }

  /*上传*/
  .el-dialog__wrapper >>> .el-upload {
    margin: 15px 54px;
  }

  .download {
    float: left;
  }
</style>
