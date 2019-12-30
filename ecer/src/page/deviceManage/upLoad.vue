<template>
  <div>
    <el-dialog
      title="批量导入"
      :visible.sync="showUpLoad"
      width="655px"
      @close="UpLoadClose"
      center
    >
      <el-dialog
        width="600px"
        title="校验详情"
        :visible.sync="innerLog"
        append-to-body
      >
        <div style="height:200px;overflow-y: scroll;">
          <ul>
            <li
              v-for="item in this.errorArrInfo"
              :class="{
                errorStyle: item[item.length - 1] == '法',
                successStyle: item[item.length - 1] == '过'
              }"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div slot="footer" class="dialog-footer">
          <span
            style="color:#E6A23C;font-size:10px;display:inline-block;float:left"
            >*若存在不合法数据，请您根据提示修改，否则无法导入</span
          >
          <el-button @click="innerLog = false">取 消</el-button>
          <el-button type="primary" @click="innerLog = false">确定</el-button>
        </div>
      </el-dialog>

      <div class="content">
        <span
          >提示：请您根据系统提供的文件模版进行填充
          <a href="http://172.16.211.75:8080/devices-template.csv" class="downFile">下载模版</a></span
        >
        <el-upload
          style="margin:30px 0 0 0 "
          class="upload-demo"
          ref="upload"
          action="*"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="successUploadCallBack"
          :on-error="errorUploadCallBack"
          :on-change="selectFile"
          :file-list="fileList"
          :limit="1"
          :auto-upload="false"
          accept=".csv"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            @click="selectFileBtnClick"
            >选取文件</el-button
          >
          <!-- <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            >上传</el-button
          > -->
          <div slot="tip" style="margin:25px 0 0 0" class="el-upload__tip">
            只能上传csv文件，且每次只能上传单个文件
          </div>
          <div v-show="isExport"><el-progress :percentage="percentage" :width="100"status="success"></el-progress></div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    showUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExport:false,
      percentage:0,
      innerLog: false, //日志弹窗
      checkNum: 0, //监测已监测行数，若行数达到解析数组长度，则检测完成
      errorArrInfo: [], //数据检验，错误信息收集容器
      fileList: [],
      requestArr: [],
      objArr: [] //解析文件后构造数据结构
    };
  },
  methods: {
    selectFileBtnClick() {
      console.log("选取文件按钮");
      this.errorArrInfo = []
      this.$refs.upload.clearFiles();
    },
    UpLoadClose() {
      this.$emit("exportClose");
    },
    cancle() {
      this.$emit("exportClose");
    },
    confirm() {
      if (this.requestArr.length != this.objArr.length || this.requestArr.length == 0) {
        this.$message({
          message: "您选择的文件未通过校检(或未提交文件)，不允许提交,请根据校检详情修改后提交",
          type: "warning"
        });
      }else{
       
        let len = this.requestArr.length
        console.log(this.requestArr)
        let count = 0
        this.isExport = true
        for (let i = 0; i < len; i++) {
          
       let params = this.requestArr[i]
      $.ajax({
        type: "POST",
        url: this.api + "devices",
        data: JSON.stringify(params),
        contentType: "application/json",
        success: data => {
          count ++ 
          this.percentage = count/len * 100
          if(this.percentage == 100){
            this.$message({
              message:"导入成功",
              type:"success"
            })  
            setTimeout(()=>{
              this.showUpLoad = false 
            },1000)       }
        },
        error: () => {
          
        }
      });}
      }
      // this.$emit("exportClose");
      // this.submitUpload()
    },
    successUploadCallBack() {
      console.log("上传成功");
    },
    errorUploadCallBack() {
      console.log("上传失败");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("移除文件");
      this.objArr = [];
    },
    handlePreview(file) {
      console.log(file);
    },
    selectFile(file) {
      console.log(file.raw);
      this.getFileContent(file.raw);
    },

    getFileContent(file) {
      //解析文件
      let that = this; //获取vue中的this，赋值给that
      if (file && file.size > 0) {
        //判断文件是否为空
        var result; //文件解析结果
        var resultArr = []; //文件解析后数组容器
        var keyArr; //构造对象的键值容器
        var objArr = []; //构造对象容器
        var reader = new FileReader();
        reader.readAsText(file, "gbk");
        reader.onload = function(e) {
          result = this.result.split("\r\n"); //分割解析文件转化为数组
          result.forEach(item => {
            resultArr.push(item.split(","));
          });

          keyArr = [
            "school",
            "building",
            "floor",
            "room",
            "brand",
            "type",
            "code",
            "ip",
            "port",
            "name"
          ];
          resultArr.splice(0, 1); //key值数组
          for (let i = 0; i < resultArr.length - 1; i++) {
            //遍历数组构造目标数据结构
            that.objArr.push(that.constructObj(keyArr, resultArr, i)); //根据表格每一行构造的对象添加进数组中
          }
          console.log(that.objArr);
          that.checkData(that.objArr);
        };
      }
    },
    constructObj(headArr, bodyArr, i) {
      //构造解析后的数据结构
      let obj = {};
      for (let k = 0; k < headArr.length; k++) {
        obj[headArr[k]] = bodyArr[i][k];
      }
      return obj;
    },
    checkData(arr) {
      //校验数据合法性
      this.checkNum = 0;
      this.errorArrInfo = [];
      var isSpaceObj = this.checkDataIsSpace(arr); //验证是否存在空字段
      if (isSpaceObj.isSpace) {
        //判断文件文件是否存在空数据
        //验证数据的有效性
        // var k = 1;
        var obj = {};
        var buildId = "";
        for (let k = 0; k < arr.length; k++) {
          this.publicAxios(`schoolZones/${arr[k].school}/buildings`)
            .then(data => {
              // for (let i = 0; i < data.length; i++) {
              let flag = data.some((item, index) => {
                return item.name == arr[k].building;
              });
              let index;
              if (flag) {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].name == arr[k].building) {
                    index = i;
                  }
                }
                buildId = data[index].id;
                // console.log(`第${k+1}行楼栋校验通过`);
                return data[index];
              } else {
                return false;
              }
            })
            .then(data => {
              if (data) {
                this.publicAxios(`buildings/${data.id}/floors`)
                  .then(data => {
                    if (data) {
                      if (arr[k].floor < data) {
                        // console.log("楼层校验通过");
                        return { floorId: arr[k].floor, buildId: buildId };
                      } else {
                        return false;
                      }
                    }
                  })
                  .then(data => {
                    if (data) {
                      this.publicAxios(`rooms/${data.buildId}/${data.floorId}`)
                        .then(data => {
                          let flag2 = data.some((item, index) => {
                            return item.name == arr[k].room;
                          });
                          let index2;
                          if (flag2) {
                            for (let i = 0; i < data.length; i++) {
                              if (data[i].name == arr[k].room) {
                                index2 = i;
                              }
                            }
                            obj.roomId = data[index2].id;
                            // console.log("教室校验通过");
                            return data[index2];
                          } else {
                            return false;
                          }
                        })
                        .then(data => {
                          if (data) {
                            this.publicAxios(`models/brands`)
                              .then(data => {
                                // console.log(data);
                                for (let i = 0; i < data.length; i++) {
                                  if (data.indexOf(arr[k].brand) > -1) {
                                    // console.log("品牌校验通过");
                                    return arr[k].brand;
                                  } else {
                                    return false;
                                  }
                                }
                              })
                              .then(data => {
                                if (data) {
                                  this.publicAxios(`/models/${data}`)
                                    .then(data => {
                                      console.log("--------");
                                      // console.log(data);
                                      let flag3 = data.some((item, index) => {
                                        return item.modelName == arr[k].type;
                                      });
                                      let index3;
                                      if (flag3) {
                                        for (let i = 0; i < data.length; i++) {
                                          if (
                                            data[i].modelName == arr[k].type
                                          ) {
                                            index3 = i;
                                          }
                                        }
                                        obj["modelId"] = data[index3].id;
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    })
                                    .then(data => {
                                      if (data) {
                                        let ipRegExp = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/;
                                        let codeRegExp = /^\d{2}$/;
                                        if (
                                          ipRegExp.exec(arr[k].ip) &&
                                          codeRegExp.exec(arr[k].code)
                                        ) {
                                          let portRegExp = /^\+?[1-9][0-9]*$/;
                                          if (portRegExp.test(arr[k].port)) {
                                            obj["port"] = arr[k].port;
                                            return true;
                                          } else {
                                            return false;
                                          }
                                        } else {
                                           console.log(
                                          `第${k +
                                            1}行存在不合法数据，至少端口号(限数字)或ip值(检查格式)或编号(限两位数字)不合法`
                                        );
                                        this.errorArrInfo.push(
                                          `第${k +
                                            1}行存在不合法数据，至少端口号(限数字)或ip(检查格式)值或编号(限两位数字)不合法`
                                        );
                                          return false;
                                        }
                                      } else {
                                        console.log(
                                          `第${k +
                                            1}行存在不合法数据，至少型号不合法`
                                        );
                                        this.errorArrInfo.push(
                                          `第${k +
                                            1}行存在不合法数据，至少型号不合法`
                                        );
                                        this.readFileControll(arr);
                                      }
                                    })
                                    .then(data => {
                                      //-----------------------检验通过执行域------------------------------------------
                                      if (data) {
                                        //验证通过

                                        obj["name"] = arr[k].name;
                                        obj["addressCode"] = arr[k].code;
                                        
                                         obj["ipAddress"] = arr[k].ip;
                                        this.requestArr.push(obj);
                                        console.log(` 第${k + 1}行验证通过`);
                                        this.errorArrInfo.push(
                                          ` 第${k + 1}行验证通过`
                                        );
                                        this.readFileControll(arr);
                                      } else {
                                       
                                        this.readFileControll(arr);
                                      }
                                    });
                                } else {
                                  console.log(
                                    `第${k +
                                      1}行存在不合法数据，至少品牌名称不合法`
                                  );
                                  this.errorArrInfo.push(
                                    `第${k +
                                      1}行存在不合法数据，至少品牌名称不合法`
                                  );
                                  this.readFileControll(arr);
                                }
                              });
                          } else {
                            console.log(
                              `第${k +
                                1}行存在不合法数据，至少楼层下教室名称不合法`
                            );
                            this.errorArrInfo.push(
                              `第${k +
                                1}行存在不合法数据，至少楼层下教室名称不合法`
                            );
                            this.readFileControll(arr);
                          }
                        });
                    } else {
                      console.log(
                        `第${k + 1}行存在不合法数据，至少楼栋下楼层数值不合法`
                      );
                      this.errorArrInfo.push(
                        `第${k + 1}行存在不合法数据，至少楼栋下楼层数值不合法`
                      );
                      this.readFileControll(arr);
                    }
                  });
              } else {
                console.log(
                  `第${k + 1}行存在不合法数据，至少校区下楼栋名不合法`
                );
                this.errorArrInfo.push(
                  `第${k + 1}行存在不合法数据，至少校区下楼栋名不合法`
                );
                this.readFileControll(arr);
              }
            });
        }
      } else {
        console.log(
          `表格中存在未完成字段,列表自动清空,至少有在${isSpaceObj.rowNum}行存在空数据`
        );
        this.errorArrInfo.push(
          `表格中存在未完成字段,列表自动清空,至少有在${isSpaceObj.rowNum}行存在空数据`
        );
      }
    },
    readFileControll(arr) {
      //监测每一行，无论成功或失败，会执行一次，每一行仅仅执行一次
      this.checkNum += 1;
      if (this.checkNum == arr.length) {
        console.log(this.errorArrInfo);
        this.errorArrInfo.sort((a, b) => {
          return a.replace(/[^0-9]/gi, "") - b.replace(/[^0-9]/gi, "");
        });
        console.log(this.requestArr);
        this.innerLog = true;
      }
    },
    checkDataIsSpace(arr) {
      //验证表格中的数据是否存在空值
      for (let i = 0; i < arr.length; i++) {
        if (
          Object.keys(arr[i]).every(key => {
            return arr[i][key] != "";
          })
        ) {
          return { isSpace: true, rowNum: i + 1 };
        } else {
          this.$refs.upload.clearFiles(); //如果存在空值，文件列表清空
          return { isSpace: false, rowNum: i + 1 };
        }
      }
    },
    publicAxios(urlString, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.api + urlString, { params: params })
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            reject("axios回调失败");
            return;
          });
      });
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
.errorStyle {
  color: #f56c6c;
  padding: 0 10px 5px 15px;
  font-size: 10px;
}
.successStyle {
  color: #409eff;
  padding: 0 10px 5px 15px;
  font-size: 10px;
}
</style>
