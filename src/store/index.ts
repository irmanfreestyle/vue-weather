import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSplashScreen: false,
    sidebar: false
  },
  getters: {
    showSplashScreen: state => {
      return state.showSplashScreen
    },
    sidebar: state => {
      return state.sidebar
    }
  },
  mutations: {
    SET_SPLASH_SCREEN (state, payload) {
      state.showSplashScreen = payload
    },
    SHOW_SIDEBAR (state, payload) {
      state.sidebar = payload
    }
  },
  actions: {
    setSplashScreen ({ commit }, payload) {
      commit('SET_SPLASH_SCREEN', payload)
    },
    showSidebar ({ commit }, payload) {
      commit('SHOW_SIDEBAR', payload)
    }
  },
  modules: {
  }
})
