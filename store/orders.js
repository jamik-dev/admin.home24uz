export const state = () => ({
  counts: null
})

export const getters = {
  counts: state => state.counts
}

export const mutations = {
  SET_ORDERS_COUNTS(state, data) {
    state.counts = data;
  }
}

export const actions = {
  async getOrdersCounts({ commit }) {
    return await this.$axios.get('/orders/counts')
      .then(response => {
        commit('SET_ORDERS_COUNTS', response.data.counts)   
        return response.data.counts;
      })
      .catch(error => {
        return error.response.data;
      });
  }
}

