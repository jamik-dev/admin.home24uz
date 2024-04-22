export const state = () => ({
  characteristics: null
})

export const getters = {
  characteristics: state => state.characteristics
}

export const mutations = {
  SET_CHARACTERISTICS(state, characteristics) {
    state.characteristics = characteristics
  }
}

export const actions = {
  async getCharacteristics({ commit }) {
    return await this.$axios.get('/characteristics', {params: this.$router.currentRoute.query})
    .then(response => {
      commit('SET_CHARACTERISTICS', response.data.characteristics)   
      return response.data.characteristics;
    })
    .catch(error => {
      return error.response.data;
    });
  }
}