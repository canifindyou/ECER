<template>
  <el-aside width="180px">
    <el-menu :default-active="this.$router.path" router @open="open">
      <!-- <template v-for="all in this.$router.options.routes"> -->
      <template v-for="item in this.$router.options.routes[id].children">
        <el-submenu :index="item.path">
          <!-- :index="item.path" -->
          <template slot="title">{{ item.name }}</template>
          <template v-if="item.needData" v-for="sideItem in sideData">
            <el-submenu :index="sideItem.index">
              <template slot="title">{{ sideItem.label }}</template>
              <el-menu-item
                v-for="secondItem in sideItem.building"
                :class="{ click: code == secondItem.label }"
                :index="secondItem.index"
                @click="test(secondItem.label, secondItem.index)"
                >{{ secondItem.label }}</el-menu-item
              >
              <!-- :index="secondItem.index" -->
            </el-submenu>
          </template>

          <template v-if="!item.needData">
            <template v-for="(kids, i) in item.children">
              <el-menu-item :index="kids.path" @click="code = ''">{{
                kids.name
              }}</el-menu-item>
            </template>
          </template>
        </el-submenu>
      </template>
      <!-- </template> -->
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      code: "A18",
      clickIndex: "",
      sideData: [
        {
          label: "新芜校区",
          building: [
            { label: "A18", index: "1" },
            { label: "A19", index: "2" }
          ],
          index: 1
        },
        {
          label: "文津校区",
          building: [
            { label: "东二", index: "3" },
            { label: "东三", index: "4" }
          ],
          index: "2"
        }
      ]
    };
  },
  methods: {
    open(key) {
      // if (key === "3" || key === "4") {
      //   console.log("事件已触发");
      // }
      // let dom = document.getElementsByClassName("el-submenu__title")
      console.log(key);
      // dom[key].style.color = "red"
    },
    test(flag, index) {
      this.code = flag;
      console.log(flag, index);
      if (this.$route.path.split("/")[1] == "admin") {
        this.$router.push({
          path: "/admin/adminHome",
          query: {
            code: this.code
          }
        });
      }else{
          this.$router.push({
        path: "/user/userHome",
        query: {
          code: this.code
        }
      });
      }
    },

    handleSelect(key, keyPath) {
      // console.log(key);
    }
  },
  watch: {
  
  },
  mounted() {
   if(this.$route.path.split("/")[1] == "user"){
     this.id = 3
   }else{
     this.id = 2
   }
   console.log(this.roles )
   console.log(this.$router.options.routes)
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
.testClass {
  color: red;
}
</style>
