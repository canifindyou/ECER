<template>
  <div id="app">
    <router-view style="height: 100%"></router-view>
  </div>
</template>

<script>

export default {
  name: "App",

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

html, body {
  position:relative;
  height: 100%;
  width: 100%;
}

 #app {
  width: 100%;
  min-width: 1024px;
  height: 100%;
}
.el-table td{
		    padding: 0}
</style>
