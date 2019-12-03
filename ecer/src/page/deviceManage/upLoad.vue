<template>
  <div>
    <el-dialog
      title="批量导入"
      :visible.sync="showUpLoad"
      width="655px"
      @close="UpLoadClose"
      center
    >
      <div class="content">
        <span
          >提示：请您根据系统提供的文件模版进行填充
          <a href="" class="downFile">下载模版</a></span
        >
        <el-upload
        style="margin:30px 0 0 0 "
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="successUploadCallBack"
          :on-error="errorUploadCallBack"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            >上传</el-button
          >
          <div slot="tip" style="margin:25px 0 0 0" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    UpLoadClose() {
      this.$emit("exportClose");
    },
    cancle() {
      this.$emit("exportClose");
    },
    confirm() {
      this.$emit("exportClose");
      // this.submitUpload()
      
    },
    successUploadCallBack(){
      console.log("上传成功")
    },
    errorUploadCallBack(){
      console.log("上传失败")
    },
     submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
};
</script>

<style scoped>
.content {
  height: 200px;
  width: 100%;
  text-align: center;
}
.downFile {
  text-decoration: none;
}
</style>
