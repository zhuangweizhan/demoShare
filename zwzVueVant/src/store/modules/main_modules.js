
import url from '@/store/config/request_url';
import utils from '@/store/utils/myUtils';

const state = {
  menuActive: 0,
  /*底部菜单*/
  menuList: [
    {
      name: "首页",
      activeImage:
        require("@/assets/home_tab_icon_home_pre.png"),
      inactiveImage:
        require("@/assets/home_tab_icon_home.png"),
      page: "mainFirst"
    },
    {
      name: "购物车",
      activeImage:
        require("@/assets/home_tab_icon_cart_pre.png"),
      inactiveImage:
        require("@/assets/home_tab_icon_cart.png"),
      page: "mainCart"
    },
    {
      name: "我的",
      activeImage:
        require("@/assets/home_tab_icon_mine_pre.png"),
      inactiveImage:
        require("@/assets/home_tab_icon_mine.png"),
      page: "mainPersonal"
    }
  ],
  /*首页商品分类*/
  mainCateList: [],
  /*首页当前选择商品分类位置*/
  mainCateNum: 0,
  /*首页商品列表*/
  mainProdList: [],
  /* 过滤价格条件列表 */
  mainMoneyFilterList: [],
  /* 过滤条件选择 */
  mainMoneyFilterNum: 0,
  /* 过滤特殊属性 */
  mainProductSpecial: '',
}

const getters = {
  getMenuList() {
    return state.menuList;
  },
  getMenuActive() {
    return state.menuActive;
  },
  getMainCateNum() {
    return state.mainCateNum;
  },
  getMainCateList() {
    return state.mainCateList;
  },
  getMainProdList() {
    return state.mainProdList;
  },
  getMaiMoneyFilterList() {
    return state.mainMoneyFilterList;
  },
  getMaiMoneyFilterNum() {
    return state.mainMoneyFilterNum;
  },
  getMainProductSpecial() {
    return state.mainProductSpecial;
  },
}

const mutations = {
  setMenuActive: function (state, index) {
    state.menuActive = index;
  },
  setMainCateList: function (state, list) {
    state.mainCateList = list;
  },
  setMainCateNum: function (state, num) {
    state.mainCateNum = num;
  },
  setMainProdList: function (state, list) {
    state.mainProdList = list;
  },
  setMaiMoneyFilterList: function (state, list) {
    state.mainMoneyFilterList = list;
  },
  setMaiMoneyFilterNum(state, num) {
    state.mainMoneyFilterNum = num;
  },
  setMainProductSpecial(state, value) {
    state.mainProductSpecial = value;
  },
}

const actions = {
  //根据名称设置底部菜单
  setMenuActiveActions: ({ commit }, page) => {
    let index = 0
    state.menuList.forEach((item, mIndex) => {
      console.log("item.page====" + item.page + "&page=" + page);
      item.page === page && (index = mIndex)
    })
    console.log("setMenuActiveActions====" + index);
    commit('setMenuActive', index);
  },
  //获取首页商品分类
  setMainCateActions: async ({ commit }, query) => {
    let res = await utils.uGet({ url: url.getCateList, query });
    commit('setMainCateList', res.list);
  },
  //选择商品分类
  selectMainCateActions: async ({ commit, dispatch }, index) => {
    // let res = await utils.uGet({ url: url.getProdList, query });
    // commit('setMainProdList', res.list);
    commit('setMainCateNum', index);
    dispatch('reloadPriceList');
  },
  //设置价格等级
  setShowPriceTag: ({ commit, dispatch }, index) => {
    commit('setMaiMoneyFilterNum', index);
    dispatch('reloadPriceList');
  },
  //设置商品特殊属性
  setSpecialTag: ({ commit, dispatch, state }, value) => {
    if (state.mainProductSpecial == value) {//说明是取消选择
      commit('setMainProductSpecial', '');
      dispatch('reloadPriceList');
    } else {
      commit('setMainProductSpecial', value);
      dispatch('reloadPriceList');
    }
  },
  //刷新商品列表
  reloadPriceList: async ({ commit }) => {
    let query = {};
    query.cateId = state.mainCateList.length > 0 ? state.mainCateList[state.mainCateNum].id : 0;//过滤商品分类
    query.priceTag = state.mainMoneyFilterList.length > 0 ? state.mainMoneyFilterList[state.mainMoneyFilterNum].value : 0;//过滤商品分类
    query.special = state.mainProductSpecial; //特殊属性
    console.log("state.mainMoneyFilterList===" + JSON.stringify(state.mainMoneyFilterList));
    console.log("state.mainMoneyFilterNum===" + JSON.stringify(state.mainMoneyFilterNum));
    let res = await utils.uGet({ url: url.getProdList, query });
    commit('setMainProdList', res.list);
  },
  //获取首页商品列表
  setMaiMoneyFilterActions: async ({ commit }, query) => {
    let res = await utils.uGet({ url: url.getMoneyFilterList, query });
    commit('setMaiMoneyFilterList', res.list);
  },

}


export default {
  state,
  getters,
  mutations,
  actions
}
