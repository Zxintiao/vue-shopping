<template>
  <div class="li">
    <router-link :to="{path:'/detail',query:{Id:item.Id}}">
      <img v-lazy="item.img_list_url" alt />
      <h4>{{item.title}}</h4>
      <p>
        <span class="price">￥ {{item.price}}</span>
        <span v-html="item.mack"></span>
      </p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["item"]
};
</script>
<style lang="css" scoped>
product_item {
  width: 230px;
  margin: 5px;
  overflow: hidden;
  background-color: #ffffff;
  float: left;
  padding: 5px;
}
product_item:hover {
  height: 240px;
  transform: translateY(-5px);
  box-shadow: 2px 0 8px #666;
}
product_item img {
  width: 100%;
}
product_item:hover img {
  transform: scale(1.2);
}
product_item a {
  display: inproduct_itemne-block;
}
p {
  display: flex;
  justify-content: space-between;
}
p .price {
  color: red;
}
h4 {
  overflow: hidden;
  text-overflow: elproduct_itempsis;
  white-space: nowrap;
  font-size: 16px;
  color: #424242;
}
</style>