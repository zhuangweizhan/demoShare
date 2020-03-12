
import url from '@/store/config/request_url';
import utils from '@/store/utils/myUtils';


const state = {
    shopId: '72868',
    clientType: 4,
    shopName: '',
    isLogin: 0, //0表示未登录
    userDetail: {},//用户信息
}

const getters = {
    getIsLogin() {
        let isLogin = state.isLogin;
        !isLogin &&  Number(utils.uGetLocal('isLogin'));
        return isLogin;
    }
}

const mutations = {
    setUserDetail: function (state, res) {
        if (res.code === 10000) {
            utils.uSetLocal('userDetail', JSON.stringify(res.userDetail));
            utils.uSetLocal('isLogin', 1);
            state.userDetail = this.userDetail;
            state.isLogin = 1;
        } else {
            utils.uSetLocal('userDetail', "");
            utils.uSetLocal('isLogin', 0);
            state.userDetail = {};
            state.isLogin = 0;
        }
    },
    exitUser: function(state){
        utils.uSetLocal('userDetail', "");
        utils.uSetLocal('isLogin', 0);
        state.userDetail = {};
        state.isLogin = 0;
        console.log( "isLogin===" +  state.isLogin );
    }
}

const actions = {
    toLoginAction: async ({ commit }, query) => {
        let res = await utils.uGet({ url: url.toLogin, query });
        commit('setUserDetail', res);
    },
    exitUserAction:({commit})=> {
        commit( "exitUser", "" );
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}
