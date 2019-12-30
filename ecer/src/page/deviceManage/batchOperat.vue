<template>
  <el-dialog
    title="批量管理"
    :visible.sync="showBatch"
    width="655px"
    @close="batchOperatClose"
    center
  >
    <!-- :close-on-click-modal="false"
    :show-close="false" -->
    <!-- :before-close="handleClose" -->

    <el-dialog width="520px" title="设置" :visible.sync="inner" append-to-body>
      <div class="radiotabBox">
        <template>
          <el-radio v-model="radio" label="控制项">控制项</el-radio>
          <el-radio v-model="radio" label="定时设置">定时设置</el-radio>
          <el-radio v-model="radio" label="自控设置">自控设置</el-radio>
          <el-radio v-model="radio" label="继电器设置">继电器设置</el-radio>
        </template>
      </div>

      <div style="overflow:hidden;position:relative">
        <div class="tabBoxContent " v-show="radio == '控制项'">
          <div class="selectItemBox">
            控制项：<el-select
              v-model="controlItem"
              placeholder="请选择"
              size="small"
              style="width:150px;"
            >
              <el-option
                v-for="item in control"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="tabBoxContent " v-show="radio == '定时设置'">
          <!-- <span class="headText">定时控制</span> -->

          <div class="contentText selectItemTimer">
            <div class="selectItemBox2">
              控制项：
              <el-select
                v-model="controlItem"
                placeholder="请选择"
                size="mini"
                style="width:150px;"
              >
                <el-option
                  v-for="item in control"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="contentText timerItem">
            <div class="block" style="margin-top:15px">
              开始时：
              <el-date-picker
                v-model="startTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="开始时间"
                size="mini"
                :picker-options="pickerOptions"
                @change="initOptions2"
              >
              </el-date-picker>
            </div>
            <div class="block" style="margin-top:15px">
              结束时：
              <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="结束时间"
                size="mini"
                format="yyyy-MM-dd HH:mm"
                :picker-options="pickerOptions2"
              >
              </el-date-picker>
            </div>
          </div>

          <div class="contentText checkTimer">
            校准时间
            <div class="contentText selectItemTimer">
              <div>
                控制项：
                <el-select
                  v-model="controlItem"
                  placeholder="请选择"
                  size="mini"
                  style="width:150px;"
                >
                  <el-option
                    v-for="item in control"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div class="tabBoxContent " v-show="radio == '自控设置'">
          <div class="selectItemBox">
            自控状态：<el-select
              v-model="controlselfItem"
              placeholder="请选择"
              size="small"
              style="width:150px;"
            >
              <el-option
                v-for="item in controlself"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="tabBoxContent " v-show="radio == '继电器设置'">
          <div class="selectItemBox">
            <!-- 继电器控制：<el-switch
              v-model="switchAll"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch> -->
            继电器控制：<el-select
              v-model="controlJdItem"
              placeholder="请选择"
              size="small"
              style="width:150px;"
            >
              <el-option
                v-for="item in controlJd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <p style="color:red;padding:20px 0 10px 0">
              提示：对多个设备执行该操作时，将关闭所有设备的自控状态
            </p>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <span
          style="display:inline-block;float:left;text-align:center;color:red;font-size: 5px"
          >* 提交 {{ radio }} 将生效</span
        >
        <el-button @click="innerCancle">取 消</el-button>
        <el-button type="primary" @click="innerConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="selectBatchBox">
      <div class="commonBox boxLeft">
        <span class="boxHead">分组</span>
        <div class="boxContent">
          <el-tree
            :props="props"
            :load="loadNode"
            @node-expand="selectItemLoadData"
            lazy
            @node-click="handleNodeClick"
            style="padding-left:0"
            :highlight-current="true"
            :accordion="true"
          >
            <!-- @node-collapse="cleanSelectdate"    lazy -->
            <!-- @check-change="handleCheckChange" -->
          </el-tree>
        </div>
      </div>
      <div class="commonBox boxCenter">
        <span class="boxHead">选择</span>

        <div class="boxContent">
          <span class="emptyText" v-if="selectData.length === 0">暂无数据</span>
          <template v-else>
            <el-checkbox
              style="padding:0 0 0 10px"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 5px 0;"></div>
            <el-checkbox-group
              v-model="checkedItem"
              @change="handleCheckedCitiesChange($event)"
            >
              <p>
                <el-checkbox
                  style="display:block;padding:10px 0 0 20px;text-align:left;margin:0"
                  v-for="item in selectData"
                  :label="item.label"
                  :key="item.key"
                  >{{ item.name }}</el-checkbox
                >
              </p>
              <!-- @change="singleCheckBoxChange($event, item)" -->
            </el-checkbox-group>
          </template>
        </div>
      </div>
      <div class="commonBox boxRight">
        <span class="boxHead">已选</span>
        <div class="boxContent">
          <span class="emptyText" v-if="selectDeviceList.length === 0"
            >暂无数据</span
          >
          <ul class="deviceList" v-else>
            <li
              class="deviceListItem"
              v-for="(item, index) in selectDeviceList"
              :key="index"
            >
              <span class="deviceListItem_text">{{ item.text }}</span>
              <span class="deviceListItem_del ">
                <i
                  class="el-tag__close el-icon-close del-tag"
                  @click="deleteDeviceItem(index, item.deleteId)"
                ></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="outConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  props: {
    showBatch: {
      type: Boolean,
      defulault: false
    }
  },
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      controlselfItem: "", //自控状态值
      controlself: [
        { value: 0, label: "关闭" },
        { value: 1, label: "开启" }
      ],
      controlJdItem: "",
      controlJd: [
        { value: 0, label: "闭合" },
        { value: 1, label: "断开" }
      ],
      flag2: "", //校区id
      pickerOptions2: {},
      buildFlag: "", //动态标记楼栋id
      startTime: "",
      endTime: "",
      inner: false, //内层弹窗控制
      deviceIds: [], //已选设备id数组
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      selectData: [], //批量管理弹窗选择框数据
      checkAll: false,
      checkedItem: [], //复选框选择数据
      isIndeterminate: true,
      allOptions: [], //点击全选按钮，要选择的数据，和所有数据相同
      checkAllBtn: false,
      count: 0,
      selectDeviceList: [], //已选设备列表中间储存
      selectDeviceListBox: [], //已选设备最终储存
      radio: "定时设置",
      control: [],
      controlItem: "",
      selectTime: "",
      switchAll: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      }
    };
  },
  watch: {
    radio() {
      console.log(this.radio);
    }
  },
  methods: {
    initOptions2($event) {
      //设置结束时间时间范围

      this.pickerOptions2 = {
        disabledDate(time) {
          return time.getTime() < $event.getTime() - 8.64e7 + 1;
        }
      };
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    batchOperatClose() {
      //弹窗关闭事件
      this.$emit("batchOperatClose"); //事件分发
    },
    cancle() {
      //取消按钮事件

      this.$emit("batchOperatClose"); //事件分发
    },
    innerCancle() {
      //内层cancle
      this.inner = false;
    },
    outConfirm() {
      //确定按钮事件
      //   this.$emit("batchOperatClose"); //事件分发
      this.inner = true;
      this.deviceIds = [];
      this.selectDeviceList.forEach(item => {
        this.deviceIds.push(item.id);
      });
      console.log(this.deviceIds);
      this.getControlItem();
    },
    messageSuccess() {
      this.$message({
        showClose: true,
        message: "操作成功",
        type: "success"
      });
    },
    messageErr() {
      this.$message({
        showClose: true,
        message: "操作失败，请检查网络",
        type: "error"
      });
    },
    innerConfirm() {
      //内层弹窗确定按钮事件
      this.inner = false;
      this.$emit("batchOperatClose");
      switch (this.radio) {
        case "控制项":
          this.pubilcFnAxios("devices/perform", {
            ids: this.deviceIds.toString(),
            itemName: this.controlItem
          })
            .then(data => {
              console.log(data);
            })
            .catch(() => {
              console.log("批量控制项执行失败");
            });
          break;
        case "定时设置":
          break;
        case "自控设置":
          break;
        case "继电器设置":
          break;
      }
    },
    handleCheckChange(data, checked, indeterminate) {},
    handleNodeClick(data, node) {
      //点击层级事件
      if (node.level === 3) {
        this.selectData = [];
        this.allOptions = [];

        this.pubilcFnAxios(`rooms/${this.flag}/${node.data.label}`)
          .then(data => {
            let arr = [];
            data.forEach(item => {
              arr.push({
                name: item.name,
                label:
                  "r" +
                  this.flag2 +
                  "r" +
                  this.flag +
                  "r" +
                  node.data.label +
                  "r" +
                  item.id
              }); //label 包含校区id + 楼栋id + r + 楼层id + 教室id
            });

            this.selectData = [];
            this.allOptions = [];

            this.buildSelectDate(arr);
          })
          .catch(() => {
            console.log("初始化树形结构请求出错");
          });
      }
      this.checkAll = this.findItem(this.selectData, this.checkedItem);
    },
    pubilcFnAxios(urlString, params) {
      //公用数据请求
      //公用axios数据请求
      return new Promise((resolve, reject) => {
        axios
          .get(this.api + urlString, { params: params })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject("get请求错误");
          });
      });
    },
    pubilcFnAxiosDevice(urlString, params) {
      //公用数据请求
      //公用axios数据请求
      return new Promise((resolve, reject) => {
        axios
          .get(this.api + urlString, { params: params })
          .then(res => {
            resolve(res.data.list);
          })
          .catch(err => {
            reject("get请求错误");
          });
      });
    },
    loadNode(node, resolve) {
      //点击层级加载子层级的数据
      let schoolId = [];
      if (node.level == 0) {
        this.pubilcFnAxios("schoolZones", {})
          .then(data => {
            let arr = [];
            data.forEach(item => {
              arr.push({ name: item.name, label: item.id });
            });

            return resolve(arr, arr);
          })
          .catch();
      }
      if (node.level > 4) return resolve([]);
      setTimeout(() => {
        if (node.level == 1) {
          //文津校区子菜单加载数据
          this.pubilcFnAxios("buildings", { zoneId: node.data.label })
            .then(data => {
              let arr = [];
              data.forEach(item => {
                arr.push({ name: item.name, label: item.id });
              });

              return resolve(arr); //返回数组作为数据填充
            })
            .catch(() => {
              console.log("初始化树形结构请求出错");
            });
        }
        if (node.level == 2) {
          //楼栋子菜单加载数据
          this.flag = node.data.label;
          this.pubilcFnAxios(`buildings/${node.data.label}/floors`)
            .then(data => {
              let arr = [];
              for (let i = 1; i < data + 1; i++) {
                //根据返回楼层数，创建楼层
                arr.push({ name: i + "层", label: i, leaf: true });
              }
              return resolve(arr);
            })
            .catch(() => {
              console.log("初始化树形结构请求出错");
            });
        }
        if (node.level == 3) {
          //楼层子菜单加载数据
          this.pubilcFnAxios(`rooms/${this.flag}/${node.data.label}`)
            .then(data => {
              let arr = [];
              data.forEach(item => {
                arr.push({ name: item.name, label: item.id, leaf: true });
              });

              return resolve(arr);
            })
            .catch(() => {
              console.log("初始化树形结构请求出错");
            });
        }
      }, 500);
    },

    selectItemLoadData(node, date) {
      // 展开层级，加载
      // 选择层级，展示可选择的数据，填充数据功能

      if (date.level == 2) {
        //楼栋层级展开时，需要将楼栋id值保存
        this.flag = date.data.label;
      }
      if (date.level == 1) {
        //文津校区子菜单加载数据
        this.flag2 = date.data.label; //校区id
        this.pubilcFnAxios("buildings", { zoneId: date.data.label })
          .then(data => {
            let arr = [];
            data.forEach(item => {
              arr.push({
                name: item.name,
                label: "l" + date.data.label + "l" + item.id
              });
            });
            console.log(arr);
            this.selectData = [];
            this.allOptions = [];

            this.buildSelectDate(arr);
          })
          .catch(() => {
            console.log("初始化树形结构请求出错");
          });
      }
      if (date.level == 2) {
        //楼栋子菜单加载数据
        this.flag = date.data.label; //当前楼栋id
        this.pubilcFnAxios(`buildings/${date.data.label}/floors`)
          .then(data => {
            let arr = [];
            for (let i = 1; i < data + 1; i++) {
              //根据返回楼层数，创建楼层
              arr.push({
                name: i + "层",
                label: "f" + this.flag2 + "f" + date.data.label + "f" + i,
                id: i
              });
            }
            console.log(arr);

            this.selectData = [];
            this.allOptions = [];

            this.buildSelectDate(arr);
          })
          .catch(() => {
            console.log("初始化树形结构请求出错");
          });
      }
      if (date.level == 3) {
        //楼层子菜单加载数据
      }
      // this.id = node.id;

      console.log(this.checkAll);
    },
    buildSelectDate(data) {
      // 测试函数，动态改变选择框中的数据

      let len = data.length;
      for (let i = 0; i < len; i++) {
        this.selectData.push(data[i]);
        this.allOptions.push(data[i].label);
      }
      this.checkAll = this.findItem(this.selectData, this.checkedItem);
      console.log(this.selectData);
      console.log("----------------------------");
      console.log(this.checkedItem);
    },
    cleanSelectdate() {
      //弹窗关闭，清空选择框中数据
      this.selectData = [];
      this.allOptions = [];
    },
    findItem(selectData, updateDate) {
      //判断已经选中的数组中是否包含更新的所有数据，判断全选按钮是否勾选
      let flag = selectData.every(item => {
        return updateDate.indexOf(item.label) >= 0;
      });
      return flag;
    },

    handleCheckAllChange(val) {
      //全选按钮事件
      if (val) {
        this.allOptions.forEach(item => {
          let index = this.checkedItem.indexOf(item); //查找选择的数组中是否已存在该数据
          if (index < 0) {
            this.checkedItem.push(item); //防止单选之后操作多选，增加重复数据
          }
        });
      } else {
        this.allOptions.forEach(item => {
          //点击全不选，清除数据
          let index = this.checkedItem.indexOf(item);
          if (index >= 0) {
            this.checkedItem.splice(index, 1);
          }
        });
      }
      this.construtDeviceList(this.checkedItem);
      this.isIndeterminate = false;
      console.log(val);
    },
    handleCheckedCitiesChange(value) {
      //单选按钮事件
      console.log("单选");
      let checkedCount = value.length;
      this.checkAll = this.findItem(this.selectData, this.checkedItem);
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.selectData.length;
      console.log(value);
      //测试数据，仅仅针对楼栋
      this.construtDeviceList(value);
    },
    addItem(centerArr, lastArr) {
      //将加载的数据储存数组中（已选设备数据）
      centerArr.forEach(item => {
        lastArr.unshift(item);
      });
    },
    construtDeviceList(secondArr) {
      //构造已选择设备列表
      if (secondArr.length === 0) {
        this.selectDeviceList = [];
      } else {
        let arr = [];
        for (let j = 0; j < secondArr.length; j++) {
          if (secondArr[j][0] == "l") {
            let str = secondArr[j].split("l");
            this.pubilcFnAxiosDevice(`devices/${str[1]}/${str[2]}`).then(
              data => {
                data.forEach(item => {
                  arr.push({
                    id: item.id,
                    text: item.name,
                    roomId: item.room_id,
                    buildId: item.model_id,
                    deleteId: "l" + this.flag2 + "l" + item.model_id
                  });
                });

                let obj = {};
                this.selectDeviceList = arr.reduce((cur, next) => {
                  obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
                  return cur;
                }, []);
                console.log(this.selectDeviceList);
              }
            );
          }
          if (secondArr[j][0] == "f") {
            let str = secondArr[j].split("f");
            this.pubilcFnAxiosDevice(
              `devices/${str[1]}/${str[2]}/${str[3]}`
            ).then(data => {
              data.forEach(item => {
                arr.push({
                  id: item.id,
                  text: item.name,
                  roomId: item.room_id,
                  buildId: item.model_id,
                  deleteId:
                    "l" +
                    this.flag2 +
                    "l" +
                    item.model_id +
                    "f" +
                    this.flag2 +
                    "f" +
                    item.model_id +
                    "f" +
                    str[3]
                });
              });

              let obj = {};
              this.selectDeviceList = arr.reduce((cur, next) => {
                obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
                return cur;
              }, []);
              console.log(this.selectDeviceList);
            });
          }
          if (secondArr[j][0] == "r") {
            let str = secondArr[j].split("r");
            this.pubilcFnAxiosDevice(
              `devices/${str[1]}/${str[2]}/${str[3]}`
            ).then(data => {
              data.forEach(item => {
                arr.push({
                  id: item.id,
                  text: item.name,
                  roomId: item.room_id,
                  buildId: item.model_id,
                  deleteId:
                    "l" +
                    this.flag2 +
                    "l" +
                    item.model_id +
                    "f" +
                    this.flag2 +
                    "f" +
                    item.model_id +
                    "f" +
                    str[3]
                });
              });

              let obj = {};
              this.selectDeviceList = arr.reduce((cur, next) => {
                obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
                return cur;
              }, []);
              console.log(this.selectDeviceList);
            });
          }
        }

        // this.addItem(arr, this.selectDeviceList);
      }
    },
    deleteDeviceItem(index, flag) {
      this.selectDeviceList.splice(index, 1); //删除设备节点
      /* 查询设备列表中是否包含该楼栋下的设备 */
      let isCloudeId = this.selectDeviceList.some(item => {
        return (
          item.deleteId.indexOf(flag) > -1 || flag.indexOf(item.deleteId) > -1
        );
      });
      if (!isCloudeId) {
        this.checkedItem.splice(this.checkedItem.indexOf(flag), 1);
        this.checkAll = this.findItem(this.selectData, this.checkedItem);
      }
    },
    singleCheckBoxChange(el, name) {
      //点击单个复选框触发事件
      if (!el) {
        let index = this.selectDeviceList.indexOf(name);
        this.selectDeviceList.splice(index, 1);
        this.construtDeviceList(this.selectDeviceList);
      }
    },
    getControlItem() {
      this.control = [];
      this.pubilcFnAxios("items")
        .then(data => {
          data.forEach(item => {
            this.control.push({ value: item, label: item });
          });
        })
        .catch(() => {
          console.log("控制项数据请求失败");
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.selectBatchBox {
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.selectBatchBox .commonBox {
  width: 150px;
  height: 300px;
  border: 1px #eee solid;
  border-radius: 5px;
  margin-left: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
::-webkit-scrollbar {
  width: 5px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  /* -webkit-box-shadow:inset006pxrgba(0,0,0,0); */
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0);
}
.selectBatchBox .boxLeft {
}
.selectBatchBox .boxCenter {
}
.selectBatchBox .boxRight {
}
.selectBatchBox .commonBox .boxHead {
  display: inline-block;
  width: 100%;
  text-align: center;
  height: 25px;
  border-bottom: 1px solid #000;
  line-height: 25px;
  border-radius: 5px 5px 0 0;
  background: #eee;
}
.selectBatchBox .commonBox .boxContent {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 274px;
  position: relative;
}
.selectBatchBox .commonBox .boxContent .emptyText {
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 50%;
  transform: translateY(10px);
  color: #ddd;
}
.selectBatchBox .commonBox .boxContent .deviceList {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.selectBatchBox .commonBox .boxContent .deviceList .deviceListItem:hover {
  background: #e4e7ed;
}
.selectBatchBox .commonBox .boxContent .deviceList .deviceListItem {
  background-color: #ecf5ff;
  border-color: rgba(0, 0, 0, 0.04);
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  width: 100%;
  margin: 2px 0 0 0;
}
.selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del {
  display: inline-block;
  float: right;
}
.selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_text {
  display: inline-block;
  padding: 0 0 0 5px;
}
.selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del
  .del-tag {
  cursor: pointer;
}
.selectBatchBox
  .commonBox
  .boxContent
  .deviceList
  .deviceListItem
  .deviceListItem_del
  .del-tag:hover {
  color: red;
}
.tabBoxContent {
  text-align: center;
  padding: 10px 0 0 0;
  width: 100%;
  height: 157px;
  overflow: hidden;
  /* background: #eee; */
  display: inline-block;
  /* overflow: hidden; */
  position: relative;
}
.tabBoxContent.v-leave {
  transform: translateX(-100%);
}
.tabBoxContent.v-leave-active {
  transition: all 0.6s;
  position: absolute;
  opacity: -1;
  color: #fff;
}
.tabBoxContent.v-leave-to {
  transform: translateX(-100%);
}
.tabBoxContent.v-enter {
  transform: translateX(-100%);
}
.tabBoxContent.v-enter-active {
  transition: all 0.6s;
}
.tabBoxContent.v-enter-to {
  transform: translateX(-100%);
}
.tabBoxContent .selectItemBox {
  margin-top: 60px;
  height: 100%;
  width: 100%;
}
.tabBoxContent .headText {
}
.tabBoxContent .timerItem {
}
.tabBoxContent .selectItemTimer {
  margin: 5px 0 5px 0;
}
.tabBoxContent .checkTimer {
  margin-top: 15px;
  color: #409eff;
  cursor: pointer;
}
.radiotabBox {
  text-align: center;
  border-bottom: #eee 1px solid;
  padding: 0 0 10px 0;
}
.el-icon-arrow-right {
  display: none;
}
.selectItemBox2 {
  margin: 0 0 0 -68px;
}
</style>
