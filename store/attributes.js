export const state = () => ({
  attributes: null
})

export const getters = {
  attributes: state => state.attributes
}

export const mutations = {
  SET_ATTRIBUTES(state, attributes) {
    state.attributes = attributes
  }
}

export const actions = {
  async getAttributes({ commit }) {
    return await this.$axios.get('/attributes', {params: this.$router.currentRoute.query})
    .then(response => {
      commit('SET_ATTRIBUTES', response.data.attributes)   
      return response.data.attributes;
    })
    .catch(error => {
      return error.response.data;
    });
  }
}