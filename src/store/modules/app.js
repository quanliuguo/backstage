// import Cookies from 'js-cookie'

const app = {
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING: (state, loading) => {
      state.loading = loading
    }
  },
  actions: {
    openLoading ({ commit }) {
      commit('SET_LOADING', true)
    },
    closeLoading ({ commit }) {
      commit('SET_LOADING', false)
    }
  }
}
export default app
