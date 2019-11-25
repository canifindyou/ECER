<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 120px;
    /* width: 100%; */
}
.el-table__expanded-cell[class*=cell] {
    padding: 0;
    text-align: center;
    height: 50px;
}

  #app {
    width: 100%;
    min-width: 1024px;
    height: 100%;
  }
</style>
