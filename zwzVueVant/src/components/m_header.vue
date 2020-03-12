
 <template>
  <div class="h_box">
    <div class="header">
      <div class="h_text h_left" v-if="titleBack">
        <span class="h_span" @click="goBack()">返回</span>
      </div>
      <div class="h_title" @click="tipWelcome()">{{titleName}}</div>
      <div class="h_text h_right" v-if="titleBtn">
        <span class="h_span">按钮</span>
      </div>
      <slot></slot>
    </div>
    <div class="h_pos"></div>
    <div id="topId"></div>
  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";

export default {
  name: "m_header",
  created() {},
  props: {
    titleBack: {
      required: false,
      type: String,
      default: ""
    },
    titleName: String,
    titleBtn: String
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tipWelcome() {
      console.log("mes=========" );
      const TopDom = Vue.extend({
        template: '<div @click="clickMess()" id="topId"  ><div v-if="reFresh" style=" position: fixed; top: 48vh; z-index:99; border-radius: 5px; background: rgb(60, 60, 60);color: white;width: 40vw;margin: 0 30vw;padding: 10px 0;opacity: 0.8;" >欢迎来到wz商城</div> </div>',
        data() {
          return {
            reFresh: true,
          };
        },
        mounted() {
          let _this = this;
          setTimeout(function() {
              _this.reFresh =false;
          }, 2000);
        },
        methods: {
          clickMess: function() {
            TopDom.reFresh =false;
          }
        }
      });
      new TopDom().$mount("#topId");
    }
  }
};
</script>


<style scoped>
  .mess_box{
  
  }

.h_box {
  position: relative;
}
.h_pos {
  width: 100%;
  height: 46px;
}

.header {
  position: fixed;
  z-index: 1;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
  background: rgb(254, 116, 7);
  width: 100%;
}

.header .h_title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .h_text {
  position: absolute;
  bottom: 0;
  font-size: 14px;
  cursor: pointer;
}
.header .h_left {
  left: 16px;
}
.header .h_right {
  right: 16px;
}
.header .h_span {
  display: inline-block;
  margin: 0 -16px;
  padding: 0 16px;
  color: white;
  vertical-align: middle;
}
</style>
