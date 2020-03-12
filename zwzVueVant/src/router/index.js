import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from '@/router/router_config.js'
import utils from "@/store/utils/myUtils";

const router = new VueRouter(
  { 
    routes: routerConfig
  })
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  const login = Number( utils.uGetLocal("isLogin") );
  if (to.meta.title) {
    document.title = to.meta.title + '_wz商城demo';
  }
  if (to.meta && to.meta.checkLogin) {//说明需要判断登录
    if (!login) {
      next({
        path: "/login?",
        query: { redirect: to.fullPath }
      });
      return;
    }
  }
  next();
})

router.afterEach(( to )=>{
  if( (to.name).includes("main") ){
    return;
  }
  setTimeout(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, 200);
})


export default router
