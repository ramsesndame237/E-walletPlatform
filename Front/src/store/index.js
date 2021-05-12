import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  forNotification: [],
}

const mutations = {
  ADD_NOTIF: (state, item) => {
    if(item.statut === 1) {
      state.forNotification.push(item)
    }
  }
}

const getters = {
  forNotification: state => state.forNotification
}

const actions = {
  addNotif: (store, item) => {
    store.commit('ADD_NOTIF', item)
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})
