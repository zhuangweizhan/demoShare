<template>
  <div>
    <MHEADER titleName="购物车"  >
       <div class="h_text h_right">
        <span class="h_span" @click="delAllCart()" style="color:grey;" >删除{{cartDetail.allNum}}件</span>
      </div>
    </MHEADER>

    <div v-if="cartList.length">
      <div class="cart_all">
        <div class="all_select_head">
          <div class="all_select_head_checkbox" @click="selectAll()">
            <img  v-if="cartDetail.allNum" src="../assets/ico_checked_cart.png" />
            <img v-else src="../assets/ico_checked_cart_no_tip.png" />
          </div>
          <span>全选</span>
        </div>
        <span class="weight_tip">(已选{{cartDetail.allNum}}件)</span>
      </div>
      <div class="goods_selection_section">
        <div class="container_delete">
          <div
            class="touch-item"
            v-for="(item, index) in cartList"
            :key="index"
            bindtouchstart="touchstart"
            bindtouchmove="touchmove"
          >
            <div class="content">
              <div class="goods_selection_item">
                <div class="checkbox_goods">
                  <div class="checkbox_box" @click="selectCart(index)">
                    <img  v-if="item.checkSelect" src="../assets/ico_checked_cart.png" />
                    <img v-else src="../assets/ico_checked_cart_no_tip.png" />
                  </div>
                </div>
                <div class="goods_img_box">
                  <img :src="item.url" class="goods_img" />
                </div>
                <div class="goods_right">
                  <div class="right_line"></div>
                  <div class="goods_name">{{item.name}}</div>
                  <div class="goods_text">{{item.desc}}</div>
                  <div class="bottomBox">
                    <div class="price_box">
                      <div class="price">
                        <!-- <div  class='goods_text_blue'>最快{{item.openTime}}启送</div>
                        <div  class='goods_text_gray'>今日已打烊</div>-->
                        <div class="price_current">
                          <span>¥</span>
                          <span class="seal_price">{{item.price | pShowPrice(false)}}</span>
                          <div class="price_retail">{{item.originalPrice | pShowPrice}}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="goods_num fr clearfix">
                    <div class="btn_minus" @click="changeNum(index, -1 )" >
                      <img src="../assets/ico_reduce.png" class="ico_add_goods fl" />
                    </div>
                    <div class="num fl">{{item.productNum}}</div>

                    <div class="btn_plus" @click="changeNum(index, 1 )">
                      <img src="../assets/ico_add.png" class="ico_add_goods fl" />
                    </div>
                    <!-- <div class="cart_tip">当前库存剩下{{item.inventory >= 0 ? item.inventory: '0' }}件</div> -->
                    <!-- <img src="../../imgs/bg_above_able_count.png" class="cart_imgs " /> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="del" catchtap="delCart">删除</div>
          </div>
        </div>
      </div>

      <CART_FOOT />

    </div>
    <div v-else>
      <NO_DATA_DEAULATE />
    </div>
  </div>
</template>

<script>
import MHEADER from "@/components/m_header.vue";
import NO_DATA_DEAULATE from "@/components/no_data_defaulte.vue";
import CART_FOOT from "@/components/c_cart_foot.vue";

export default {
  name: "MainCart",
  mounted() {
    this.$store.dispatch("setMenuActiveActions", "mainCart");
    this.$store.dispatch("setCartListActions", "");
  },
  data() {
    return {

    }
  },
  computed: {
    cartDetail(){
      let cartList = this.$store.getters.getCartList;
      let allNum = 0;
      let allPrice = 0;
      cartList.forEach( item => {
        if( item.checkSelect ){
            allNum += item.productNum;
            allPrice += item.productNum * item.price;
        }
      })
      return { allNum, allPrice };
    },
    cartList() {
      return this.$store.getters.getCartList;
    },
  },
  methods:{
    changeNum( index, changeNum ){
       let nowCartList =  this.cartList;
       let currentNum = nowCartList[index].productNum + changeNum;
       if( currentNum == 0 ){
        //  this.utils.uAlert("数量已经最少,是否删除!");
         this.utils.uConfirm({
           message:'数量已经最少,是否删除!',
           fn: ()=>{
              this.$store.commit("delCartByIndex", index );
           }
         })
       } else {
        //  nowCartList[index].productNum = result;
         this.$store.commit("setCartNum", {index:index, currentNum: currentNum } );
       }
    },
    //选择购物车
    selectCart(index){
      this.$store.commit("setCartSelect", index)
    },
    selectAll(){
      this.$store.commit("setCartAllSelect")
    },
    //删除全部购物车数据
    delAllCart(){
      alert("delAllCart==");
    }
  },
  props: {
    msg: String
  },
  components: {
    MHEADER,
    NO_DATA_DEAULATE,
    CART_FOOT
  }
};
</script>

