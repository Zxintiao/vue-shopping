# wl

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## vue 

写项目：

- 分析需求
- 根据需求决定使用什么技术

## 项目分析

#### 注册

```
1：表单 
  表单验证 
  点击：获取表单信息，发送注册请求 
  

```

#### 登录

```
1: 表单
   表单验证
登录交互：----点击登录按钮
  1：获取请求参数(表单数据)
  2: 发送登录请求
  3：处理登录响应。
     - 成功的；将token 保存本地  
     - 失败；提示信息  
```

   vuex 

  组件 dialog  

#### 首页

- 二级导航
  - Tab 切换 

```
1:导航信息是动态
   - 初始化；获取商品一级分裂接口 渲染到页面中
2:初始化需要加载的导航信息
3：鼠标移动到导航上；有过度 动画效；添加背景是
4：点击导航；切换不同商品列表
  - vue-router  子路由
    
  
  
```

- 轮播图

  ```
  1：无缝自动轮播；鼠标移上去轮播停止，鼠标离开轮播继续
  2；轮播数据是静态的本地资源
  ```



- 商品列表

```
- 初始化发送获取商品列表请求
- 对响应处理
  - 成功 ---> 数组重组.. -->渲染视图
    - 没有数据，---> 展示没有任何商品
  - 失败  ----> 错误的原因
         -----> 渲染‘没有任何商品 ''
```



- 下拉加载更多  
  - 前端处理---- 触底
  - 服务端：---->分页 



#### 展示分类商品列表

```
1:获取是什么分类商品  作用type_one 参数值
2：初始化  发送获取获取商品列表的请求 
3：响应处理 
    - 成功  ----> 有 渲染商品列表 
          ------> 无  渲染 没有{咖啡}
    - 失败  dialog 提示失败原因；渲染对应内容
```

- 分类商品列表 功能
  - 滚动联动 + tab 切换   返回顶部
  - 图片懒加载

#### 搜索

```
1：获取搜索款中信息 ---> 请求参数
2：发送搜索请求  
3：搜索响应的处理
   - 成功 -----> 有数据；渲染商品列表
         ------> 无数据  渲染 没有你想要的商品
```

#### 商品详情

- tab 切换 放大镜 
- 商品列表渲染1：

```
1：发送商品详情请求 
2：发送获取少恭列表请求


```

### 配置开发环境

- 安装node  vue-cli webpack 
- 如果 vue-cli 最新版本 
- 安装 vue-cli-serve serve

### 生成项目架构

- vue init webpack biyao_c
  - npm i  安装依赖项
- vue-cli 3 4版本    vue  creat biyao_c
  - npm i 
  - npm i vue-router  vuex axios vue-axios --save

### 修改默认的项目目录

与你项目有关的代码；都写在src 中

- 首页  
  - header 组件



### 插件

- v-lazy 
- loading 
  - 基础组件
  - 插件

## 详情页

### 性能优化

1：利用keep-alive 对相同的请求进行魂村；减少请求次数据
2: 一次性请求过千条数据；js 压力太大了，导致问题：请求时间太长了
  ----> 解决方式做分页处理   上拉加载更多

- 在父组件中；如何获取子组件中 dom 元素的高度 
  - 怎么样在父组件中直接获取子组件dom 元素呢？
- 在父组件中 给注册的子组件绑定  res='product'
- 在父组件中可以通过  this.$refs.prduct 获取组件，，通过  this.$refs.product.$el 获取到跟节点 
- vueComponent.$el 作用获取组件的根节点

### vuex  

1 安装vuex 
2 创建 store.js 
3 main.js  将vuex 放到 vue 实例上
4: store.js 创建 store 对象
5：在main.js 中绑定store 对象

### 搜索页面

 数据根性  dom 没有进行重新渲染。说明vue 内部任务；dom结构没变化；所以就使用之前的dom 
 解决方式：

- 在遍历的收给一个 key  告诉 vue key 变化了 当前的dom 不是之前的dom了；让vue 更新dom

## 子导航

 goodList  
 参数type_one

## goodList 

 当请求获取的数据；与页面解耦股不一致；需要对数据进行重组；
 重组；需要与页面结构保持一致；方便完成页面效果

- 现在的数据解耦股   [{type:'首充咖啡‘,imgs:"',title'',price:''},{type:'咖啡粉',imgs:'',title:"',price:''}]
  重组后 
  [{
   type:"咖啡粉”,
   list:[
      {imgs:'',tilte:'',price},
      {imgs:'',tilte:'',price},
      {imgs:'',tilte:'',price},
   ]
  },{
   type:"手冲咖啡",
   list:[
      {imgs:'',tilte:'',price},
      {imgs:'',tilte:'',price},
      {imgs:'',tilte:'',price},
   ]
  }]



### 购物车功能

#### 添加购物车

1: 验证用户是否登录。 token
   如果没有登录   --->  /login 
   登录了 ----> 发添加购物车请求

注意  从vuex 中获取；登录后  重新刷新页面；数据回到初始化；
     从 Localstorage  中获取 保存的token 可能不是 当前登录状态的token 
     因为token 的保存时间比较端  10小时 或者24小时  

### 购物车页面

1: 进入购物车页面钱；验证 用户是否登录；
  没 ------  '/login'

2:初始化  获取当前用户购物车数量  

