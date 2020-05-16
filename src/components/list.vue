<template>
  <div>
    <ul class="clear">
      <!-- <div v-lazy="list.length"></div> -->
      <!-- 页面不更新，给key值添加唯一值 -->
      <li v-for="item in list" :key="item.Id">
        <router-link :to="{path:'/detail',query:{Id:item.Id}}">
          <img v-lazy="item.img_list_url" alt />
          <h4>{{item.title}}</h4>
          <p>
            <span class="price">￥ {{item.price}}</span>
            <span v-html="item.mack"></span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"]
};
</script>
<style lang="css" scoped>
ul {
  width: 1230px;
  margin: 0 auto;
}
li {
  width: 230px;
  margin: 5px;
  overflow: hidden;
  background-color: #ffffff;
  float: left;
  padding: 5px;
}
li:hover {
  height: 240px;
  transform: translateY(-5px);
  box-shadow: 2px 0 8px #666;
}
li img {
  width: 100%;
}
li:hover img {
  transform: scale(1.2);
}
li a {
  display: inline-block;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #424242;
}
</style>