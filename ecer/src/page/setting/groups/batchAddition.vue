<template>
  <el-dialog title="批量导入"
             top="150px"
             :visible.sync="batchAddition"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="closeModel"
             append-to-body>
    <hr class="boundary">
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
    <hr class="boundary">
    <div slot="footer" class="dialog-footer">
      <el-button class="download" type="warning" size="medium" @click="">模板下载</el-button>
      <el-button @click="closeModel">取消</el-button>
      <el-button type="primary" @click="">上传</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      batchAddition: Boolean
    },
    methods: {
      uploadSucc(res) {
        // res = res.msg;
        // this.successNum = res.successNum;
        // this.failNum = res.failNum;
        // if (this.failNum !== 0) {
        //   this.failList = true;
        // }
        // this.addList = res.lists;
        // this.$refs.upload.clearFiles();
      },

      // 批量导入获取模板位置
      // download() {
      //   if (this.curPath === '/List' || this.curPath === '/keyPersonList') {
      //     axios({
      //       method: "get",
      //       url: this.api1 + "/dist/static/file/baowei.xlsx",
      //       responseType: "arraybuffer"
      //     }).then(
      //       function (response) {
      //         let filename = "批量导入模板.xlsx";
      //         this.fileDownload(response.data, filename);
      //       }.bind(this)
      //     ).catch(
      //       function (error) {
      //         alert("网络请求出错");
      //       }.bind(this)
      //     );
      //   } else if (this.curPath === '/abnormalList') {
      //     axios({
      //       method: "get",
      //       url: this.api1 + "/dist/static/file/xinli.xlsx",
      //       responseType: "arraybuffer"
      //     }).then(
      //       function (response) {
      //         let filename = "批量导入模板.xlsx";
      //         this.fileDownload(response.data, filename);
      //       }.bind(this)
      //     ).catch(
      //       function (error) {
      //         alert("网络请求出错");
      //       }.bind(this)
      //     );
      //   }
      // },

      // 批量导入模板下载
      // fileDownload(data, fileName) {
      //   let blob = new Blob([data], {
      //     type: "application/octet-stream"
      //   });
      //   let filename = fileName || "filename.xls";
      //   if (typeof window.navigator.msSaveBlob !== "undefined") {
      //     window.navigator.msSaveBlob(blob, filename);
      //   } else {
      //     var blobURL = window.URL.createObjectURL(blob);
      //     var tempLink = document.createElement("a");
      //     tempLink.style.display = "none";
      //     tempLink.href = blobURL;
      //     tempLink.setAttribute("download", filename);
      //     if (typeof tempLink.download === "undefined") {
      //       tempLink.setAttribute("target", "_blank");
      //     }
      //     document.body.appendChild(tempLink);
      //     tempLink.click();
      //     document.body.removeChild(tempLink);
      //     window.URL.revokeObjectURL(blobURL);
      //   }
      // },

      closeModel () {
        this.batchAddition = false
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

  .bodyModal {
    margin: 0 26px;
    width: 90%;
  }

  /*上传*/
  .el-dialog__wrapper >>> .el-upload {
    margin: 15px 54px;
  }

  .download {
    float: left;
  }
</style>
