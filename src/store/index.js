import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packages: null // Список пакетов. Храню как объект, поэтому указал null, а не []
  },
  mutations: {
    SET_PACKAGES(state, payload){
      state.packages = payload
    }
  },
  actions: {
    // Экшен получения пакетов по запросу поиска
    async getPackages({commit}, payload){
      try{
        const response = await axios.get(`http://registry.npmjs.com/-/v1/search?text=${payload}`)
        commit('SET_PACKAGES', response.data)
      }catch(error){
        console.error(error)
      }
    },
  },
  getters: {
    packages: state => state.packages 
  }
})
