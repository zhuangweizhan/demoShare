<template>
  <div>
    <!-- search模块 -->
    <!-- <MSerach /> -->
    <MHEADER titleName="首页" />

    <!-- banner模块 -->
    <MBanner />

    <!-- 滑动图 -->
    <MCateList />

    <!-- 快捷菜单 -->
    <!-- <MQuickMenu/> -->
    <!-- <keep-alive include="MQuickMenu">
      <component :is="keepName"></component>
    </keep-alive>-->
    <MQuickMenu v-on:changeMainShowType="changeMainShowType" />

    <!-- 显示标签 -->
    <MSHOWTAG />

    <div v-if=" mainShowType == 'product' ">
      <!-- 商品列表 -->
      <MProductList />
    </div>
    <div v-else-if=" mainShowType == 'store'">
      <!-- 门店列表 -->
      <MStoreList />
    </div>
    <div v-else-if=" mainShowType == 'gift'">
      <!-- 商品列表 -->
      <div style="height: 350px;background: #efefef;text-align: center;line-height: 350px;">正在开发中...</div>
    </div>
  </div>
</template>

<script>
// import MSerach from "@/components/m_serach.vue";
import MBanner from "@/components/m_banner.vue";
import MCateList from "@/components/m_cate_list.vue";
import MQuickMenu from "@/components/m_quick_menu.vue";
import MSHOWTAG from "@/components/m_show_tag.vue";
import MProductList from "@/components/m_product_list.vue";
import MHEADER from "@/components/m_header.vue";
import MStoreList from "@/components/m_store_list.vue";

export default {
  name: "MainFirst",
  data() {
    return {
      keepName: "MQuickMenu",
      includeList: ["MQuickMenu"],
      /* 过滤商品属性 product store gift */
      mainShowType: "product"
    };
  },
  computed: {},
  created() {
    this.$store.dispatch("setMenuActiveActions", "mainFirst"); //刷新底部tab
    this.getPageDetail();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getPageDetail() {
      this.$store.dispatch("setMainCateActions", {}); //获取商品分类
      this.$store.dispatch("reloadPriceList", {}); //获取商品列表
      this.$store.dispatch("setMaiMoneyFilterActions", {}); //获取商品过滤条件
    },
    //g改变change
    changeMainShowType(mainShowType) {
      console.log("main.changeMainShowType");
      this.mainShowType = mainShowType;
    }
  },
  components: {
    // MSerach,
    MBanner,
    MCateList,
    MQuickMenu,
    MSHOWTAG,
    MProductList,
    MHEADER,
    MStoreList
  }
};
</script>


