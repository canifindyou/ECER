<template>
  <div>
    <el-row
      style="margin:10px 0 0 0;text-align:right"
      type="flex"
      class="row-bg"
    >
      <el-col :span="24" justify="end">
        <el-select
          v-model="selectSchool"
          placeholder="选择校区"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
          :loading="selectSchoolOptions.length == 0"
          @focus="selectSchools"
        >
          <el-option
            v-for="item in selectSchoolOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectBuild"
          placeholder="选择楼栋"
          :disabled="selectSchool == ''"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
          :loading="selectBuildOptions.length == 0"
          @focus="selectbuildings"
        >
          <el-option
            v-for="item in selectBuildOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectFloor"
          :disabled="selectBuild == ''"
          placeholder="选择楼层"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
          :loading="selectFloorOptions.length == 0"
          @focus="selectFloors"
        >
          <el-option
            v-for="item in selectFloorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectRooms"
          :disabled="selectFloor == ''"
          placeholder="选择教室"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
          @focus="selectRoom"
        >
          <el-option
            v-for="item in selectRoomOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="selectDevice"
          placeholder="选择设备"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
        >
          <el-option
            v-for="item in selectDeviceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div style="display:inline-block" v-if="flag">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="margin:0 0 0 30px"
          >
          </el-date-picker>
          <el-button
            size="mini"
            style="margin:0 10px 0 10px"
            @click="searchClick"
            >搜索</el-button
          >
        </div>
        <el-button
          v-else
          size="mini"
          style="margin:0 10px 0 30px"
          @click="searchClick"
          >搜索</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
import qs from "qs"
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectSchool: "",
      selectSchoolOptions: [],
      selectBuild: "",
      selectBuildOptions: [],
      selectFloor: "",
      selectFloorOptions: [],
      selectRooms: "",
      selectRoomOptions: [],
      selectDevice: "",
      selectDeviceOptions: [],
      time: ""
    };
  },
  methods: {
    searchClick() {
      
    },
    selectSchools(e) {
      //校区下拉框数据加载
      this.selectSchoolOptions = [];
      this.selectBuildOptions = [];
      this.selectFloorOptions = [];
      this.selectFloor = "";
      this.selectBuild = "";
      this.selectRoomOptions = [];
      this.selectRooms = "";
      this.constructData("schoolZones", this.selectSchoolOptions);
    },
    selectbuildings() {
      //楼栋下拉框数据加载
      this.addFloorOptions = [];
      (this.addFloor = ""), //楼层
        (this.addBuildingOptions = []);
      this.addRoomOptions = [];
      this.addRoom = "";
      this.constructData("buildings", this.selectBuildOptions, {
        zoneId: this.selectSchool
      });
    },
    selectFloors(params) {
      //楼层下拉数据加载
      this.addFloorOptions = [];
      this.addRoomOptions = [];
      this.addRoom = "";
      this.pubilcFnAxios(`buildings/floors/${this.selectBuild}`, {})
        .then(data => {
          console.log(data);
          for (let i = 1; i < data + 1; i++) {
            this.selectFloorOptions.push({ label: i + "F", value: i });
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
        `rooms/${this.selectBuild}/${this.selectFloor}`,
        this.selectRoomOptions,
        {}
      );
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
  }
};
</script>

<style></style>
