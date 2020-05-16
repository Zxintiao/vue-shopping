<template>
  <div>
    <banner></banner>
    <!-- 给组件绑定  ref 属性,并赋值 后，
     可以通过 this.$refs.list ，获取到list 子组件
    -->
    <list :list="list" ref="list"></list>
    <div class="loading">{{msg}}</div>
  </div>
</template>
<script>
import banner from "@/components/banner";
import list from "@/components/list";
import $axios from "@/plugin/axios";

export default {
  components: {
    banner,
    list
  },
  beforeRouteEnter(to, from, next) {
    var list = $axios.get("/goodList?page=" + 1);
    var p = Promise.all([list]); // 触发所有的请求
    (async () => {
      var res = await p;
      next(vm => {
        if (res[0].data.length) {
          vm.list.push(...res[0].data);
          // 初始化等dome 渲染完毕
          vm.$nextTick(() => {
            let el = vm.$refs.list.$el;
            vm.ot = el.offsetTop;
            vm.h = parseFloat(getComputedStyle(el, null).height);
          });
        }
        vm.$hideLoading();
      });
    })();
  },
  data() {
    return {
      list: [],
      page: 1,
      msg: "正在加载中.....",
      flag: true, // 控制啥时候该请求
      h: 0,
      ot: 0,
      H: window.innerHeight,
      st: 0
    };
  },
  mounted() {
    this.bindScroll();
  },
  methods: {
    bindScroll() {
      window.addEventListener("scroll", this.scrollHandle.bind(this));
    },
    scrollHandle() {
      if (this.flag) {
        // let H = window.innerHeight;
        let H = this.H;
        let st = (this.st =
          document.body.scrollTop || document.documentElement.scrollTop);
        if (H + st >= this.h + this.ot) {
          this.flag = false;
          this.getGooList();
        }
      }
    },
    getGooList() {
      this.page++;
      var list = $axios.get("/goodList?page=" + this.page);
      var p = Promise.all([list]); // 触发所有的请求
      (async () => {
        var res = await p;
        if (res[0].data.length != 0) {
          // 情况；当前的数据没有完全选完毕；就发送了另一个请求，数据又多了
          this.list.push(...res[0].data);
          // 解决以上；没等dom 渲染完毕发送请求问题
          // list 中数据 渲染完dom后 在获取 元素高度 offsetTop
          this.$nextTick(() => {
            let el = this.$refs.list.$el;
            this.ot = el.offsetTop;

            this.h = parseFloat(getComputedStyle(el, null).height);
          });
          this.flag = true;
        } else {
          // 没有数据后  删除 事件句柄
          window.removeEventListener("scroll", this.scrollHandle);
          this.msg = "没有更过多商品了";
        }
      })();
    }
  }
};
</script>
<style scoped>
.loading {
  width: 1200px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  color: blue;
  background-color: #ffffff;
  margin: 0px auto 10px auto;
}
</style>