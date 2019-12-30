<template>
  <div>
    <div class="tableHead">
      <div class="tableHead-left">
        <i class="el-icon-refresh"></i>
        <el-button
          type="text"
          style="margin-left:20px"
          @click="centerDialogVisible = true"
          >添加设备</el-button
        >
        <el-button type="text" style="margin-left:20px" @click="batchOperat"
          >批量操作</el-button
        >
        <el-button type="text" style="margin-left:20px" @click="batchExport"
          >批量导入</el-button
        >
      </div>
      <div class="tableHead-right">
        <el-button
          size="mini"
          style="height: 30px;margin:auto 50px "
          @click="searchClick"
          >搜索</el-button
        >
        <template>
          <el-select
            v-model="selectfloorSearch"
            placeholder="请选择楼层"
            size="mini"
            style="width:120px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </div>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="expand"
          label="查看详情"
          width="78px"
          align="center"
          style="padding:0;height: 50px;"
        >
          <template slot-scope="props" style="padding:0">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
              style="padding:0;height: 40px;"
            >
              <el-form-item label="IP:">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="端口号:">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="编号:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="空调名称:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="型号" prop="type" align="center">
        </el-table-column>
        <el-table-column label="品牌" prop="brandge" align="center">
        </el-table-column>
        <el-table-column label="环境温度" align="center">
          <template slot-scope="scope"> {{ scope.row.ter }} </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center">
        </el-table-column>
        <el-table-column label="已用电量" prop="nums" align="center">
        </el-table-column>
        <el-table-column label="控制" prop="control" width="200" align="center">
          <template slot-scope="props">
            <el-select
              v-model="controlItem[props.$index]['control' + props.$index]"
              placeholder="请选择"
              size="small"
              :disabled="controllIsDone"
              style="width:150px;"
              @change="controllSelectClick(props.row.id,controlItem[props.$index]['control' + props.$index])"
            >
              <!--  -->
              <el-option
                v-for="item in props.row.control"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="自控状态" prop="selfControl" align="center">
          <template slot-scope="props">
            <el-switch
              v-if="props.row.selfControl !== 'null'"
              v-model="props.row.selfControl"
              active-color="#13ce66"
              inactive-color="#ff3342"
              @change="switchChange($event, props.$index)"
            >
            </el-switch>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          label="继电器控制"
          prop="selfControl"
          align="center"
          width="200"
        >
          <template slot-scope="props">
            <template v-if="props.row.jdControl !== 'null'">
              <el-popover
                v-if="props.row.selfControl"
                placement="top-start"
                title="提示"
                width="100"
                trigger="hover"
                content="您需要关闭自控状态后操作"
              >
                <el-switch
                  slot="reference"
                  disabled="!props.row.selfControl"
                  v-model="props.row.jdControl"
                  active-color="#13ce66"
                  inactive-color="#ff3342"
                  @change="
                    switchChange2($event, props.$index, props.row.selfControl)
                  "
                >
                </el-switch>
              </el-popover>
              <el-switch
                v-if="!props.row.selfControl"
                slot="reference"
                v-model="props.row.jdControl"
                active-color="#13ce66"
                inactive-color="#ff3342"
                @change="
                  switchChange2($event, props.$index, props.row.selfControl)
                "
              >
              </el-switch>
            </template>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          prop="manage"
          align="center"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                handleEdit(
                  scope.row.id,
                  scope.row.ip,
                  scope.row.location,
                  scope.row.name,
                  scope.row.numCode
                )
              "
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.name, scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align:center;margin:20px 0 0 0 ">
        <!-- <el-switch v-model="pages"> </el-switch> -->
        <el-pagination
          :hide-on-single-page="pages"
          :total="total"
          :page-size="10"
          layout="prev, pager, next"
          @current-change="changePage"
          @prev-click="prevClick"
          @next-click="nextClick"
        >
        </el-pagination>
      </div>
    </template>
    <!-- 添加弹窗 -->

    <el-dialog
      title="添加设备"
      :visible.sync="centerDialogVisible"
      width="650px"
      style="border-bottom: 1px #eee solid;"
    >
      <ul class="dialogContent">
        <li class="dialogContentItem">
          <span class="dItemText">校区:</span>
          <template>
            <el-select
              v-model="addSchoolAera"
              placeholder="请选择校区"
              size="small"
              :loading="addSchoolAeraOptions.length == 0"
              @focus="selectSchool"
            >
              <el-option
                v-for="item in addSchoolAeraOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">楼栋:</span>
          <template>
            <el-select
              v-model="addBuilding"
              :disabled="addSchoolAera == ''"
              placeholder="请选择楼栋"
              size="small"
              :loading="addBuildingOptions.length == 0"
              @focus="selectbuilding"
            >
              <el-option
                v-for="item in addBuildingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">楼层:</span>
          <template>
            <el-select
              v-model="addFloor"
              :disabled="addBuilding == ''"
              placeholder="请选择楼层"
              size="small"
              :loading="addFloorOptions.length == 0"
              @focus="selectFloor"
            >
              <el-option
                v-for="item in addFloorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">教室:</span>
          <template>
            <el-select
              v-model="addRoom"
              :disabled="addFloor == ''"
              placeholder="请选择"
              size="small"
              @focus="selectRoom"
            >
              <!-- :loading="addRoomOptions.length == 0" -->
              <el-option
                v-for="item in addRoomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">品牌:</span>
          <template>
            <el-select
              v-model="addBrand"
              @focus="selectBrand"
              placeholder="请选择品牌"
              size="small"
            >
              <el-option
                v-for="item in addBrandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText">型号:</span>
          <template>
            <el-select
              v-model="addType"
              :disabled="addBrand == ''"
              placeholder="请选择型号"
              size="small"
              @focus="selectType"
            >
              <el-option
                v-for="item in addTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                append-to-body
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText numStyle">空调编号:</span>
          <el-input
            v-model="addId"
            placeholder="建议使用数字编号"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText ipStyle">空调IP:</span>
          <el-input
            v-model="addIp"
            placeholder="ip地址:xxx.xx.xx.xx"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText ipStyle">端口号:</span>
          <el-input
            v-model="addPort"
            placeholder="例:8081"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
        <li class="dialogContentItem ">
          <span class="dItemText nameStyle">空调名称:</span>
          <el-input
            v-model="addName"
            placeholder="例:东二209-1"
            size="small"
            style="width:215px"
          ></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click.prevent="addDevice"
          :disabled="
            !(addRoom && addType && addId && addName && addPort && addIp)
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <editDevice
      :showDialog="showDialog"
      :editid="editid"
      :editname="editname"
      :editip="editip"
      :editport="editport"
      :editnum ="numCode"
      @editClose="editClose"
    ></editDevice
    ><!-- 修改设备 -->
    <batchDialog
      :showBatch="showBatch"
      @batchOperatClose="batchOperatClose"
    ></batchDialog
    ><!-- 批量管理 -->
    <batchExport
      :showUpLoad="showUpLoad"
      @exportClose="exportClose"
    ></batchExport
    ><!-- 批量导入 -->
  </div>
