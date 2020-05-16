<template>
  <div id="app">
    <page-header></page-header>
    <scroll-top></scroll-top>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import PageHeader from "@/components/Page-header";
import ScrollTop from "@/components/scrollTop";
// 凡是与页面有关的组件 我们都采用异步组件的方式
// let index = import

export default {
  name: "App",
  components: {
    PageHeader,
    ScrollTop
  }
};
</script>

<style>
</style>
