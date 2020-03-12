<template>
  <div>
    <div class="serach_head">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        background="#fe7407"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div style="height:50px;width: 100%;"></div>
  </div>
</template>

<style scoped>
.serach_head {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}
</style>

<script>
export default {
  name: "M_SERACH",
  data() {
    return {
      value: "",
    }
  },
  methods: {
    onSearch: function() {
      
    }
  }
};
</script>