<template>
  <div>
    <!-- <div class="box"></div> -->
    <div class="toTop" v-show="flag" @click="toScroll">
      返回
      <br />顶部
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.checkScroll();
    });
  },
  methods: {
    toScroll() {
        this.$scrollTo()
    },
    checkScroll() {
      // 当滚动条滚动到某个高度的时候，显示返回顶部
      var start = document.body.scrollTop || document.documentElement.scrollTop;
      if (start > 500) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>
<style  scoped>
.toTop {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  background-color: #999;
  color: #666;
  text-align: center;
  font-size: 14px;
  line-height: 25px;
}
.toTop:hover {
  background-color: #784cfa;
  color: #FFF;
}
</style>