<template>
  <div style="height: 100vh" >
    <MHEADER titleName="商品详情" titleBack="true" />

    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            :src="detail.url"
            style="width:100vw" @click="openBanner($event)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <div class="pages_con" style="padding-bottom:120px" ref="prod_ref">
        <div class="proDescribe">
          <div class="proName">{{detail.name}}</div>
          <div class="proNature">{{detail.desc}}</div>
          <div class="proPrice">
            <span class="present_price">
              ¥
              <span style="font-size:22px">{{detail.price | pShowPrice(false)}}</span>
              <span class="original_price">
                {{detail.originalPrice | pShowPrice }}
                <!-- <span class="spe_icon">特价</span> -->
              </span>
            </span>
          </div>
          <!-- <div class="shareBox">
            <img src="../../imgs/ico_share.png" class="ico_share" />
            <span>分享</span>
          </div>-->
        </div>

        <div v-for="(item, index) in detail.productParameters" :key="index">
          <div class="attrBox">
            <div class="attrHead">{{item.paramName}}</div>
            <div class="attrItem">
              <div v-for="(pItem, pIndex) in item.valueList" :key="pIndex">
                <!-- <div>
                  <div class="attrOne noActive">{{item.propertyName}}</div>
                </div>-->
                <div v-if="pItem.checkSelect">
                  <div class="attrOne active">{{pItem.value}}</div>
                </div>
                <div v-else>
                  <div class="attrOne noActive">{{pItem.value}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 
        <div class="fullCutBox">
          <div class="b_box">
            <div class="b_left_sec">特价</div>
            <div class="b_right_sec">100</div>
          </div>
          <div class="b_box">
            <div class="b_left_sec">优惠</div>
            <div class="b_right_sec">已省 1000</div>
          </div>
        </div>-->

        <div class="pro_select_box">商品详情</div>
        <!-- 
        <div class="parameters_box">
          <div v-for="(item, index) in productParameters" :key="index">
            <div class="b_one">
              <div class="o_left">{{item.propertyName}}：</div>
              <div class="o_right">{{item.propertyValue}}</div>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <CART_FOOT typeName="product"  titleName="商品详情" />
    
  </div>
</template>

<script>
import MHEADER from "@/components/m_header.vue";
import CART_FOOT from "@/components/c_cart_foot.vue";

export default {
  name: "ProductDetail",
  props: {
    id: String,
  },
  data() {
    return {
      propsId: '',
      detail: {},
    };
  },
  activated() {
    console.log("activated周期");
    if( this.$route.query.id  != this.propsId ){
      this.getDetail(this.id);
    }
  },
  mounted() {
    console.log("mounted周期");
    this.getDetail(this.id);
  },
  // mounted() {
  // },
  methods: {
    async getDetail() {
      let id = this.$route.query.id;
      console.log("this.id==" + id);
      const obj = await this.utils.uGet({
        url: this.url.getProdList,
        query: { id: id }
      });
      let detail = obj.detail;
      detail.productParameters.forEach(item => {
        item.valueList[0].checkSelect = true;
      });
      console.log("detail:" + JSON.stringify(obj));
      this.propsId = id;
      this.detail = detail;
    },
    //打开广告
    openBanner(e){
      console.log( "event=" + JSON.stringify(e) );
      console.log( "currentTarget=" + JSON.stringify(e.currentTarget) );
      console.log( "currentTarget=" + e.target.value)
    },
  },
  components: {
    MHEADER,
    CART_FOOT
  }
};
</script>

<style scoped>
.pageBox {
  overflow: hidden;
  height: 100vh;
}
.swiper {
  height: 100vw;
  width: 100%;
  position: relative;
}
.swiperBox {
  height: 100%;
  position: relative;
}

.swiper image {
  height: 100%;
  width: 100%;
}
.swiper .swiperNum {
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  color: #fff;
  text-align: center;
  height: 21px;
  line-height: 21px;
  padding: 0 10px;
  border-radius: 10.5px;
  position: absolute;
  bottom: 10px;
  right: 15px;
}

.buy_box {
  width: 100%;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  background: #fff;
}

.btn_addCart {
  background: linear-gradient(90deg, #ff9c07 0%, #ff6000 100%);
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  width: 195px;
  border-radius: 25px;
  position: absolute;
  right: 15px;
  top: 7.5px;
}
.bgColr {
  background: linear-gradient(90deg, #ff9c07 0%, #ff6000 100%);
}
image {
  width: 100%;
}

.StoreCart {
  background: #fff;
  width: 50px;
  height: 55px;
  text-align: center;
  display: inline-block;
}
.CollectCart {
  background: #fff;
  width: 50px;
  height: 55px;
  text-align: center;
  display: inline-block;
}
.shoppingCart {
  background: #fff;
  width: 50px;
  height: 55px;
  text-align: center;
  display: inline-block;
  position: relative;
}

.shoppingCart_text {
  color: #666;
  font-size: 10px;
  position: relative;
  top: 6px;
  display: block;
  line-height: 10px;
}

.buyNum {
  position: absolute;
  background: #e54b0c;
  color: #fff;
  font-size: 11px;
  border-radius: 9px;
  top: 4px;
  right: 6px;
  width: 15px;
  height: 15px;
  display: inline-block;
  line-height: 15px;
  margin-left: 5px;
}

.buyNumbig {
  position: absolute;
  background: #e54b0c;
  color: #fff;
  font-size: 11px;
  border-radius: 9px;
  top: 4px;
  height: 15px;
  display: inline-block;
  width: 24px;
  line-height: 15px;
  right: 0px;
}

.proDescribe {
  padding: 19px 75px 17px 10px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #f4f4f4;
  text-align: left;
}

.proName {
  color: #333;
  font-size: 17px;
  line-height: 1.4;
  /* margin-top: 10px; */
  font-weight: bold;
}

.proNature {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
}

.present_price {
  font-size: 12px;
  color: #ea3323;
  margin-right: 15px;
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
}

.original_price {
  font-size: 12px;
  line-height: 15px;
  color: #ccc;
  text-decoration: line-through;
  margin-left: 4px;
  /* font-weight:400!important; */
  position: relative;
}
.original_price .spe_icon {
  background: #ffefe5;
  border: 0.5px solid #e54b0c;
  border-radius: 2px;
  font-size: 10px;
  color: #e54b0c;
  /* line-height: 14px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  /* display: inline-block; */
  width: 30px;
  /* text-align:center; */
  margin-left: 5px;
  position: absolute;
  right: -35px;
  bottom: 3px;
}

.proPrice {
  line-height: 20px;
  margin-top: 20px;
}

.shareBox {
  position: absolute;
  z-index: 2;
  right: 20px;
  top: 21px;
  text-align: center;
  font-size: 14px;
  color: #999;
  background: #f3f3f3;
  border-radius: 20px 0px 0px 20px;
  height: 20px;
  line-height: 20px;
}

.shareBox button {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 2;
}

.ico_share {
  width: 14px;
  height: 14px;
  display: inline-block;
  float: left;
  margin-right: 2.5px;
  margin-top: 3px;
  margin-left: 5px;
}

.ico_cart {
  width: 22px;
  height: 22px;
  display: block;
  margin: 7px auto 0 auto;
}

.wxParse {
  padding: 10px;
  background: white;
}

.attrBox {
  font-size: 15px;
  border-bottom: 1px solid #f4f4f4;
  background-color: white;
  overflow: hidden;
  padding: 10px 15px 0px;
}
.attrHead {
  font-size: 14px;
  color: #333333;
  text-align: left;
}
.attrItem {
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
}
.attrOne {
  float: left;
  margin-right: 10px;
  background: #f0f0f0;
  padding: 7px 10px;
  font-size: 14px;
  border-radius: 2px;
  margin-bottom: 10px;
  color: #666;
}
.attrBox .active {
  background: #f39800;
  color: #fff;
}
.attrBox .noActive {
  background: #ccc;
  color: white;
}
.pro_select_box {
  font-size: 14px;
  color: #333333;
  height: 45px;
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
  padding-left: 10px;
}
.pro_select_box .b_one {
  float: left;
  width: 50%;
  font-size: 15.5px;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
}
.pro_select_box .active {
  color: #ffa52e;
  border-bottom: 1px solid #ffa52e;
}
.parameters_box {
  background-color: white;
  overflow: hidden;
}
.parameters_box .b_one {
  float: left;
  padding: 0 15px;
  height: 45px;
  line-height: 45px;
  border-bottom: 0.5px solid #f4f4f4;
  width: 100%;
  box-sizing: border-box;
}
.parameters_box .b_one .o_left {
  float: left;
  font-size: 14px;
  color: #999;
}
.parameters_box .b_one .o_right {
  float: left;
  text-align: left;
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}
.fullCutBox {
  overflow: hidden;
  margin: 10px 0;
  position: relative;
  width: 100%;
}
.fullCutBox .b_left {
  float: left;
  width: 20%;
  position: relative;
  text-align: center;
  margin-left: 10px;
}
.fullCutBox .b_left .l_image {
  width: 100%;
  height: 30px;
}
.fullCutBox .b_left .l_span {
  position: absolute;
  font-size: 14px;
  width: 100%;
  color: white;
  top: 5px;
}
.fullCutBox .b_right {
  float: left;
  width: 70%;
}
.fullCutBox .b_right .r_span {
  font-size: 15px;
  margin-top: 5px;
  margin-left: 10px;
}
.fullCutBox .b_top {
  height: 10px;
}
.fullCutBox .b_box {
  clear: both;
  overflow: hidden;
  height: 45px;
  border-bottom: 0.5px solid #f4f4f4;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  /* padding: 0 10px; */
}
.fullCutBox .b_box .b_left_sec {
  /* float:left; */
  margin-left: 10px;
  margin-right: 5px;
  font-weight: bold;
  /* padding:1px 4px; */
  font-size: 14px;
  color: #333333;
}
.fullCutBox .b_box .b_right_sec {
  /* float:left; */
  width: 75%;
  font-size: 14px;
  color: #999;
}
.b_right_sec .b_coupon_icon {
  /* background: #FFF7DB; */
  border-radius: 1px;
  font-size: 12px;
  color: #f39800;
  display: inline-block;
  position: relative;
  padding: 0px 7.5px;
  line-height: 20px;
  height: 20px;
}
.b_right_sec .b_coupon_icon .w_dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  margin-top: -4px;
}
.fullCutBox .b_box .b_right_icon {
  float: right;
}
.fullCutBox .b_box .bri_img {
  width: 25px;
  height: 5px;
  padding: 10px 0;
}
.fullCutBox .b_box .bri_img_2 {
  width: 12px;
  height: 12px;
  padding: 17px 0;
}
/*
.b_right_img{
  position:absolute;
  height:25px;
  width:35px;
  right:5px;
}
.b_right_img .bri_img{
  position:absolute;
  width:25px;
  height:5px;
  padding:10px 0;
}
*/
.pd_pop {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #151516;
  opacity: 0.3;
  top: 0;
}
.pd_box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background-color: white;
}
.pd_box .b_head {
  font-size: 17.5px;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}
.fresh_img {
  width: 100%;
  height: 100%;
  margin-bottom: 60px;
}
.noRangeTip {
  background: #fff7e3;
  height: 40px;
  color: #f39800;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
}
.loopImage {
  width: 100%;
  height: 100%;
}
</style>