<style scoped>

.ico_scan {
  width: 22px;
  height: 20px;
  position: absolute;
  top: 10.5px;
  left: 15px;
}

.input_code_region {
  width: 100%;
  padding-right: 112px;
  box-sizing: border-box;
  position: relative;
}

.input_code_region input {
  background: #fff;
  height: 41px;
  display: block;
  color: #000;
  padding: 0 40px 0 9px;
  box-sizing: border-box;
}

.btn_add {
  position: absolute;
  z-index: 9;
  width: 40px;
  height: 41px;
  top: 0;
  right: 110px;
  border: none;
  background: #fff;
  opacity: 0;
  filter: alpha(opacity=0);
}

.ico_add {
  width: 22px;
  height: 22px;
  display: block;
  position: absolute;
  z-index: 2;
  top: 9.5px;
  right: 122px;
}

.settlement_region {
  width: 100%;
  position: fixed;
  bottom: 50px;
  padding-left: 11.5px;
  background: #fff;
  /* border-top:0.5px solid #f4f4f4; */
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.total_item {
  font-size: 14px;
  line-height: 1;
  color: #fff;
}

.total_item span {
  margin-right: 6px;
}


.activity_region {
  height: 35px;
  position: fixed;
  bottom: 68.5px;
  width: 100%;
  line-height: 35px;
  color: #777;
  background: #f5f7cc;
  text-indent: 35px;
  font-size: 14px;
  padding-left: 15px;
}

.ico_full_out {
  width: 29px;
  height: 16px;
  position: absolute;
  left: 15px;
  top: 10px;
}

.goods_selection_section {
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
.goods_selection_section_sec {
  border-bottom: 0.5px solid #f0f0f0;
  background: #fff;
  border-top: 0.5px solid #f3f3f3;
  /* opacity:0.5;
  filter: alpha(opacity=50); */
}

.checkbox_goods {
  width: 22px;
  position: absolute;
  margin-top: 32px;
  left: 10px;
}

.checkbox_goods_sec {
  width: 33px;
  position: absolute;
  margin-top: 30px;
  left: 3.5px;
}

.checkbox_box {
  width: 22px;
  height: 22px;
  border: none;
  position: relative;
  background-size: 23px;
}

.checkbox_box_sec {
  width: 35px;
  height: 23px;
  border: none;
  position: relative;
  background-size: 23px;
}

.checkbox_box img {
  width: 100%;
  height: 100%;
}

.checkbox_box checkbox {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 9;
}

.ico_reduce {
  width: 30px;
  height: 30px;
}

.ico_add_goods {
  width: 30px;
  height: 30px;
}

.num {
  font-size: 14px;
  width: 30px;
  text-align: center;
  color: #333;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  /* border-top:0.5px solid #CDCDCD;
  border-bottom:0.5px solid #CDCDCD; */
  font-weight: bold;
  float: left;
}

.goods_name {
  font-size: 14px;
  color: #333;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  white-space: nowrap;
  text-align: left;
}

.price {
  /* position: absolute; */
  /* min-height: 26.5px; 
  overflow:hidden; */
  /* bottom:15px;  */
  /* position:absolute;
bottom:0; */
  width: 100%;
  float: left;
}
.price_no {
  overflow: hidden;
  bottom: 15px;
  position: absolute;
}

.price .price_current {
  font-size: 12px;
  color: #ea3323;
  float: left;
  font-weight: bold;
  line-height: 18px;
  height: 18px;
  width: 100%;
  margin-top: 3.5px;
  text-align: left;
}
.price .price_current .seal_price {
  font-size: 18px;
  margin-left: -0.5px;
}
.price_no .price_current_no {
  font-size: 16px;
  color: #ccc;
  float: left;
  line-height: 21px;
}
.goods_name_no {
  font-size: 14px;
  color: #999;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  white-space: nowrap;
}
.goods_text_no {
  font-size: 12px;
  color: #ccc;
  width: 245px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 18px;
  height: 18px;
}

.price .price_retail {
  font-size: 12px;
  text-decoration: line-through;
  color: #ccc;
  margin-left: 5px;
  display: inline-block;
  font-weight: normal;
}
.price_no .price_retail_no {
  font-size: 12px;
  text-decoration: line-through;
  color: #ccc;
  margin-left: 5px;
  display: inline-block;
  font-weight: normal;
  line-height: 15px;
}
.bottomBox {
  margin-top: 22px;
  /* position:relative; */
  /* position:absolute;
  right:0;
  left:142px;
bottom:15px; */
  float: left;
  width: 100%;
  position: relative;
  /* margin-bottom:15px; */
}
.price_box {
  /* margin-top: 15px; */
  /* position: relative; */
  /* overflow: hidden; */
  /* min-height: 26.5px; */
  width: 100%;
  float: left;
}
.price_box_no {
}

.goods_right {
  width: 100%;
  padding-left: 140px;
  box-sizing: border-box;
  float: left;
  padding-right: 15px;
  /* position:relative;
  min-height:90px; */
}
.touch-item .goods_right .right_line {
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
  display: inline-block;
  position: absolute;
  bottom: 0.5px;
}
.touch-item:last-child .goods_right .right_line {
  height: 0px;
  width: 100%;
  display: inline-block;
  position: absolute;
  bottom: 0px;
}
.goods_right_sec {
  width: 100%;
  padding-left: 142px;
  box-sizing: border-box;
}

.goods_left {
  width: 100%;
  box-sizing: border-box;
}

.goods_selection_item {
  position: relative;
  padding: 15px 0;
  min-height: 120px;
  box-sizing: border-box;
  overflow: hidden;
}

.buy_explain {
  font-size: 14px;
  margin: 8px 0;
  padding-left: 15px;
  color: #777;
  line-height: 1;
}

.buy_explain view {
  display: inline;
  color: #ffa42f;
  font-size: 14px;
  border: none;
  padding: 3px;
}

.btn_reduce {
  /*width: 69px;height: 100%;background: #ff0000;
    color: #ffffff;border-radius: 0;
    position: absolute;right: 0;top: 0;
    line-height: 80px;font-size: 18px;*/
  width: 60px;
  height: 100%;
  background-color: red;
  position: absolute;
  top: 0;
  right: -60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_con {
  text-align: center;
  color: #333;
  font-size: 16px;
  line-height: 1;
  padding: 32px 0 25px 0;
  border-top: 1px solid #e8e8e8;
  margin-top: 10px;
}

.modal_price {
  font-size: 20px;
  color: #f00;
  text-align: center;
}

.pop_flexbg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: #000;
  opacity: 0.7;
  filter: alpha(opacity=70);
}

.pop_delete {
  width: 100%;
  padding: 0 27px;
  position: fixed;
  z-index: 99;
  top: 50%;
  margin-top: -112px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  overflow: hidden;
}

.pop_delete_con {
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  overflow: hidden;
}

.pop_delete_title {
  font-size: 16px;
  color: #000;
  padding: 18px 0 16px 0;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  line-height: 1;
  margin: 0 15px;
}

.pop_delete_text {
  font-size: 18px;
  color: #000;
  padding: 15px 0 9px 0;
  line-height: 1;
  text-align: center;
}

.pop_delete_price {
  font-size: 20px;
  color: #f00;
  text-align: center;
  font-weight: bold;
  padding-bottom: 16px;
  line-height: 1;
}

.btn_box {
  border-top: 1px solid #e8e8e8;
  border-radius: 5px;
}

.btn_cancel {
  width: 50%;
  border-right: 1px solid #e8e8e8;
  font-size: 17px;
  background: #fff;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: center;
  line-height: 1;
  padding: 17px 0;
}

.btn_determine {
  width: 50%;
  color: #ffa42f;
  font-size: 17px;
  background: #fff;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: center;
  line-height: 1;
  padding: 17px 0;
}

.pop_scan_title_explain {
  font-size: 16px;
  color: #777;
  padding: 18px 0 9px 0;
  text-align: center;
  line-height: 1;
  margin: 0 15px;
}

.pop_scan_display {
  width: 100%;
  padding: 0 27px;
  position: fixed;
  z-index: 99;
  top: 50%;
  margin-top: -130px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.pop_scan_code {
  font-size: 20px;
  color: #ffa42f;
  padding: 0 0 14px 0;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 1;
}

.no_code {
  font-size: 20px;
  color: #666;
  padding: 0 0 14px 0;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 1;
}

.no_goods_text {
  font-size: 18px;
  text-align: center;
  line-height: 1;
  color: #000;
  padding: 30px 0;
}

.pop_scan_nocode {
  width: 100%;
  padding: 0 27px;
  position: fixed;
  z-index: 99;
  top: 50%;
  margin-top: -130px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.btn_close {
  position: absolute;
  width: 24.5px;
  height: 53px;
  top: -53px;
  right: 47px;
}

.btn_close image {
  width: 24.5px;
  height: 53px;
}

.scan_add_prompt {
  width: 242px;
  height: 37px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.78);
  color: #fff;
  text-align: center;
  line-height: 37px;
  font-size: 16px;
  top: 50%;
  position: fixed;
  margin-top: -18.5px;
  left: 50%;
  margin-left: -121px;
}

.touch-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}

.content {
  width: 100%;
  line-height: 22px;
  margin-right: 0;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  margin-left: -90px;
  position: relative;
}
.content_sec {
  width: 100%;
  line-height: 22px;
  margin-right: 0;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  margin-left: -90px;
}

.del {
  background-color: #f00;
  width: 69px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  -webkit-transform: translateX(69px);
  transform: translateX(69px);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  font-size: 18px;
}

.touch-move-active .content,
.touch-move-active .del {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.b_none {
  border-bottom: none;
}

.goods_num {
  position: absolute;
  right: 5px;
  bottom: 18px;
}

.btn_minus {
  width: 30px;
  height: 30px;
  display: flex;
  float: left;
  /* border:0.5px solid #CDCDCD; */
  color: #999;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 24px;
}

.btn_plus {
  width: 30px;
  height: 30px;
  display: flex;
  /* border:0.5px solid #CDCDCD; */
  justify-content: center;
  align-items: center;
  font-size: 19px;
}

.address_bar {
  height: 36px;
  margin-top: 12px;
  background: #fff;
  position: relative;
  padding: 14px 0;
}

.border_top_img {
  width: 100%;
  height: 3px;
  top: 0;
  position: absolute;
  opacity: 0.3;
  filter: alpha(opacity=30);
}

.border_bottom_img {
  width: 100%;
  height: 3px;
  bottom: 0;
  position: absolute;
  opacity: 0.3;
  filter: alpha(opacity=30);
}

.receiver {
  font-size: 14px;
  line-height: 1;
  margin-bottom: 7px;
  margin-left: 55px;
}

.receiver text {
  color: #666;
}

.delivery_address {
  font-size: 14px;
  line-height: 1;
  margin-left: 55px;
  color: #666;
}

.ico_location {
  width: 13px;
  height: 17px;
  position: absolute;
  left: 21px;
  top: 23.5px;
}

.delivery_mode_box {
  margin-top: 12px;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
}

.delivery_mode_list {
  margin-left: 15px;
}

.delivery_mode_title {
  padding: 15.5px 0;
  background: #fff;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  line-height: 1;
}

.merchant_message {
  height: 45px;
  background: #fff;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}

.merchant_message input {
  width: 100%;
  height: 100%;
}

.delivery_mode_con {
  position: absolute;
  right: 37px;
  top: 0;
  padding: 5px 0;
}

.delivery_time {
  line-height: 1;
  color: #ffa42f;
  font-size: 14px;
  margin-bottom: 5px;
}

.delivery_fee {
  font-size: 12px;
  line-height: 1;
  color: #999;
}

.goods_img_box {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 40px;
  top: 15px;
  box-sizing: border-box;
}

.goods_img_box_sec {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 42px;
  top: 15px;
  box-sizing: border-box;
  opacity: 0.5;
  filter: alpha(opacity=50);
}

.goods_img {
  width: 100%;
  max-height: 100%;
}

.goods_text {
  font-size: 12px;
  color: #999;
  width: 245px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 18px;
  height: 18px;
      text-align: left;
    margin-top: 5px;
}
.goods_text_blue {
  border: 1px solid #508bf0;
  border-radius: 2px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  color: #508bf0;
  text-align: center;
  display: inline-block;
  padding: 0 2.5px;
  margin-top: 2.5px;
}
.goods_text_gray {
  border: 1px solid #cccccc;
  border-radius: 2px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  color: #999999;
  text-align: center;
  display: inline-block;
  padding: 0 2.5px;
  float: left;
  margin-top: 3.5px;
}

.b_none {
  border: none;
}

.write_address {
  font-size: 14px;
  line-height: 1;
  padding: 10.5px 0 10.5px 55px;
  color: #666;
}

.arrow_right {
  width: 7.5px;
  height: 13px;
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -6.5px;
}

.uploadWrap {
  height: 80px;
  width: 100%;
  display: flex;
  display: -webkit-box;
  flex-direction: column;
}

.upload_Item {
  width: 80px;
  height: 80px;
  flex: 1;
}

.upload_Item_img {
  width: 80px;
  height: 80px;
}
.cart_banner {
  color: #666;
  font-size: 12px;
  background-color: #fff7e3;
  height: 25px;
  line-height: 25px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10px;
}
.cart_banner::before {
  width: 7.5px;
  height: 7.5px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  background: #fff7e3;
  position: absolute;
  content: " ";
  top: -4px;
  left: 18px;
}
.cart_banner image {
  width: 14px;
  height: 14px;
  margin-left: 10px;
  margin-right: 5px;
}
.cart_tip {
  color: white;
  text-align: center;
  font-size: 12px;
  margin: 2.5px 0;
  position: absolute;
  top: -30px;
  right: 0;
  z-index: 20;
  width: 100.5px;
}
.cart_images {
  font-size: 12px;
  margin: 2.5px 0;
  position: absolute;
  top: -32px;
  right: 0;
  width: 100.5px;
  height: 29px;
}
.cart_head {
  background-color: #fff;
  padding: 10px 15px;
  overflow: hidden;
  height: 25px;
  line-height: 25px;
}
.cart_all {
  background-color: #fff;
  padding: 10px;
  overflow: hidden;
  height: 25px;
  line-height: 25px;
  margin-top: 10px;
}
.cart_all .all_select_head {
  position: relative;
  font-size: 14px;
  color: #333;
}
.cart_all .all_select_head span {
  margin-left: 25px;
  line-height: 25px;
  float: left;
}
.cart_all .weight_tip {
  font-size: 10px;
  color: #999999;
  float: left;
  margin-left: 5px;
  font-family: PingFangSC-Regular;
}
.all_select_head .all_select_head_checkbox {
  width: 22px;
  height: 22px;
  border: none;
  position: absolute;
  /* background-size: 23px; */
  display: inline-block;
  top: 2.5px;
  left: 0;
}

.all_select_head .all_select_head_checkbox img {
  width: 100%;
  height: 100%;
  float: left;
}

.all_select_head .all_select_head_checkbox checkbox {
  width: 40px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 9;
}
.remarkBox {
  background-color: #fff7e3;
  padding: 10px;
}
.cart_remark {
  /* background-color:#FFF7E3 ; */
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 22.5px;
  height: 22.5px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  padding: 1px 0;
}
.remarkBox .cart_remark:last-child {
  margin-bottom: 0px;
}
.cart_padd {
  height: 10px;
  width: 100%;
}
.cart_remark .re_img {
  float: left;
  width: 34.5px;
  height: 16px;
  margin-top: 1px;
}
.cart_remark .re_detail {
  float: left;
  margin-left: 7.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60%;
}
.cart_remark .re_amount {
  float: left;
}
.cart_head_no {
  background-color: #fff;
  padding: 0 10px;
  overflow: hidden;
  margin-top: 10px;
  height: 45px;
  line-height: 45px;
}
.cart_img {
  width: 20px;
  height: 20px;
  float: left;
}
.cart_image {
  color: #333;
  font-size: 14px;
  float: left;
  margin-left: 2.5px;
}
.cart_head_right {
  float: right;
  color: #999;
  font-size: 12px;
}
.cart_head_right_sec {
  float: right;
  color: #f09636;
  font-size: 14px;
}
.no_product_span {
  background: rgba(51, 51, 51, 0.5);
  width: 33px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  font-size: 12px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
}
.surperText {
  width: 30px;
  height: 15px;
  background: #f09636;
  border-radius: 2px;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  margin-right: 5px;
  display: inline-block;
  float: left;
  margin-top: 5px;
}
.surperTextGold {
  float: left;
  margin-top: 5px;
}

.cart_remark .spe_icon {
  background: #ffefe5;
  border: 0.5px solid #ea3323;
  border-radius: 2px;
  font-size: 10px;
  color: #ea3323;
  line-height: 14px;
  height: 14px;
  display: inline-block;
  width: 30px;
  text-align: center;
  margin-left: 5px;
  float: left;
  margin-bottom: 0.5px;
}
.all_select_view text {
  font-size: 14px;
  color: #666666;
  margin-left: 25px;
  line-height: 18px;
  height: 18px;
  float: left;
}
.all_select_view_checkbox checkbox {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 9;
}
.no_data_tip_box .common_btn {
  background: #f09636;
  border-radius: 2px;
  width: 110px;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin: 20px auto 0;
}
.hint_region {
  width: 100%;
  color: #333;
  font-size: 12px;
  background-color: #fffbed;
  max-height: 25px;
  line-height: 25px;
  /* text-indent:15px; */
  position: fixed;
  bottom: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
}
.hint_region text {
  font-size: 12px;
  color: #ea3323;
  line-height: 25px;
}
.limit_num {
  color: #ea3323;
  font-size: 10px;
  line-height: 10px;
  float: left;
  margin-top: 2.5px;
}



</style>
