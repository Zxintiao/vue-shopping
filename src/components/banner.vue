<template>
  <div>
    <div class="banner-view">
      <div
        class="banner"
        :style="{width:1200*imgs.length+'px',marginLeft:-1200*num+'px'}"
        :class="{trans:flag}"
      >
        <transition v-for="(item,index) in imgs" :key="index">
          <img :src="'static/'+ item" alt />
        </transition>
      </div>
      <div class="arrow arrow-left el-icon-arrow-left" @click="pre"></div>
      <div class="arrow arrow-right el-icon-arrow-right" @click="next"></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.autoPlay();
  },
  data() {
    return {
      imgs: [
        "images/a.jpg",
        "images/b.jpg",
        "images/c.jpg",
        "images/d.jpg",
        "images/e.jpg",
        "images/a.jpg"
      ],
      num: 0,
      flag: true,
      timer: null
    };
  },
  mounted() {
      var view = document.getElementsByClassName('banner-view')[0];
      view.addEventListener('mouseover',this.clear);
      view.addEventListener('mouseout',this.autoPlay)
  },
  methods: {
    autoPlay() {
      this.timer = setInterval(() => {
        this.next();
      }, 5000);
    },
    next() {
      this.num++;
      if (this.num == this.imgs.length) {
        this.flag = false;
        this.num = 0;
        setTimeout(() => {
          this.flag = true;
          this.num = 1;
        }, 0);
      }
    },
    pre() {
      if (this.num == 0) {
        this.flag = false;
        this.num = this.imgs.length - 1;
        setTimeout(() => {
          this.num = this.imgs.length - 2;
          this.flag = true;
        }, 0);
      } else {
        this.num--;
      }
    },
    clear() {
      clearInterval(this.timer);
    }
  }
};
</script>

<style>
.banner-view {
  width: 1200px;
  height: 450px;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.banner-view .banner {
  height: 100%;
}
.banner-view .trans {
  transition: all 1s;
}
.banner-view .banner img {
  width: 1200px;
  height: 100%;
}
.banner-view .arrow {
  position: absolute;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  background-color: transparent;
  color: white;
  opacity: 0.7;
  transform: all 0.3s;
}
.banner-view .arrow-left {
  top: 200px;
  left: 10px;
}
.banner-view .arrow-right {
  top: 200px;
  right: 10px;
}
.banner-view .arrow:hover {
  background: rgba(137, 43, 226, 0.76);
  color: white;
}
</style>`