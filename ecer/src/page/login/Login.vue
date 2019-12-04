<template>
  <div>
    <div class="container">
      <div class="loginForm">
        <div class="title">
          <img src="../../../static/pic/img/title-login.png" alt="" />
        </div>

        <div class="form">
          <!-- <form id="loginForm" action="" method="POST" @submit="submit"> -->
          <p class="p1">
            <label for="account">账号：</label>
            <input
              type="text"
              class="account"
              id="account"
              name="username"
              placeholder="请输入账号"
              v-model="userName"
            />
          </p>
          <p class="p2">
            <label for="password">密码：</label>
            <input
              type="password"
              class="password"
              id="password"
              name="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </p>
          <button class="login" @click="login">登录</button>
          <!-- <button type="submit" class="login" value="登录"> -->
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
// import qs from "qs"

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: ""
      // userName: '2018009602',
      // password: 'Aiit@6044137796',
    };
  },
  methods: {
    submit: function(e) {
      console.log(e);
    },
     login() {
    if (this.userName == "admin" && this.password == "123") {
      this.$router.push("/admin");
    } else if (this.userName == "user" && this.password == "123") {
      this.$router.push("/user");
    }
  }
  },

 
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.container {
  width: 100%;
  height: 100%;
  background: url("../../../static/pic/img/bg-login2.jpg");
  background-size: 100% 100%;
  position: fixed;
}

.loginForm {
  width: 500px;
  height: 100%;
  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
}

.title {
  text-align: center;
  margin-top: 100px;
}

.title img {
  max-width: 100%;
  margin: 0 auto;
}

.form .p1,
.p2 {
  margin-top: 40px;
  margin-left: 100px;
}

.form .account,
.password {
  width: 200px;
  height: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 5px;
}

.form .login {
  width: 200px;
  height: 30px;
  background: #0a9dc7;
  margin-left: 175px;
  margin-top: 30px;
  border-radius: 10px;
}
</style>
