export const state = () => ({
  counts: null,
  orders: null,
  applications: null
})

export const getters = {
  counts: state => state.counts,
  orders: state => state.orders,
  applications: state => state.applications
}

export const mutations = {
  SET_ORDERS(state, data) {
    state.orders = data;
  },
  SET_ORDERS_COUNTS(state, data) {
    state.counts = data;
  },
  SET_APPLICATIONS(state, data) {
    state.applications = data;
  }
}

export const actions = {
  async getOrders({ commit }, status) {
    return await this.$axios.get('/orders', {params: {status}})
      .then(response => {
        commit('SET_ORDERS', response.data.orders);
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  
  },
  async getClickOrders({ commit }) {
    return await this.$axios.get('/one_click_orders', {params: this.$router.currentRoute.query})
      .then(response => {
        commit('SET_APPLICATIONS', response.data.orders);
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },
  async updateClickOrders(_, {id, status}) {
    return await this.$axios.put(`/one_click_orders/${id}`, {status})
      .then(response => {
        return response;
      })
  },
  async deleteApplication(_, id) {
    return await this.$axios.delete(`/one_click_orders/${id}`)
      .then(response => {
        return response;
      })
  },
  async getOrdersCounts({ commit }) {
    return await this.$axios.get('/orders/counts')
      .then(response => {
        commit('SET_ORDERS_COUNTS', response.data.counts); 
        return response.data.counts;
      })
      .catch(error => {
        return error.response.data;
      });
  }
}

