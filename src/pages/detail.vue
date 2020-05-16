<template>
  <div>
    <tab :imgs="imgs" :title="title" :price="price" :supplier="supplier" :id="id"></tab>
  </div>
</template>
<script>
import $axios from "@/plugin/axios";
import tab from "@/components/tab";

export default {
  components: {
    tab
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.query.Id);

    // this.$showLoading();
    var detail = $axios.get("/detail?goodId=" + to.query.Id);
    console.log(detail);
    var p = Promise.all([detail]);
    (async () => {
      var res = await p;
      console.log(res);
      next(vm => {
        vm.detail = res[0].data[0]; //vm指向vue实例
        vm.imgs = JSON.parse(res[0].data[0].imgs); //vm指向vue实例
        vm.title = res[0].data[0].title; //vm指向vue实例
        vm.price = res[0].data[0].price; //vm指向vue实例
        vm.supplier = res[0].data[0].supplier; //vm指向vue实例
        vm.id = res[0].data[0].Id; //vm指向vue实例
        vm.$hideLoading();
      });
    })();
  },
  data() {
    return {
      imgs: "",
      title: "",
      price: "",
      supplier: "",
      id: "",
    };
  }
};
</script>