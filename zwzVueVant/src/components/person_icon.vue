<template>
  <div>
    <div class="my_service box_toTop">
      <div class="ticketTit">
        <div class="tit_bg_text">service</div>
        <text class="tit_bg_line"></text>
        <div class="tit_name">{{name}}</div>
      </div>

      <div class="my_list" v-if="mineIconList.length > 0">
        <div class="list_item" v-for="(item, index) in mineIconList" :key="index">
          <div class="l_item_img" @click="tip(item.clickName)">
            <div class="l_item_img">
              <img src="../assets/wode_icon_daifukuan.png" />
            </div>
            <div class="l_item_text">{{item.showName}}</div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="my_list">
          <div class="list_item" style="width: 100%; margin-top: 20px;">
            <div class="l_item_img" >
              <div class="l_item_text">{{personTip}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PersonIcon",
  inject: ['personTip'],
  props: {
    name: {
      type: String,
      required: true
    },
    mineIconList: {
      type: Array,
      required: false,
      default: new Array(),
    }
  },
  methods: {
    tip(name) {
      switch (name) {
        case "exit":
          this.$store.dispatch("exitUserAction");
          break;
        case "orderRefous":
          this.orderRefous();
          break;
        default:
          this.utils.uAlert("本页面暂只支持退出登录");
          break;
      }
    },
    //点击退货弹窗
    orderRefous() {
      this.$vm.component("tb-heading", {
        template: "#templateId",
        props: {
          level: {
            type: Number,
            required: true
          }
        }
      });
    }
  }
};
</script>


<style scoped>
page {
  background: #ffffff;
}
.my_center {
  background-color: #fff;
}
.comp_bg {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 375px;
  height: 160px;
}
.comp_my {
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100%;
}

.comp_my .my_head {
  width: 100%;
  float: left;
  background-color: rgb(253, 212, 179);
}

.comp_my .my_head .h_messges {
  margin: 20px 15px 30px 20px;
  overflow: hidden;
  display: flex;
  height: 60px;
}

.comp_my .my_head .h_messges .m_top {
  align-items: center;
  flex: 2;
  display: flex;
  /*
  justify-content:center;
  */
}

.comp_my .my_head .h_messges .m_top .t_left {
  position: relative;
}

.comp_my .my_head .h_messges .m_top .t_left .l_img {
  height: 60px;
  width: 60px;
  border-radius: 60px;
  vertical-align: top;
}

.comp_my .my_head .h_messges .m_top .t_left .l_btn {
  height: 60px;
  width: 60px;
  opacity: 0;
  position: absolute;
  left: 0px;
  top: 0px;
}

.comp_my .my_head .h_messges .m_top .t_right {
  height: 60px;
  justify-content: center;
  /*
  align-items:center;
  */
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.comp_my .my_head .h_messges .m_top .t_right .r_top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}

.comp_my .my_head .h_messges .m_top .t_right .r_top .r_text {
  font-size: 14px;
  color: #fff;
  line-height: 19px;
}

