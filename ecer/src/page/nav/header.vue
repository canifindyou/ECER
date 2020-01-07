<template>
  <el-header style="height:80px;padding:0">
    <div class="head">
      <div style="margin: 0 50px;position: relative">
        <img src="../../../static/pic/school.png" class="head-img" alt="">
        <!--                <div class="exit" >退出系统</div>-->
        <form action="http://172.16.211.75:8080/logout">
          <input class="exit" type="submit" @click="loginOut" value="退出系统">
        </form>
      </div>
    </div>
  </el-header>
</template>


<script>
  export default {
    methods: {
      loginOut () {
        $.ajax({
          type: 'GET',
          async: false,
          url: this.api + 'logout',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          success (res) {
            console.log(res)
          }
        })
      },
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
    width: 80px;
    float: right;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    position: absolute;
    top: 27px;
    right: 0;
    cursor: pointer;
    border: 0;
    outline: none;
    background: transparent;
  }
</style>