</template>

<script>
import editDevice from "./editDevice";
import batchDialog from "./batchOperat";
import batchExport from "./upLoad";
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      /* 此处为添加功能弹窗值绑定值*/
      timerId:"",//定时器id
      controllIsDone:false,//下拉框执行是否完成，完成前所有下拉框禁用
      pages: true,
      pagesNum: 1,
      total: 0,
      schoolLoaded: true, //添加弹窗加载动画
      test: "",
      isSearch: false,
      selectfloorSearch: "", //筛选楼层条件
      addName: "东二209", //空调名称
      addIp: "172.16.22.209", //空调ip
      addId: "01", //空调编号
      addType: "", //空调型号
      addBrand: "", //空调品牌
      addRoom: "", //教室名称
      addFloor: "", //楼层
      addBuilding: "", //楼栋
      addSchoolAera: "", //校区
      addPort: "8001", //端口号

      addNameOptions: [], //空调名称
      addIpOptions: [], //空调ip
      addIdOptions: [], //空调编号
      addTypeOptions: [], //空调型号
      addBrandOptions: [], //空调品牌
      addRoomOptions: [], //教室名称
      addFloorOptions: [], //楼层
      addBuildingOptions: [], //楼栋
      addSchoolAeraOptions: [], //校区

      /* 修改设备信息值 */
      showDialog: false,
      type: "",
      room: "",
      floor: "",
      build: "",
      school: "",
      brand: "",
      id: "",
      ip: "",
      name: "",
      editid: "",
      editname: "",
      editip: "",
      editport: "",
      numCode:"",

      /* 批量导入 */
      showUpLoad: false,

      /*  */
      showBatch: false, //批量操作弹窗
      centerDialogVisible: false, //添加设备弹窗控制
      selectBuild: "", //选择楼栋绑定值，头部搜索
      searchInput: "", //头部搜索输入框
      code: this.$route.query.code, //路由标识符
      buildId: this.$route.query.build
        ? this.$route.query.build
        : localStorage.getItem("initBuildId"), //楼栋id
      floorNum: this.$route.query.fNum
        ? this.$route.query.fNum
        : localStorage.getItem("initFloorNum"), //楼层数
      schoolId: this.$route.query.sch
        ? this.$route.query.sch
        : localStorage.getItem("initschoolId"), //校区ID
      controlItem: [], //控制项下拉框绑定值
      selfBtnValue: "",
      options: [
        //楼层搜索下拉框
      ],
      control: [],
      controlItemLength: "", //下拉框绑定值
      tableData: [
        //列表数据
        // {
        //   type: "1P",
        //   brandge: "格力",
        //   ter: "26",
        //   status: "通电未开机",
        //   nums: "200度",
        //   control: [
        //     {
        //       value: "开机",
        //       label: "开机"
        //     },
        //     {
        //       value: "关机",
        //       label: "关机"
        //     },
        //     {
        //       value: "高风制冷20度",
        //       label: "高风制冷20度"
        //     },
        //     {
        //       value: "高风制冷18度",
        //       label: "高风制冷18度"
        //     },
        //     {
        //       value: "低风制冷18度",
        //       label: "低风制冷18度"
        //     }
        //   ],
        //   selfControl: false,
        //   jdControl: true,
        //   location: "东二209",
        //   name: "空调一",
        //   id: "1123",
        //   ip: "172.16.22.18"
        // },
      ]
    };
  },
  components: {
    editDevice,
    batchDialog,
    batchExport
  },
  methods: {
    controllSelectClick(id,event){
      console.log(id,event)
      this.controllIsDone = true

      axios.get(this.api + "devices/perform",{params:{ids:id,itemName:event}})
      .then(()=>{
        this.controllIsDone = false
      })
      .catch(()=>{
        console.log("指令执行失败")
      })
      setTimeout(()=>{
        this.controllIsDone = false
      },500)
    },
    inintList(List, data) {
      data.forEach(item => {
        List.push({
          type: item.model_name,
          brandge: item.brand_name,
          ter: item.log ? item.log.contextT + "℃" : "暂无",
          status: item.log
            ? (item.log.relayStatus ? "通电" : "未通电") +
              (item.log.onOffStatus ? "开机" : "未开机")
            : "暂无",
          nums: item.log ? item.log.electricConsume + "度" : "暂无",
          selfControl: item.log
            ? item.log.autoStatus == 0
              ? false
              : true
            : "null",
          control: this.control,
          jdControl: item.log
            ? item.log.relayStatus == 0
              ? false
              : true
            : "null",
          location: item.port,
          name: item.name,
          id: item.id,
          ip: item.ip_address,
          numCode:item.address_code
        });
      });
    },
    changePage($event) {
      //分页页码改变
      console.log($event);
      this.pagesNum = $event;

      if (this.isSearch) {
        this.getPageAfterList();
      } else {
        this.getListData();
      }
    },
    prevClick($event) {
      //上一页按钮事件
      console.log($event);
    },
    nextClick($event) {
      //下一页按钮事件
      console.log($event);
    },
    addDevice() {
      //添加设备
      let params = {
        name: this.addName,
        ipAddress: this.addIp,
        port: this.addPort,
        addressCode: this.addId,
        roomId: this.addRoom,
        modelId: this.addBuilding
      };
      $.ajax({
        type: "POST",
        url: this.api + "devices",
        data: JSON.stringify(params),
        contentType: "application/json",
        success: data => {
          // 刷新列表
          console.log(data);
          this.messageSuccess();
          this.centerDialogVisible = false;
        },
        error: () => {
          this.messageErr();
        }
      });
    },
    selectSchool(e) {
      //校区下拉框数据加载
      this.addSchoolAeraOptions = [];
      this.addBuildingOptions = [];
      this.addFloorOptions = [];
      this.addFloor = "";
      this.addBuilding = "";
      this.addRoomOptions = [];
      this.addRoom = "";
      this.constructData("schoolZones", this.addSchoolAeraOptions);
    },
    selectbuilding() {
      //楼栋下拉框数据加载
      this.addFloorOptions = [];
      (this.addFloor = ""), //楼层
        (this.addBuildingOptions = []);
      this.addRoomOptions = [];
      this.addRoom = "";
      this.constructData("buildings", this.addBuildingOptions, {
        zoneId: this.addSchoolAera
      });
    },
    selectFloor(params) {
      //楼层下拉数据加载
      this.addFloorOptions = [];
      this.addRoomOptions = [];
      this.addRoom = "";
      this.pubilcFnAxios(`buildings/${this.addBuilding}/floors`, {})
        .then(data => {
          console.log(data);
          for (let i = 1; i < data + 1; i++) {
            this.addFloorOptions.push({ label: i + "F", value: i });
          }
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    selectRoom() {
      //加载教室下拉框数据
      this.addRoomOptions = [];
      this.constructData(
        `rooms/${this.addBuilding}/${this.addFloor}`,
        this.addRoomOptions,
        {}
      );
    },
    selectBrand() {
      //加载品牌列表
      this.addBrandOptions = [];
      this.addTypeOptions = [];
      this.addType = "";
      this.pubilcFnAxios("models/brands", {})
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            this.addBrandOptions.push({ label: data[i], value: data[i] });
          }
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    selectType() {
      //加载型号
      this.addTypeOptions = [];
      this.constructData(`/models/${this.addBrand}`, this.addTypeOptions, {});
    },
    constructData(urlString, obj, params) {
      //构造下拉菜单数据结构
      this.pubilcFnAxios(urlString, params)
        .then(data => {
          console.log(data);
          data.forEach(item => {
            obj.push({
              value: item.id,
              label: item.name || item.modelName
            });
          });
          this.schoolLoaded = false;
        })
        .catch(() => {
          console.log("请求失败");
        });
    },

    pubilcFnAxios(urlString, params, method) {
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

    buildControlModel() {
      //构造下拉框绑定值
      let arr = [];
      let i = 0;
      for (i; i < this.controlItemLength; i++) {
        arr.push({ ["control" + i]: "" });
      }
      console.log(arr);
      return arr;
    },
    switchChange(el, id) {
      //推拉框回调函数
      console.log(el, id);
    },
    switchChange2(el, id, selfStatus) {
      // this.tableData[id].selfControl = !this.tableData[id].selfControl;
      console.log(id);
    },
    searchClick() {
      //搜索功能
      this.pubilcFnAxios(
        `devices/${this.schoolId || localStorage.getItem("initschoolId")}/${this
          .buildId || localStorage.getItem("initBuildId")}/${
          this.selectfloorSearch
        }`
      )
        .then(data => {
          this.tableData = [];
          this.isSearch = true;
          this.total = data.total;
          this.controlItemLength = data.list.length; //下拉框绑定值
          this.controlItem = this.buildControlModel();
          this.inintList(this.tableData, data.list);
        })
        .catch(() => {
          console.log("筛选请求失败");
        });
    },
    editClose() {
      //修改设备弹窗，子组件调用函数，关闭弹窗
      console.log("子组件触发成功");
      this.showDialog = false;
    },
    batchOperatClose() {
      //批量操作弹窗，子组件调用函数，关闭弹窗
      console.log("子组件触发成功");
      this.showBatch = false;
    },
    handleEdit(id, ip, port, name,code) {
      //修改按钮绑定事件
     
      this.editid = id.toString();
      this.editname = name;
      this.editip = ip;
      this.editport = port.toString();
      this.numCode = code.toString()
       this.showDialog = true;
      console.log(id, ip, port, name,code);
    },
    open(name, id) {
      //删除提示框
      this.$confirm(`此操作将删除${name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .delete(this.api + `/devices/${id}`)
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (this.isSearch) {
                this.getPageAfterList();
              } else {
                this.getListData();
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    handleDelete(name, id) {
      //按钮点击事件
      this.open(name, id);
    },
    batchOperat() {
      //批量管理点击事件
      this.showBatch = true;
    },
    batchExport() {
      //批量导入按钮事件
      this.showUpLoad = true;
    },
    exportClose() {
      //批量导入回调函数
      this.showUpLoad = false;
    },
    openMessage() {
      this.$notify({
        title: "警告",
        message: "存在设备故障",
        type: "warning",
        duration: 0,
        onClick: this.checkedInfo
      });
    },
    checkedInfo() {
      this.$router.push("/admin/waringInfo");
      console.log("查看消息");
    },
    constructSearchInput() {
      //构造搜索项下拉框数据
      for (let i = 0; i < this.floorNum; i++) {
        this.options.push({ value: `${i + 1}`, label: `${i + 1}F` });
      }
    },
    getListData() {
      let params = {
        pageNum: this.pagesNum,
        pageSize: 10
      };
      this.pubilcFnAxios(
        `devices/${this.schoolId || localStorage.getItem("initschoolId")}/${this
          .buildId || localStorage.getItem("initBuildId")}`,
        params
      )
        .then(data => {
          this.tableData = [];
          this.total = data.total;
          this.controlItemLength = data.list.length; //下拉框绑定值
          this.controlItem = this.buildControlModel();
          this.inintList(this.tableData, data.list);
        })
        .catch(() => {
          console.log("请求失败");
        });
    },
    getPageAfterList() {
      let params = {
        pageNum: this.pagesNum,
        pageSize: 10
      };
      this.pubilcFnAxios(
        `devices/${this.schoolId || localStorage.getItem("initschoolId")}/${this
          .buildId || localStorage.getItem("initBuildId")}/${
          this.selectfloorSearch
        }`,
        params
      )
        .then(data => {
          this.tableData = [];
          this.isSearch = true;
          this.total = data.total;
          this.controlItemLength = data.list.length; //下拉框绑定值
          this.controlItem = this.buildControlModel();
          this.inintList(this.tableData, data.list);
        })
        .catch(() => {
          console.log("筛选请求失败");
        });
    },
    refresh(){
      this.timerId = setInterval(() => {
        console.log("定时器执行" + new Date())
         if (this.isSearch) {
                this.getPageAfterList();
              } else {
                this.getListData();
              }
      }, 20000);
    },
     clear() {
      clearInterval(this.timerId); //清除计时器
      this.timerId = null; //设置为null
    },
  },
  watch: {
    $route() {
      //监听路由参数变化触发事件，在这里进行页面切换时请求接口
      // this.code = this.$route.query.b;
      this.tableData = [];
      this.buildId = this.$route.query.build;
      this.floorNum = this.$route.query.fNum;
      this.schoolId = this.$route.query.sch;
      localStorage.setItem("initschoolId", this.$route.query.sch);
      localStorage.setItem("initBuildId", this.$route.query.build);
      localStorage.setItem("initFloorNum", this.$route.query.fNum);
      this.options = [];
      this.constructSearchInput();
      this.pubilcFnAxios("items")
        .then(data => {
          this.control = [];
          for (let i = 0; i < data.length; i++) {
            this.control.push({ label: data[i], value: data[i] });
          }
          this.getListData();
        })
        .catch(() => {
          console.log("构造列表失败");
        });
    }
  },
  mounted() {
    //初始化下拉框绑定值
    // this.openMessage();
    this.constructSearchInput();
    console.log(this.$route.query.code);
    this.pubilcFnAxios("items")
      .then(data => {
        this.control = [];
        for (let i = 0; i < data.length; i++) {
          this.control.push({ label: data[i], value: data[i] });
        }
        this.getListData();
      })
      .catch(() => {
        console.log("构造列表失败");
      });
    // this.refresh()
 },
 destroyed (){
   console.log("页面销毁")
   this.clear()
 }
};
</script>

<style scoped>
.tableHead {
  height: 50px;
  border-bottom: 1px solid #000;
  line-height: 50px;
  /* padding: 0 0 0 5px; */
}
.tableHead .tableHead-left {
  display: inline-block;
  width: 49%;
}

.el-icon-refresh {
  float: left;
  margin-left: 20px;
  font-size: 34px;
  font-weight: 900;
  color: #5daf34;
  padding-top: 7px;
}

.tableHead-left {
  float: left;
}

.tableHead .tableHead-right {
  display: inline-flex;
  flex-direction: row-reverse;
  width: 50%;
}
.tableHead .tableHead-right .el-input-sellf {
  position: relative;
  font-size: 14px;
  display: inline-block;
  /* width: 100%; */
}
.tableHead .tableHead-right .tableSearch {
  border-radius: 5px;
  height: 40px;
  width: 50px;
}

.dialogContent {
  /* background: red; */
  height: 100%;
  width: 100%;
  text-align: center;
}
.dialogContent .dialogContentItem {
  height: 30px;
  margin: 0 0 20px 0;
}
.dialogContent .dialogContentItem .dItemText {
  margin-right: 15px;
}
.numStyle {
  margin: 0 0 20px -27px;
}
.ipStyle {
  margin: 0 0 20px -15px;
}
.nameStyle {
  margin: 0 0 20px -29px;
}
</style>
