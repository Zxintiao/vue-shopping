<template>
  <div class="view">
    <div class="nav">
      <div class="safe_view">
        <div class="top">
          <img src="../assets/images/1.png" alt />
          <div class="right">
            <div class="search">
              <input
                type="text"
                placeholder="请输入要搜索的商品"
                v-model="search_val"
                @keyup.enter="searchHandle"
              />
              <button @click="searchHandle">搜索</button>
            </div>
          </div>
        </div>
        <div class="nav_view">
          <router-link to="/">首页</router-link>
          <template v-if="!this.$store.state.token">
            <router-link to="/login">登入</router-link>
            <router-link to="/register">注册</router-link>
          </template>
          <template v-else>
            <router-link to="/shopping">购物车</router-link>
            <a href="#" @click="outlogin">退出登入</a>
          </template>
        </div>
      </div>
    </div>

    <div class="sub_nav" v-if="$route.path != '/login' && $route.path != '/register'">
      <!-- <router-link :to="'/list?type_one='+item" v-for="(item,index) in nav_list" :key="index">{{item}}</router-link> -->
      <router-link
        :to="{path:'/list',query:{type_one:item}}"
        v-for="(item,index) in nav_list"
        :key="index"
      >{{item}}</router-link>
    </div>
  </div>
</template>
<script>
import $axios from "../plugin/axios";

export default {
  created: async function() {
    let res = await $axios.get("/getTypeone");
    this.nav_list = res.data;
  },
  // 进入header 组件 验证 vuex 中是否 有token
  methods: {
    outlogin() {
      console.log(1);
      
      this.$store.dispatch("update_tokens_async", "");
      localStorage.removeItem("token");
    },
    searchHandle() {
      let val = this.search_val;
      let search_list = $axios.get("/search?word=" + val);
      let p = Promise.all([search_list]);
      this.$router.push("/search?word=" + val);
    },
  },
  data() {
    return {
      search_val: "",
      nav_list: ""
    };
  }
};
</script>
<style scoped>
.view {
  background-color: #fff;
  margin-bottom: 10px;
}
.nav {
  background-color: #fff;
  padding-top: 20px;
  height: 188px;
  box-shadow: 0 2px 6px #999;
  -webkit-box-shadow: 0 2px 6px #999;
}
.view .logo {
  width: 188px;
  float: left;
}
.view .right {
  float: right;
}
.safe_view {
  max-width: 1200px;
  margin: 0 auto;
}
.view .nav_view a {
  margin: 0 20px;
  font-weight: bolder;
  padding: 10px 10px;
  padding-bottom: 4px;
  display: inline-block;
  border-bottom: 2px solid white;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.view .nav_view a:hover {
  border-bottom: 2px solid #784cfa;
  color: #784cfa;
}
.nav_view {
  padding: 15px 0px;
}
.search {
  width: 600px;
  height: 40px;
}
.view .top .right {
  width: 600px;
  float: right;
  margin-top: 20px;
}
.view .top .right .search {
  width: 600px;
}
.view .top .right .search input {
  outline: none;
  width: 400px;
  height: 40px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 5px 15px;
}
.view .top .right .search button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: -6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.view .top .right .search input:focus {
  border: 1px solid #784cfa;
}
.view .top .right .search button:hover {
  border: 1px solid #784cfa;
  color: #784cfa;
  background-color: #dad1f7;
}

.sub_nav {
  width: 1200px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.sub_nav a {
  width: 110px;
  height: 30px;
  text-align: center;
  margin-top: 15px;
  line-height: 30px;
  transition: all 0.3s;
}
.sub_nav a:hover {
  color: #fff;
  background-color: purple;
  border-radius: 50px;
  transition: all 0.3s;
}
</style>

