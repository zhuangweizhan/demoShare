<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="prodTypeSelect" :options="prodTypeList" />
      <div class="subnavigation pz_pay_box">
        <div :class=" fiterMoenyNum == findex ? 'l_one active' : 'l_one'" v-for="(fItem, findex) in fitlerMoneyList" :key="findex" @click="selectShowTag(findex)" >{{fItem.name}}</div>
        <!-- <div class="l_one">自定义</div> -->
      </div>
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodTypeSelect: 0,
      prodTypeList: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
    };
  },
  computed: {
    fitlerMoneyList() {
      return this.$store.getters.getMaiMoneyFilterList;
    },
    fiterMoenyNum(){
      return this.$store.getters.getMaiMoneyFilterNum;
    },
  },
  methods: {
    // onConfirm() {
    //   this.$refs.item.toggle();
    // }
    selectShowTag( index ){
      this.$store.dispatch( "setShowPriceTag", index);
    }
  }
};
</script>

<style scoped>
.pz_pay_box {
  float: left;
  width: 65vw;
  border: 0;
}
.pz_pay_box .l_one {
  float: left;
  margin-right: 10px;
  line-height: 50px;
  font-size: 15px;
}
.pz_pay_box .active{
  color: coral;
}
</style>