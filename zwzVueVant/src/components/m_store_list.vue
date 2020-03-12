<template>
  <div class="side_bg">
    <div class="side_box" v-for="(item, index) in list" :key="index">
      <div class="side_head">
        <div class="s_img_div">
          <img class="i_class" :src="item.image" />
        </div>
        <div class="s_pro_div">
          <div class="p_top">
            <div class="t_title">{{item.orgName}}</div>
            <div class="t_address">地址：{{item.address}}</div>
            <div class="t_phone">联系：{{item.phone}}</div>
          </div>
        </div>
      </div>

      <div class="side_desc">
        <span>兑换说明:</span>
        {{item.remark}}
      </div>

      <div class="s_coupon_div" v-for="(cItem, cIndex) in item.productList" :key="cIndex">
        <div class="c_one">
          <div class="o_center">
            <img :src="cItem.url" class="c_image" />
          </div>
          <div class="o_left">
            <div class="l_top">{{cItem.name}}</div>
            <div class="l_bottom">
              <div class="b_t_left">价格:</div>
              <div class="b_t_right">
                <div class="b_t_div b_red">
                  <div>{{cItem.price | pShowPrice}}</div>
                </div>
                <!-- <div class="b_t_div b_red">
              <div>400币</div>
                </div>-->
              </div>
            </div>
          </div>
          <div class="o_right">
            <div class="r_btn">兑换</div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
// import vue from "vue";

export default {
  data() {
    return {
      list: []
    };
  },
  async created() {
    await this.getList();
  },
  methods: {
    async getList() {
      const list = await this.utils.uGet({
        url: this.url.getStoreList
      });
      // this.list.forEach( item => {
      //   item.a1
      // })
      this.list = list;
    }
  },
  components: {
  }
};
</script>

 <style scoped>
.side_bg {
  background: #f5f7f7;
  height: 100vh;
  padding: 20px 0;
}

.side_head {
  display: flex;
  margin-bottom: 10px;
  /* background: red; */
  padding-top: 20px;
}

.side_desc {
  border-bottom: 1px solid #d5dbde;
  font-size: 12px;
  padding: 0 15px 10px 15px;
  color: #999;
}

.side_box {
  background-color: white;
  margin: 0 20px 20px 20px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 -5px 15px 5px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.side_box .s_img_div {
  flex: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.side_box .s_img_div .i_class {
  width: 80px;
  height: 80px;
}

.side_box .s_pro_div {
  /* float: left; */
  /* margin-left: 0%; */
  /* width: 60%; */
  /* overflow: hidden; */
  flex: 7;
  display: inline-flex;
}

.side_box .s_pro_div .p_top {
  border-bottom: 1px solid #d8dede;
  width: 100%;
}

.side_box .s_pro_div .p_top .t_title {
  font-size: 17px;
  margin-bottom: 7px;
  color: black;
}

.side_box .s_pro_div .p_top .t_address {
  font-size: 12px;
  margin-bottom: 5px;
  color: #999;
}

.side_box .s_pro_div .p_top .t_phone {
  font-size: 12px;
  color: #999;
}

.side_box .s_pro_div .p_bottom {
  margin-top: 5px;
}

.side_box .s_pro_div .p_bottom .b_left {
  float: left;
  font-size: 12px;
  margin-bottom: 10px;
}

.side_box .s_pro_div .p_bottom .b_right {
  float: left;
  width: 60%;
  font-size: 12px;
}

.side_box .s_coupon_div {
  /* padding-left: 2%; */
  /* margin-left: 2%; */
  /* display: flex; */
  padding: 10px;
}

.side_box .s_coupon_div .c_one {
  color: black;
  clear: both;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
}

.side_box .s_coupon_div .c_one .o_center {
  display: inline-flex;
  flex: 2;
  align-content: center;
  justify-items: center;
  margin-right: 10px;
}

.side_box .s_coupon_div .c_one .side_img {
  background: #f62929;
  position: absolute;
  top: 0px;
  width: 20vw;
  color: white;
  font-size: 9px;
  padding: 2px 0;
  left: 7px;
}

.side_box .s_coupon_div .c_one .o_center .c_image {
  width: 20vw;
  height: 20vw;
  border-radius: 10px;
}

.side_box .s_coupon_div .c_one .o_left {
  overflow: hidden;
  display: inline-flex;
  flex: 7;
  flex-direction: column;
}

.side_box .s_coupon_div .c_one .o_left .l_top {
  margin-bottom: 5px;
  font-size: 14px;
  min-height: 56px;
}

.side_box .s_coupon_div .c_one .o_left .l_bottom .b_red {
  color: #eb5656;
}

.side_box .s_coupon_div .c_one .o_left .l_bottom .b_t_left {
  float: left;
  font-size: 12px;
  color: #999;
}

.side_box .s_coupon_div .c_one .o_left .l_bottom .b_t_right {
  float: left;

  width: 52%;
}

.side_box .s_coupon_div .c_one .o_left .l_bottom .b_t_div {
  float: left;
  margin-right: 10px;
  font-size: 11px;
}

.side_box .s_coupon_div .c_one .o_left .l_bottom .b_t_div .b_price_dex {
  text-decoration: line-through;
}

.side_box .s_coupon_div .c_one .o_right {
  display: inline-flex;
  flex: 2;
  justify-items: flex-end;
  align-items: flex-end;
}

.side_box .s_coupon_div .c_one .o_right .r_btn {
  color: white;
  background: #eb5656;
  border-radius: 5px;
  font-size: 10px;
  margin-top: 14px;
  width: 100%;
  text-align: center;
  height: 25px;
  line-height: 25px;
}
</style>