.comp_my .my_head .h_messges .m_top .t_right .r_top .l_image {
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.comp_my .my_head .h_messges .r_bootom {
  font-size: 14px;
  color: #999999;
  line-height: 19px;
}

.comp_my .my_head .h_pay {
  height: 64px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.comp_my .my_head .h_pay .l_image {
  width: 60px;
  height: 36px;
  vertical-align: top;
}

.comp_my .my_head .h_pay text {
  font-size: 10px;
  color: #333333;
  margin-top: 5px;
}

.comp_my .my_head .h_statist {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 90%;
  height: 80px;
  background: #fff;
  margin: 0 5%;
  -webkit-box-shadow: 0 1.5px 5px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.comp_my .my_head .h_statist .s_div {
  flex: 1;
  text-align: center;
}

.comp_my .my_head .h_statist .s_div .d_num {
  font-size: 32px;
  color: #000000;
  position: relative;
  height: 40px;
}
.comp_my .my_head .h_statist .s_div .d_num .n_tip {
  font-weight: bold;
}

.comp_my .my_head .h_statist .s_div .d_name {
  font-size: 12px;
  color: #333333;
}

.comp_my .my_head .h_statist .s_div .d_remark {
  background: #c83c3c;
  border-radius: 20px 16px 16px 0;
  padding: 0px 5px;
  font-size: 10px;
  color: #fff;
  position: absolute;
  top: 7px;
  right: 0;
  height: 16px;
  line-height: 17px;
}
.comp_my .my_head .h_statist .s_div .d_remark_2 {
  background-image: linear-gradient(90deg, #f4c65f 0%, #ffe59d 100%);
  border-radius: 20px 16px 16px 0;
  padding: 0px 5px;
  font-size: 10px;
  color: #7c4406;
  position: absolute;
  top: 10px;
  right: 15%;
  height: 16px;
  line-height: 17px;
}

.comp_my .my_head .h_card_bg {
  position: relative;
  height: 60px;
  margin: 15px 10px 0;
  background-color: transparent;
  box-shadow: 0 -1.5px 7.5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.comp_my .my_head .h_card_bg .c_img {
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  margin: 0;
  background-color: transparent;
}

.comp_my .my_head .h_card .c_left .l_img {
  width: 100%;
  height: 18px;
  margin-bottom: 2.5px;
}

.comp_my .my_head .h_card {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  padding: 10px 15px 0 20px;
  width: 100%;
  background-color: transparent;
}

.comp_my .my_head .h_card .c_left {
  height: 35.5px;
  overflow: hidden;
  float: left;
}

.comp_my .my_head .h_card .c_left .l_img .i_img {
  width: 104.5px;
  height: 18px;
}

.comp_my .my_head .h_card .c_left .i_text {
  font-size: 10px;
  color: #f6da88;
  line-height: 15px;
}

.comp_my .my_head .h_card .tv_ban_btn {
  float: right;
  width: 55px;
  height: 27px;
  line-height: 27px;
  background: linear-gradient(270deg, #f8e7b1 0%, #f0d07c 100%);
  border-radius: 13.5px;
  font-size: 12px;
  color: #735a0f;
  position: relative;
  padding: 0 10px;
  font-weight: bold;
  margin-top: 5px;
}
.comp_my .my_head .h_card .tv_ban_btn .tv_trigon {
  width: 0px;
  height: 0px;
  border: 3.5px solid;
  border-color: transparent transparent transparent #735a0f;
  position: absolute;
  right: 8.5px;
  top: 50%;
  margin-top: -3.5px;
}

.my_service {
  overflow: hidden;
}
.my_service.box_toTop {
  margin-top: -5px;
}
.shadow_line {
  box-shadow: 0 -5px 15px 5px rgba(0, 0, 0, 0.2);
}
.ticketTit {
  padding: 10px 10px 0;
  overflow: hidden;
  height: 55px;
  line-height: 55px;
  position: relative;
  background-color: #fff;
}
.ticketTit .tit_bg_text {
  opacity: 0.5;
  font-size: 24px;
  color: #f0f0f0;
  font-weight: bolder;
  position: absolute;
  left: 0;
  top: 11.5px;
  line-height: 28px;
  height: 28px;
  /* background: -webkit-linear-gradient(bottom,rgba(255,255,255,1),rgba(255,144,0,1)); */
  text-transform: uppercase;
  /* letter-spacing: -0.5px; */
  /* -webkit-background-clip:text; 
  -webkit-text-fill-color:transparent;  */
}
.ticketTit .tit_name {
  font-size: 17px;
  color: #000000;
  font-weight: bolder;
  float: left;
  position: relative;
  z-index: 1;
}
.ticketTit .tit_bg_line {
  opacity: 0.3;
  height: 4px;
  width: 35px;
  background-image: linear-gradient(270deg, #f0cd8c 43%, #ffbe1f 100%);
  border-radius: 2.5px;
  position: absolute;
  left: 10px;
  top: 44px;
  z-index: 1;
}

.my_list {
  background: #fff;
  overflow: hidden;
  padding-bottom: 10px;
  z-index: 3;
}
.my_list .list_item {
  width: 25%;
  text-align: center;
  display: inline-block;
  margin-bottom: 22.5px;
}
.my_list .list_item .l_item_img {
  width: 80%;
  text-align: center;
  height: 36px;
  margin-bottom: 7.5px;
  margin: 10px auto;
}
.my_list .list_item .l_item_img image {
  height: 36px;
  width: 36px;
}
.my_list .list_item .l_item_text {
  font-size: 12px;
  color: #000000;
  text-align: center;
  line-height: 17px;
}
</style>