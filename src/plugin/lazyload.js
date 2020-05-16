// 懒加载实现思路
// 1：初始化时候；一张待加载的图片
// 2：滚局滚动条滚动位置；以及图片显示出来的位置。加载真是图片
// 获取视图窗口高度；获取滚动条滚动高度
// 获取img元素距离页面顶端高度； offsettop  = innerheight + scrollTop
// 判断；img 在什么时候进行加载（需要等图片露出一点点的时候。在架子啊；offsetTop大于视图高度与滚动高度众合）
//    注意初始化：需要等待图片 准备好后

export default {
    inserted: function (el, binding) {
        el.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582696419508&di=912ca450b85d5cbb80e64254820872c8&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F263683738.jpeg";
        window.addEventListener('scroll', fn)
        fn()
        function fn() {
            var h = window.innerHeight
            var st = document.documentElement.scrollTop || document.body.scrollTop
            var ot = el.offsetTop
            if (ot < h + st - 100) {
                el.src = binding.value
                window.removeEventListener(scroll, fn)
            }
        }
    }
};
