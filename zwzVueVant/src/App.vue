<template>
  <div id="app" ref="app_ref">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      listKeepAlive() {
        // return ["MainCart", "ProductDetail", "CART_FOOT"];
        // return "MainCart,ProductDetail,CartFoot";
        return '["ProductDetail", "CART_FOOT"]';
      }
    };
  },
  watch: {
    $route(to) {
      if (to.name != "/") {
        // console.log("app.scrollTop=" + this.$refs.app_ref.scrollTop);
        // // this.$refs.app_ref.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        // document.body.scrollTop = 0;
        // setTimeout(function() {
        //   document.body.scrollTop = 0;
        //   document.documentElement.scrollTop = 0;
        // }, 1000);
      }
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
