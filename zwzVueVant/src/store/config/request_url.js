const constants = require('../../config')

module.exports = Object.freeze({
    toLogin: constants.mainUrl + "/toLogin", //登录接口
    getCateList: constants.mainUrl + "/getCateList", //分类接口
    getProdList: constants.mainUrl + "/getProdList", //商品接口
    getMoneyFilterList: constants.mainUrl + "/getMoneyFilterList", //商品过滤接口
    getCartList:  constants.mainUrl + "/getCartList", //购物车接口
    getStoreList: constants.mainUrl + "/getStoreList", //获取门店接口
});