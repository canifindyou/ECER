<template>
  <el-header style="height:80px;padding:0">
    <div class="head">
      <div style="margin: 0 50px">
        <img src="../../../static/pic/school.png" class="head-img" alt="">
        <div class="exit" >退出系统</div>
      </div>
    </div>
  </el-header>
</template>


<script>
export default {
  method:{
    loginout(){//退出登录
      this.$route.replace("")
    }
  }
}
</script>

<style scoped>
  /*el-header*/
  .head {
    width: 100%;
    min-width: 1024px;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(to bottom left, #2b85ff, #409EFF)
  }

  .head-img {
    float: left;
    margin-top: 7px;
    height: 65px;
  }

  .exit {
    float: right;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
  }
</style>
