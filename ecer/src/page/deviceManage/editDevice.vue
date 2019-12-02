<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="showDialog"
      width="650px"
      style="border-bottom: 1px #eee solid;"
      @close="close"
    >
      <ul class="dialogContent">
        <li class="dialogContentItem">
          <span class="dItemText">校区:</span>
          <template>
            <el-select v-model="school" placeholder="请选择" size="small">
              <el-option
                v-for="item in schoolOptions"
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
            <el-select v-model="build" placeholder="请选择" size="small">
              <el-option
                v-for="item in buildOptions"
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
            <el-select v-model="floor" placeholder="请选择" size="small">
              <el-option
                v-for="item in floorOptions"
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
            <el-select v-model="room" placeholder="请选择" size="small">
              <el-option
                v-for="item in roomOptions"
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
              v-model="brand"
              placeholder="请选择"
              size="small"
              @focus="loadingBrand($event)"
              :loading="loading"
            >
              <el-option
                v-for="item in brandOptions"
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
            <el-select v-model="type" placeholder="请选择" size="small">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText numStyle">空调编号:</span>
          <el-input
            v-model="id"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </li>
        <li class="dialogContentItem">
          <span class="dItemText ipStyle">空调IP:</span>
          <el-input
            v-model="ip"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </li>
        <li class="dialogContentItem ">
          <span class="dItemText nameStyle">空调名称:</span>
          <el-input
            v-model="name"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: { type: Boolean, defulault: false },
    school: { type: String, defulault: "" },
    build: { type: String, defulault: "" },
    floor: { type: String, defulault: "" },
    room: { type: String, defulault: "" },
    brand: { type: String, defulault: "" },
    type: { type: String, defulault: "" },
    id: { type: String, defulault: "" },
    ip: { type: String, defulault: "" },
    name: { type: String, defulault: "" }
  },
  data() {
    return {
      // showEdit: this.showDialog,
      loading: true,
      brandOptions: "",//品牌下拉框选择
      typeOptions: "",//型号下拉框选择
      roomOptions: "",//教室下拉框选择
      floorOptions: "",//楼层下拉框选择
      buildOptions: "",//楼栋下拉框选择
      schoolOptions: ""//校区下拉框选择
    };
  },

  methods: {
    close() {
      this.$emit("editClose");//通过父组件中的值改变子组件中值，避免意外错误
      // console.log(123)
    },
    submit() {
      this.$emit("editClose");
    },
    cancel() {
      this.$emit("editClose");
    },
    getData() {
      setTimeout(() => {
        (this.brandOptions = [
          {
            value: "选项1",
            label: "格力"
          },
          {
            value: "选项2",
            label: "美的"
          }
        ]),
          (this.loading = false);
      }, 2000);
    },
    loadingBrand(el) {
      this.getData();
    }
  }
};
</script>

<style scoped>
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
