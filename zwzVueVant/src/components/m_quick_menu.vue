<template>
  <div class="quick_menu">
    <div class="menu_div" v-for="(item, index) in list" :key="index" v-on:click="selectTag(index)">
      <!-- <img :class="[ 'imgTag',  {'menu_active': item.active }]" :src="item.image" /> -->
      <div :class="[ 'spanTag',  {'menu_span_active': item.active }]">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          active: true,
          key: "remen",
          name: "热门"
        },
        {
          active: false,
          key: "xinpin",
          name: "新品"
        },
        {
          active: false,
          key: "zhoubian",
          name: "周边"
        },
        {
          active: false,
          key: "gift",
          name: "礼品"
        }
      ]
    };
  },
  methods: {
    selectTag(index) {
      if (!this.list[index].active) {
        //说明选中
        this.list.forEach(item => {
          item.active = false;
        });
        this.list[index].active = true;
      } else {
        this.list.forEach(item => {
          item.active = false;
        });
        this.$store.dispatch("setSpecialTag", "");
        this.$emit("changeMainShowType", "product");
        return;
      }
      const key = this.list[index].key;
      /* product store gift */
      switch (key) {
        case "remen":
          this.$emit("changeMainShowType", "product");
          this.$store.dispatch("setSpecialTag", "hot");
          break;
        case "xinpin":
          this.$emit("changeMainShowType", "product");
          this.$store.dispatch("setSpecialTag", "new");
          break;
        case "gift":
          this.$emit("changeMainShowType", "store");
          this.$store.commit("setMainProductSpecial", "");
          break;
        case "zhoubian":
          this.$emit("changeMainShowType", "gift");
          this.$store.commit("setMainProductSpecial", "");
          break;
        default:
          this.$emit("changeMainShowType", "product");
          this.$store.commit("setMainProductSpecial", "");
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.quick_menu {
  display: flex;
  flex: 4;
  padding: 10px 0;
  background: #e2e2e2;
  .menu_div {
    flex: 1;
    .imgTag {
      width: 70%;
      height: 30px;
    }
    .spanTag {
      width: 70%;
      height: 30px;
      color: rgb(254, 116, 7);
      line-height: 30px;
      background: white;
      margin: 0 15%;
    }
  }
}

.menu_span_active{
  background: rgb(254, 116, 7) !important;
  color: white !important;
}

.menu_active {
  box-shadow: 0 -4px 0px 17px rgba(224, 135, 43, 0.2);
}
</style>