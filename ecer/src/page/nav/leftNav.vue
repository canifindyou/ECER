<template>
  <el-aside width="180px">
    <el-menu :default-active="this.$router.path" router @open="open">
      <template v-for="all in this.$router.options.routes">
        <template v-for="item in all.children">
          <el-submenu :index="item.path">
            <template slot="title">{{ item.name }}</template>
            <!-- 是否为设备管理界面-->
            <template v-if="item.needData" v-for="sideItem in sideData">
              <el-submenu :index="sideItem.index">
                <template slot="title">{{ sideItem.label }}</template>
                <el-menu-item
                  @click="test(secondItem.label)"
                  v-for="secondItem in sideItem.building"
                  :class="{ click: code == secondItem.label }"
                  >{{ secondItem.label }}</el-menu-item
                >
              </el-submenu>
            </template>
            <template v-if="!item.needData">
              <template v-for="(kids, i) in item.children">
                <el-menu-item :index="kids.path">{{ kids.name }}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      code: "all",
      sideData: [
        {
          label: "新芜校区",
          building: [{ label: "A18" }, { label: "A19" }],
          index: "1"
        },
        {
          label: "文津校区",
          building: [{ label: "东二" }, { label: "东三" }],
          index: "2"
        }
      ]
    };
  },
  methods: {
    open(key) {
      if (key === "3" || key === "4") {
        console.log("事件已触发");
      }
    },
    test(flag) {
      this.code = flag;
      this.$router.push({
        path: "/adminHome",
        query: {
          code: this.code
        }
      });
    },

    handleSelect(key, keyPath) {
      console.log(key);
    }
  }
};
</script>
<style>
/*el-container*/
.el-aside {
  line-height: 100px;
  background: #eee;
  overflow: hidden;
}

.el-tree {
  padding-left: 25px;
  font-size: 15px;
  font-weight: 500;
}
.click {
  color: #409eff;
}
</style>
