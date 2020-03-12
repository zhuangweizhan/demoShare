 <template>
  <div>
    <div style="height:50px;width: 100%;"></div>
    <van-tabbar :value="menuActive" @change="onChangeMenu" active-color="#fe7407">
      <van-tabbar-item v-for="(mItem, mIndex) in menuList" :key="mIndex">
        <span>{{ mItem.name }}</span>
        <img slot="icon" :src="mIndex ==  menuActive? mItem.activeImage : mItem.inactiveImage" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>



<script>
import router from "@/router/index.js";

export default {
  name: "MFOOTTAB",
  data() {
    return {};
  },
  computed: {
    menuList() {
      return this.$store.getters.getMenuList;
    },
    menuActive() {
      console.log("menuActive====" + this.$store.getters.getMenuActive);
      return this.$store.getters.getMenuActive;
    }
  },
  methods: {
    onChangeMenu: function(index) {
      router.push({
        path: this.menuList[index].page
      });
    }
  }
};
</script>