<template>
  <div>
    <div class="detail_view clearfix">
      <button>返回</button>
      <div class="left">
        <div class="img_box">
          <img :src="imgs[num]" alt />
          <div class="big_img_box" :class="{active:isActive}">
            <img :src="imgs[num]" alt :style="{top:-1.5*top+'px',left:-1.5*left+'px'}" />
          </div>
          <div class="mark" :class="{active:isActive}" :style="{top:top+'px',left:left+'px'}"></div>
        </div>
        <div class="img_btns clearfix">
          <img :src="item" alt v-for="(item,index) in imgs" :key="index" @click="change(index)" />
        </div>
      </div>
      <div class="right">
        <h2 class="title">{{title}}</h2>
        <p class="supplier">{{supplier}}</p>
        <p class="price" style="color:red">￥{{price}}</p>
        <el-rate v-model="value"></el-rate>
        <button class="el-button el-button--danger" @click="addCartHandle(id)">添加购物车</button>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from "../plugin/axios";
export default {
  props: ["imgs", "title", "price", "supplier", "id"],
  data() {
    return {
      goodID: null,
      num: 0,
      value: 0,
      isActive: false,
      top: 0,
      left: 0
    };
  },
  mounted() {
    //监听鼠标事件
    var view = document.getElementsByClassName("img_box")[0];
    view.addEventListener("mouseover", this.over);
    view.addEventListener("mouseout", this.out);
    view.addEventListener("mousemove", this.move);
  },
  methods: {
    change(index) {
      this.num = index;
    },
    over: function() {
      this.isActive = true;
    },
    out: function() {
      this.isActive = false;
    },
    move: function(e) {
      //计算移动距离
      var view = document.getElementsByClassName("img_box")[0];
      this.left = e.pageX - view.offsetLeft - 133;
      this.top = e.pageY - view.offsetTop - 133;
      //处理边界问题
      if (this.left < 0) {
        this.left = 0;
      } else if (this.left > 133) {
        this.left = 133;
      }
      if (this.top < 0) {
        this.top = 0;
      } else if (this.top > 133) {
        this.top = 133;
      }
    },
    addCartHandle(id) {
      // 1: 验证用户是否是登录状态 通过vuex 验证 、本地
      let { token } = this.$store.state;
      let token1 = localStorage.getItem("token");
      if (token || token1) {
        // 发送添加购物车请求
        (async function() {
          let res = await $axios.get("/add?token=" + token1 + "&goodId" + id);
          let code = res.data.code;
          if (code === 0) {
            this.$message({
              type: "warning",
              message: "未登录，请登录",
              duration: 500
            });
            setTimeout(
              function() {
                this.$router.push("/login");
              }.bind(this),
              1000
            );
          } else if (code === 1) {
            this.$message({
              type: "success",
              message: "添加成功",
              duration: 1000
            });
          } else if (code == 2) {
            this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        }.bind(this)());
      } else {
        this.$message({
          type: "warning",
          message: "未登录，请登录",
          duration: 500
        });
        // 没有token --- 跳转到 登录
        setTimeout(
          function() {
            this.$router.push("/login");
          }.bind(this),
          1000
        );
      }
    }
  }
};
</script>
<style>
body {
  background-color: #fff;
  background-image: none;
  width: 100%;
  height: 100%;
}
.detail_view {
  width: 1000px;
  /* height: 480px; */
  margin: 0 auto;
  background-color: #fff;
}
.detail_view button {
  display: block;
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
  margin: 10px 0px;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.detail_view .left {
  float: left;
}
.detail_view .left .img_box {
  width: 400px;
  height: 400px;
  position: relative;
  cursor: crosshair;
}
.detail_view .left .img_box > img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.detail_view .left .img_box .big_img_box {
  position: absolute;
  top: 0;
  left: 400px;
  width: 400px;
  height: 400px;
  overflow: hidden;
  z-index: 1000000;
  border-radius: 10px;
  display: none;
}
.detail_view .left .img_box .active {
  display: block;
}
.detail_view .left .img_box .big_img_box img {
  width: 600px;
  height: 600px;
  position: absolute;
  border-radius: 10px;
}
.detail_view .left .mark {
  width: 266px;
  height: 266px;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: none;
}
.detail_view .left .active {
  display: block;
}
.detail_view .left .img_btns img {
  width: 80px;
  height: 80px;
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 2px solid #fff;
}
.detail_view .right {
  float: left;
  margin: 100px 0 0 180px;
}
.detail_view .right p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>