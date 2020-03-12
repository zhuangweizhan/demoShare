<template>
  <div id="lista1" class="subnavigation" categorypath="all">
    <div v-for="(mItem, mIndex) in cateList"  :class="mainCateNum == mIndex ? 's_div selTrue': 's_div'"  :key='mIndex' @click="selectMainCate(mIndex)" >
      <img
        :src="mItem.url"
        id="all"
      />
      <span>{{mItem.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  created(){
    console.log("分类页面重新初始化成功");
  },
  computed: {
    cateList() {
      return this.$store.getters.getMainCateList;
    },
    mainCateNum(){
      return this.$store.getters.getMainCateNum;
    }
  },
  methods: {
    selectMainCate(index){
      // this.$store.commit('setMainCateNum', index)
      this.$store.dispatch('selectMainCateActions', index);
    }
  }
};
</script>

<style scoped>
.subnavigation {
  border-bottom: 1px solid #d9d9d9;
  background-color: #ffffff;
  width: 100%;
  display: -webkit-box;
  overflow-x: scroll;
}
.subnavigation .s_div {
  height: 69px;
  text-align: center;
  font-size: 14px;
  width: 20%;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.subnavigation .s_div img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  margin-top: 11px;
}
.selTrue {
  background-color: #f6d0b9 !important;
  border-radius: 20px;
}
</style>