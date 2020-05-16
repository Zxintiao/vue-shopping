<template>
  <div class="register">
    <el-input class="ipt" placeholder="用户名" @focus="userErr=''" v-model="userName">
      <i slot="prefix" class="el-input__icon el-icon-user"></i>
    </el-input>
    <span class="err" v-show="userErr">{{userErr}}</span>
    <el-input class="ipt" placeholder="密码" @focus="pwdErr=''" v-model="password" type="password">
      <i slot="prefix" class="el-input__icon el-icon-key"></i>
    </el-input>
    <span class="err" v-show="pwdErr">{{pwdErr}}</span>
    <el-button type="success" @click="register">注册</el-button>
  </div>
</template>
<script>
import $axios from "../plugin/axios";
export default {
  created() {},
  data() {
    return {
      userName: "",
      password: "",
      userErr: "",
      pwdErr: ""
    };
  },
  methods: {
    register() {
      var patt = /^[\w\u4e00-\u9fa5]{6,12}$/;
      if (!patt.test(this.userName)) {
        this.userErr = "值包含数组字母下划线、汉字6-12为";
        return false;
      }
      var patt2 = /^\w{6,12}$/;
      if (!patt2.test(this.password)) {
        this.pwdErr = "只能输入6-12位数组字母下划线";
        return false;
      }

      var rst = $axios.get(
        "/register?userName=" +
          this.userName +
          "&" +
          "password=" +
          this.password
      );
      var p = Promise.all([rst]); // 触发所有的请求

      (async () => {
        let res = await p;
        let data = res[0].data;
        if (data.code === 0) {
          // 用elementui
          this.$message({
            type: "warning",
            message: "用户已经被占用"
          });
          // 清空输入框
          this.userName = this.password = "";
        } else if (data.code == 1) {
          this.$message({
            type: "success",
            message: "注册成功"
          });
          setTimeout(() => {
            this.$router.push("/login");
            this.userName = this.password = "";
          }, 1000);
        }
      })();
    }
  }
};
</script>
<style lang="">
.register {
  width: 400px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  padding: 20px 50px 30px 50px;
}
.register .ipt {
  margin-top: 20px;
}
.register button {
  margin: 0 auto;
  display: block;
  width: 100%;
  margin-top: 30px;
}
.err {
  color: red;
  font-size: 12px;
}
</style>