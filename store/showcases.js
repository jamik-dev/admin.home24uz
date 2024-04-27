export const state = () => ({
  showcases: null,
  showcase: null,
})

export const getters = {
  showcases: (state) => state.showcases,
  showcase: (state) => state.showcase,
}

export const mutations = {
  SET_SHOWCASES(state, showcases) {
    state.showcases = showcases
  },
  SET_SHOWCASE(state, showcase) {
    state.showcase = showcase
  },
}

export const actions = {
  async getShowcases({ commit }) {
    return await this.$axios
      .get('/showcases/all', { params: this.$router.currentRoute.query })
      .then((response) => {
        commit('SET_SHOWCASES', response.data.showcases)
        return response.data.showcases
      })
      .catch((error) => {
        return error.response.data
      })
  },
  async getShowcase({ commit }, id) {
    return await this.$axios.get(`/showcases/${id}`).then((response) => {
      commit('SET_SHOWCASE', response.data.showcase)
      return response.data.showcase
    })
  },
  async updateShowcase(_, { id, name, products }) {
    return await this.$axios.put(`/showcases/${id}`, {name, products})
      .then((response) => {
        return response.data.showcase
      })
  },
}
