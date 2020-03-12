<template>
  <div class="right_bottom" key="1">
    <ul id="right_bottom_ul_all" v-if="productList.length > 0">
      <li v-for="(pItem , pIndex) in productList" :key="pIndex">
        <div>
          <div class="img_div"  @click="goDetail(pItem.id)">
            <a>
              <img :src="pItem.url" />
            </a>
          </div>
          <div class="s_div">
            <span id="itemNameH">{{pItem.name}}</span>
          </div>
          <div class="b_div">
            <div class="priceTag">
              <div class="pTop" >{{pItem.price | pShowPrice}}</div>
            </div>
            <div class="add_btn" @click="addCart()">
              <span>
               加入购物车
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else >
      <NO_DATA_DEAULATE></NO_DATA_DEAULATE>
    </div>
  </div>
</template>


<script>
import NO_DATA_DEAULATE from "@/components/no_data_defaulte.vue";


export default {
  name: "ProductList",
  data() {
    return {
    };
  },
  computed: {
    productList() {
      return this.$store.getters.getMainProdList;
    },
  },
  methods: {
    goDetail(id){
      this.$router.push(`productDetail?id=${id}`)
    },
    addCart(){
      this.utils.uToast("加入购物车成功");
    }
  },
  components:{
    NO_DATA_DEAULATE
  }
};
</script>


<style scoped>
.right_bottom {
  background: #e2e2e2;
  overflow: hidden;
  padding-top: 10px;
}
.right_bottom :nth-child(odd) {
  clear: both;
}
.right_bottom :nth-child(even) {
  margin-right: 0;
}
.right_bottom ul li {
  width: 47%;
  float: left;
  margin-bottom: 20px;
  margin-left: 2%;
  position: relative;
}
.right_bottom ul li:last-child {
  margin-right: 0%;
}

.right_bottom ul li div {
  background-color: white;
  text-align: left;
}
.right_bottom ul li .img_div {
  width: 100%;
  background-color: white;
}
.right_bottom ul li .img_div img {
  width: 100%;
  height: 45vw;
}
.right_bottom ul li .s_div {
  clear: both;
  margin: 0.4em 0.8em;
  color: black;
  height: 3em;
  font-size: 15px;
}
.right_bottom ul li .s_div span {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.right_bottom ul li .b_div {
  overflow: hidden;
}
.right_bottom ul li .b_div .s_span {
  font-size: 1em;
  color: white;
  float: left;
  width: 40%;
  text-align: center;
  margin: 5%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right_bottom ul li .b_div .add_btn {
  font-size: 0.9em;
  color: #ff8859;
  float: left;
  width: 100%;
  text-align: center;
}
.right_bottom ul li .b_div .cash_btn {
  font-size: 0.9em;
  color: white;
  float: left;
  width: 40%;
  text-align: center;
  margin: 5%;
}
.right_bottom ul li .b_div .exchange_btn {
  font-size: 0.9em;
  color: white;
  float: left;
  margin: 0.5em 0;
  text-align: center;
  max-width: 48%;
  min-width: 35%;
}
.right_bottom ul li .b_div .exchange_btn span,
.right_bottom ul li .b_div .add_btn span  {
  padding: 0.8em 0;
  border-top: 1px solid #d2cbcb;
  display: block;
  font-size: 14px;
}
.right_bottom ul li .b_div .add_btn a {
  color: coral;
}
.priceTag {
  float: left;
  color: red;
  width: 100%;
  margin-bottom: 10px;
}
.priceTag .pTop {
  margin-top: 0.5em;
  font-size: 14px;
  float: left;
  width: 42%;
  margin-left: 5%;
  text-align: left;
  clear: right;
}
.priceTag .pTop .pLeft {
  float: left;
  width: 45%;
  text-align: right;
  line-height: 20px;
}
.priceTag .pTop .pRight {
  float: left;
  width: 55%;
  text-align: left;
  line-height: 20px;
}
.right_bottom ul li .b_div .exchange_btn span,
.right_bottom ul li .b_div .add_btn span {
  padding: 0.8em 0;
  border-top: 1px solid #d2cbcb;
  display: block;
  font-size: 14px;
}
</style>