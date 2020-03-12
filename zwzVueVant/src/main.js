import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from '@/store/utils/myUtils';
import url from '@/store/config/request_url';

import { Tabbar, TabbarItem, Swipe, SwipeItem, Search, DropdownMenu, DropdownItem, Grid, GridItem, Image, Picker } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Picker);

Vue.filter('pShowPrice', function (value, flag = true) {
  !value && (value = 0);
  const icon = flag ? "¥" : "";
  const result = (value / 100).toFixed(2);
  return icon + result; // .toFixed(2);
})

Vue.prototype.utils = utils;
Vue.prototype.url = url;

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  console.log('errorHandler捕捉到错误：' + err + '\ninfo=' + info);
}

Vue.mixin({
  created: function () {
    let name = this.$options.name;
    console.log(`当前进入${name}页面时间为：` + new Date().toString());
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
