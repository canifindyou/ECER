<template>
  <div>
<!--  <el-container style="height: 100%">-->
    <router-view name="top"></router-view>
    <el-container>
      <router-view name="aside"></router-view>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
<!--  </el-container>-->
  </div>
</template>
