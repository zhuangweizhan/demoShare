<template>
  <div v-bind:class="footStyle" >
    <div class="carBarIcon">
      <img class="carBarIconImg" src="../assets/carbarIcon.png" />
      <div class="carBarBadge">{{cartDetail.allNum}}</div>
    </div>

    <div class="total_region">
      <div class="total_con">
        <div class="total_list">
          <span class="moneyUnit">￥</span>
          <span class="allMoney">{{cartDetail.allPrice | pShowPrice(false)}}</span>
        </div>
        <div class="total_tip">配送到家</div>
        <!-- <div class="total_tip">(含包装费:500)</div> -->
      </div>
    </div>

    <div class="btn_settlement" v-if=" typeName != 'product' " @click="summitOrder()">去结算</div>
    <div class="btn_settlement" v-else  @click="goCart()">去购物</div>
  </div>
</template>

<script>

export default {
  name: "CartFoot",
  props: {
     typeName: String
  },
  data() {
    return {
        footStyle: "settlement_region",
        btnName: '去结算'
    }
  },
  created(){
    this.$store.dispatch("setCartListActions", "");
      console.log("typeName===" + this.typeName );
      if( this.typeName == 'product' ){
        this.footStyle = "settlement_region b_0";
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
    }
  },
  methods:{
    summitOrder(){
        this.utils.uAlert("暂不开放该功能，请联系管理员！");
    },
    goCart(){
        this.$router.push("/mainCart");
    }
  }
}
</script>

<style scoped>
.b_0{
    bottom: 0 !important;
}
.total_region {
  display: flex;
  align-items: center;
  /* height: 55px; */
  left: 67.5px;
}
.settlement_region {
  width: 100%;
  min-height: 50px;
  position: fixed;
  bottom: 80px;
  padding-left: 10px;
  background: white;
}
.carBarIconRadius {
  height: 60px;
  width: 60px;
  background: white;
  position: fixed;
  bottom: -5px;
  left: 10px;
  border-radius: 50%;
  box-shadow: 0px -3px 3px #f4f4f4;
}
.carBarIcon {
  height: 50px;
  width: 50px;
  position: absolute;
  background: white;
  top: -5px;
  left: 14px;
  border-radius: 50%;
}
.carBarIcon .carBarIconImg {
  height: 100%;
  width: 100%;
}
.carBarIcon .carBarBadge {
  height: 15px;
  width: 15px;
  position: absolute;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 9px;
  line-height: 15px;
  text-align: center;
  right: 0px;
  top: 0;
}
.settlement_region .total_region .total_con .total_list .moneyUnit {
  font-size: 14px;
  line-height: 17.5px;
  color: #ea3323;
  font-weight: bold;
}
.settlement_region .total_region .total_con .total_list .allMoney {
  margin-left: -0.5px;
  font-size: 22px;
  line-height: 25.5px;
  color: #ea3323;
  font-weight: bold;
}
.settlement_region .total_region .total_con .total_tip {
  font-size: 12px;
  line-height: 15.5px;
  color: #999999;
}

.total_region {
  background: #fff;
  height: 100%;
  position: absolute;
  top: 0;
  right: 41%;
}

.total_con {
  line-height: 18px;
  font-size: 14px;
  color: #666;
  display: flex;
  /* align-items:center; */
  justify-content: center;
  flex-direction: column;
}
.total_con text {
  font-size: 20px;
  color: #e54b0c;
  font-weight: bold;

}

.total_tip {
  font-size: 12px;
  color: #999999;
  width: 100%;
}

.btn_settlement {
  width: 100px;
  height: 50px;
  position: absolute;
  z-index: 9;
  color: #fff;
  background: linear-gradient(to right, #ff6000, #ff9c07);
  /* top: 0px; */
  right: 0;
  border-radius: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 50px;
  text-align: center;
  /* margin-top:7.5px; */
  /* margin-right:15px; */
}

.btn_settlement::after {
  border-radius: 0;
}

.btn_settlement_gray {
  min-width: 33%;
  height: 50px;
  position: absolute;
  z-index: 9;
  color: #fff;
  background: #ccc;
  top: 0px;
  right: 0;
  border-radius: 0;
  font-size: 17px;
  line-height: 50px;
  text-align: center;
  /* margin-top:7.5px; */
  /* margin-right:15px; */
  font-weight: 600;
}
.btn_settlement_gray::after {
  border-radius: 0;
}

</style>