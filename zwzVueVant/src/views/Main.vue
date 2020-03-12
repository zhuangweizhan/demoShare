 <template>
  <div>
    <router-view></router-view>
    <MFOOTTAB />
  </div>
</template>

<script>
import MFOOTTAB from "@/components/m_foot_tab.vue";
import { cTopComm } from "../store/utils/myCommon.js";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll)
  },
  created() {

  },
  methods: {
    // //刷新定位的item
    // reloadMenuActive: function( page ){
    //   this.menuList.forEach( (item, index) => {
    //     if( item.page == page ){
    //       this.menuActive = index;
    //     }
    //   })
    // },
    onChangeMenu: function(index) {
      this.$store.dispatch("setMenuActiveActions", index);
    },
    handleScroll() {
      console.log("handleScroll=====");
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var scrollHeight = document.body.scrollHeight;
      var windowHeight = window.screen.availHeight;
      if( scrollTop >= scrollHeight - windowHeight - 100 && scrollHeight > 1000 ){
        cTopComm({ message: '首页置顶成功', flag: true});
      } else{
        cTopComm({ flag: false });
      }
    }
  },
  components: {
    MFOOTTAB
  }
};
</script>