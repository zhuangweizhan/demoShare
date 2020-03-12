
import url from '@/store/config/request_url';
import utils from '@/store/utils/myUtils';
// import context from '@/main.js'
// import context from '@/main.js'
import Vue from 'vue'
    
const state = {
    /*购物车列表*/
    cartList: [],
}

const getters = {
    getCartList() {
        return state.cartList;
    },
}

const mutations = {
    setCartList: function (state, list) {
        console.log("list=" + JSON.stringify(list) );
        state.cartList = list;
    },
    //赋值购物车数量
    setCartNum: function(state, obj){
        console.log("obj=" + JSON.stringify(obj) );
        // state.cartList[obj.index].productNum = obj.currentNum;
        Vue.set(  state.cartList, Object.assign( state.cartList[obj.index], {productNum: obj.currentNum }),  obj.index);
    },
    //赋值购物车勾选
    setCartSelect: function(state, index){
        state.cartList[index].checkSelect =  !state.cartList[index].checkSelect;
    },
    //全选购物车
    setCartAllSelect:  function(state){
        const map = state.cartList.map(item => item.checkSelect );
        console.log("map=" + map);
        console.log("flag=" +  map.includes(false));
        const flag =  map.includes(false) ? true : false;
        state.cartList.forEach(item => {
            item.checkSelect = flag;
        })
    },
    //删除购物车数据
    delCartByIndex: function(state, index){
        // state.cartList.splice(index, 1);
        Vue.delete( state.cartList, index)
    }
}

const actions = {
    //获取首页商品列表
    setCartListActions: async ({ commit }, query) => {
        let res = await utils.uGet({ url: url.getCartList, query });
        res.list.forEach( item => {
            item.checkSelect = true;
        })
        commit('setCartList', res.list);
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}
