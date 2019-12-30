<template>
  <el-dialog
    title="批量导入模板"
    top="180px"
    :visible.sync="showChoose"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeModel"
    append-to-body>
    <hr class="boundary">
    <div class="body">
      <span class="demonstration">请选择需要添加指令模板的名称</span>
      <el-input v-model="formData.tempName" placeholder="请输入内容"></el-input>
      <div class="bodyModal">
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          name="part"
          :action="uploadUrl"
          :data={name:formData.tempName}
          :limit="1"
          :file-list="fileList"
          :on-success="onSuccess"
          :on-error="onError"
          :on-exceed="handleExceed"
          :multiple="false"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button class="download" type="warning" size="medium" @click="download">模板下载</el-button>
      <el-button @click="closeModel">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
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
        showChoose: false,
        fileList: [],
        uploadUrl: '',
        formData: {
          tempName: '',
        }
      }
    },
    methods: {
      // 下载模板
      download () {
        window.location.href = this.api + '/instructions-template.csv'
      },

      // 已存在上传文件
      handleExceed () {
        this.$message({
          message: '请将列表中的文件删除后再选择新的文件！',
          type: 'warning'
        })
      },

      // 文件上传成功
      onSuccess (res, file) {
        console.log(res)
        console.log(file)
        if (res === true) {
          this.$message({
            message: '模板上传成功！',
            type: 'success'
          })
          this.closeModel()
        } else if (res.status === 1) {//待改
          this.$message({
            message: '模板名不能为空！',
            type: 'warning'
          })
        } else if (res.status === 21) {
          this.$message({
            message: '该品牌型号的指令模板已上传，请上传正确的文件！',
            type: 'warning',
          })
        } else {
          this.$message.error('上传失败，请重试！')
        }
      },

      // 文件上传失败
      onError (res) {
        this.$message.error('上传失败，请重试！')
      },

      // 上传文件
      submitUpload () {
        this.uploadUrl = 'http://172.16.211.75:8080/templates/upload'
        this.$nextTick(() => {// 手动上传
          this.$refs.upload.submit()
        })
      },

      closeModel () {
        this.formData.tempName = ''
        this.fileList = []
        this.showChoose = false
        this.$emit('closeModel')
      }
    },
    watch: {
      chooseBrand (newVal) {
        this.showChoose = newVal
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/subModal.css";

  .el-dialog__wrapper >>> .el-dialog {
    width: 520px;
  }

  .body {
    margin: 20px auto 15px;
    width: 95%;
    text-align: center;
    font-size: 18px;
  }

  .el-dialog__wrapper >>> .el-input__inner {
    margin: 10px 0 10px;
    width: 50%;
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
    margin: 10px;
  }

  .el-dialog__wrapper >>> .el-upload-dragger {
    height: 150px;
  }

  .el-upload-dragger .el-icon-upload {
    margin: 34px 0 1px;
  }

  .download {
    float: left;
  }
</style>

<style>
  .el-message {
    min-width: 395px;
  }
</style>
