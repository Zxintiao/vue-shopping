export default{
    install(Vue){
        Vue.prototype.$scrollTo = function(end=0,cb){
            var start = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = (start-end)/100*16.7;
            var timer = setInterval(() => {
                document.documentElement.scrollTop = document.body.scrollTop = start -= speed;
                if(start <= end && speed>0 ){
                    clearInterval(timer);
                    cb?cb():null
                }else if(start >= end && speed<0){
                    clearInterval(timer);
                    cb?cb():null
                }
            }, 16.7);
        }
    }
}