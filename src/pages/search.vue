<template>
  <div class="search">
    <list v-if="search_list.length" :list="search_list"></list>
    <div v-else class="tip">
      没有找到该商品
      <button @click="$router.back()">返回</button>
    </div>
  </div>
</template>
<script>
import list from "../components/list";
import $axios from "@/plugin/axios";

export default {
  components: {
    list
  },
  data() {
    return {
      search_list: []
    };
  },
  beforeRouteEnter: async (to, from, next) => {
    let val = to.query.word;
    let res = await $axios.get("/search?word=" + val);
    next(vm => {
      vm.search_list = res.data;
    });
  },
  beforeRouteUpdate: async function(to, from, next) {
    let val = to.query.word;
    let res = await $axios.get("/search?word=" + val);
    this.search_list = res.data;
    next();
  }
};
</script>
<style lang="css" scoped>
.search {
  width: 1200px;
  margin: 10px auto;
  background-color: #fff;
}
.tip {
  width: 1200px;
  height: 500px;
  line-height: 500px;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
}
</style>