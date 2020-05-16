<template>
  <div>购物车</div>
</template>
<script>
import $axios from "@/plugin/axios";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    let { token } = this.$store.state;
    if (token) {
      $axios.get(`/shoplist?token=${token}`).then(({ data }) => {
          console.log(1);
          
        this.list = data;
      });
    } else {
      this.$router.push("/login");
    }
  },
  watch: {
    $route: function(to) {
      if (to.meta.cart == "/shoplist") {
        let { token } = this.$store.state;
        if (token) {
          $axios.get(`/shoplist?token=${token}`).then(({ data }) => {
          console.log(2);

            this.list = data;
          });
        } else {
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
<style scoped>
</style>>