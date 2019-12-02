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
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
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
          placeholder="选择楼层"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
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
          v-model="selectRoom"
          placeholder="选择教室"
          size="mini"
          style="width:120px;margin:0 10px 0 30px"
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
      selectSchoolOptions: [{ value: "文津校区", label: "新芜校区" }],
      selectBuild: "",
      selectBuildOptions: [{ value: "东二", label: "东二" }],
      selectFloor: "",
      selectFloorOptions: [{ value: "一楼", label: "一楼" }],
      selectRoom: "",
      selectRoomOptions: [{ value: "109", label: "109" }],
      selectDevice: "",
      selectDeviceOptions: [{ value: "设备一", label: "设备一" }],
      time: ""
    };
  },
  methods: {
    searchClick() {}
  }
};
</script>

<style></style>
