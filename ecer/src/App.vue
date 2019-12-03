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
    list-style: none;
  }

  html, body {
    width: 100%;
    height: 100%;
    min-width: 100%;
  }
/*  .el-input {*/
/*    position: relative;*/
/*    font-size: 14px;*/
/*    display: inline-block;*/
/*    width: 150px;*/
/*    !* width: 100%; *!*/
/*}*/

  #app {
    width: 100%;
    min-width: 1024px;
    height: 100%;
  }
</style>
