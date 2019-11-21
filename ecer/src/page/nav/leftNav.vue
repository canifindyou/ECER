<template>
  <el-aside width="180px">
    <el-menu>
      <el-submenu index="1">
        <template slot="title">设备管理</template>
       <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-tree> 
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">设置</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "新芜校区",
          children: [
            {
              label: "A18",
            }
          ]
        },
        {
          label: "文津校区",
          children: [
            {
              label: "东一",
            },
          ]
        },
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
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
.el-tree{
  padding-left: 25px;
  font-size: 15px;
  font-weight: 500
}
</style>
