import Vue from 'vue'
import Vuex from 'vuex'
import systemMoudles from './modules/system_modules.js'
import mainMoudles from './modules/main_modules.js'
import cartMoudles from './modules/cart_modules.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    systemMoudles,
    mainMoudles,
    cartMoudles
  },
  strict: debug
})
