<template>
  <div class="goodList">
    <aside>
      <ul>
        <li
          v-for="(item,index) in floor_list"
          :key="index"
          @click="tabHandle(index)"
          :class="{active:index==num}"
        >{{item.type}}</li>
      </ul>
    </aside>
    <div class="content">
      <div v-for="(item,index) in floor_list" :key="index" ref="floor">
        <h2 class="goodName">{{item.type}}</h2>
        <ul class="clear">
          <li v-for="(it,ind) in item.list" :key="ind">
            <router-link to="/">
              <img v-lazy="it.img_list_url" alt />
              <h4>{{it.title}}</h4>
              <p>
                <span class="price">￥ {{it.price}}</span>
                <span v-html="it.mack"></span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from "../plugin/axios";
export default {
  data() {
    return {
      list: [],
      isActive: [],
      num: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    tabHandle(index) {
      this.num = index;
      var s = this.$refs.floor[index];
      var start = document.body.scrollTop || document.documentElement.scrollTop;
      // this.$scrollTo(s.offsetTop-85)
      if (s.offsetTop < start) {
        var step = start / 20 / 1;
        if (document.documentElement.scrollTop) {
          var timer = setInterval(() => {
            document.documentElement.scrollTop =
              parseInt(document.documentElement.scrollTop) - step;
            if (document.documentElement.scrollTop <= s.offsetTop - 60) {
              console.log(2);

              document.documentElement.scrollTop = s.offsetTop - 60;
              clearInterval(timer);
            }
          }, 20);
        }
      } else {
        var step = (s.offsetTop - 60) / 20 / 1;
        var timer = setInterval(() => {
          document.documentElement.scrollTop =
            parseInt(document.documentElement.scrollTop) + step;
          if (
            document.documentElement.scrollTop >= s.offsetTop - 60 ||
            document.documentElement.clientHeight +
              document.documentElement.scrollTop >=
              document.documentElement.scrollHeight
          ) {
            document.documentElement.scrollTop = s.offsetTop - 60;
            clearInterval(timer);
          }
        }, 20);
      }
    },
    handleScroll() {
      var st = document.body.scrollTop || document.documentElement.scrollTop;
      var s = this.$refs.floor;
      for (var i = 0; i < s.length; i++) {
        if (s[i].offsetTop - st < document.documentElement.clientHeight / 2) {
          this.num = i;
        }
      }
    }
  },
  beforeRouteEnter: async (to, from, next) => {
    let res = await $axios.get("/goodList?type_one=" + to.query.type_one);
    next(vm => {
      vm.list = res.data;
      vm.$hideLoading();
    });
  },
  beforeRouteUpdate: async function(to, from, next) {
    let res = await $axios.get("/goodList?type_one=" + to.query.type_one);
    this.list = res.data;
    next();
  },
  computed: {
    floor_list: function() {
      let floor_list = []; // [type:'',list:[]]
      for (var i = 0; i < this.list.length; i++) {
        var flag = true; // 控制 floor_list 中type 不重复
        for (var j = 0; j < floor_list.length; j++) {
          if (floor_list[j].type === this.list[i].type_two) {
            floor_list[j].list.push(this.list[i]);
            flag = false;
            break;
          }
        }
        if (flag) {
          floor_list.push({
            type: this.list[i].type_two,
            list: [this.list[i]]
          });
        }
      }
      // for (var i = 0; i < floor_list.length; i++) {
      //   this.isActive.push(false);
      // }
      return floor_list;
    }
  }
};
</script>
<style scoped>
.goodList {
  margin-top: -10px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.goodList > aside {
  position: fixed;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 10px;
  width: 100px;
  background: #fff;
  padding: 10px;
  border: 1px solid #773f77;
  border-radius: 5px;
}
aside li {
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
aside li:hover {
  color: purple;
  font-weight: bolder;
  filter: drop-shadow(0 0 10px purple);
}
aside .active {
  color: purple;
  font-weight: bolder;
  filter: drop-shadow(0 0 10px purple);
}

.content ul {
  width: 1230px;
  margin: 0 auto;
}
.content li {
  width: 230px;
  margin: 5px;
  overflow: hidden;
  background-color: #ffffff;
  float: left;
  padding: 5px;
}
.content h2 {
  text-align: center;
}
/* .content li:hover {
  height: 240px;
  transform: translateY(-5px);
  box-shadow: 2px 0 8px #666;
} */
.content li img {
  width: 100%;
}
/* .content li:hover img {
  transform: scale(1.2);
} */
.content li a {
  display: inline-block;
}
.content p {
  display: flex;
  justify-content: space-between;
}
.content p .price {
  color: red;
}
.content h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #424242;
}
</style>